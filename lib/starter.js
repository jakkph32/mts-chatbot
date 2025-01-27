const chalk = require("chalk");
const { exec } = require("child_process");
const editJsonFile = require("edit-json-file");
const { createWriteStream, readdir } = require("fs");
const { writeFile } = require("gitignore");
const inquirer = require("inquirer");
const { ncp } = require("ncp");
const ora = require("ora");
const path = require("path");
const { promisify } = require("util");

const readDir = promisify(readdir);
const asyncExec = promisify(exec);
const writeGitignore = promisify(writeFile);

const createProject = async () => {
  let spinner;

  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "What is your project name?",
      validate: (input) => input.trim() !== "" || "Project name cannot be empty",
    },
  ]);

  try {
    const template = await chooseTemplates();
    // const isUpdated = await dependenciesUpdates();
    // const isDeduped = await dependenciesDeduped();

    console.log("[ 1 / 3 ] 🔍  copying project...");
    console.log("[ 2 / 3 ] 🚚  fetching node_modules...");

    await copyProjectFiles(projectName, template);
    await updatePackageJson(projectName);

    console.log("[ 3 / 3 ] 🔗  linking node_modules...");
    console.log(
      "\u001b[2m──────────────────────────────────────────\u001b[22m"
    );

    spinner = ora();
    spinner.start();

    await installNodeModules(projectName, spinner);
    // isUpdated && (await updateNodeModules(projectName, spinner));
    // isDeduped && (await dedupeNodeModules(projectName, spinner));
    await postInstallScripts(projectName, template, spinner);

    await createGitignore(projectName, spinner);
    await initGit(projectName);

    await succeedConsole(template, spinner);
  } catch (error) {
    await failConsole(error, spinner);
  }
};

const getTemplateDir = async () => {
  const contents = await readDir(__dirname, { withFileTypes: true });
  const directories = contents
    .filter((p) => p.isDirectory())
    .map((p) => p.name);

  return directories;
};

const chooseTemplates = async () => {
  const directories = await getTemplateDir();
  const { chooseTemplates } = await inquirer.prompt([
    {
      type: "list",
      name: "chooseTemplates",
      message: "Select a template",
      choices: [...directories, new inquirer.Separator()],
    },
  ]);

  return chooseTemplates;
};

const dependenciesUpdates = async () => {
  const { isUpdated } = await inquirer.prompt([
    {
      type: "confirm",
      name: "isUpdated",
      message: "Update the package dependencies to their latest versions ?",
    },
  ]);

  if (isUpdated) {
    const { isUpdatedReconfirm } = await inquirer.prompt([
      {
        type: "confirm",
        name: "isUpdatedReconfirm",
        message:
          "The updated dependencies may contain breaking changes. Continue to update the dependencies anyway ?",
      },
    ]);

    return isUpdatedReconfirm;
  }

  return false;
};

const dependenciesDeduped = async () => {
  const { isDeduped } = await inquirer.prompt([
    {
      type: "confirm",
      name: "isDeduped",
      message: "Deduplicate the package dependency tree (recommended) ?",
    },
  ]);

  return isDeduped;
};

const copyProjectFiles = async (destination, directory) => {
  return new Promise((resolve, reject) => {
    const source = path.join(__dirname, `./${directory}`);
    const options = {
      clobber: true,
      stopOnErr: true,
    };

    ncp.limit = 16;
    ncp(source, destination, options, function (err) {
      if (err) reject(err);
      resolve();
    });
  });
};

const updatePackageJson = async (destination) => {
  const file = editJsonFile(`${destination}/package.json`, { autosave: true });

  file.set("name", path.basename(destination));
};

const installNodeModules = async (destination, spinner) => {
  spinner.text = "Install node_modules...\n";
  await asyncExec("npm install --legacy-peer-deps", { cwd: destination });
};

const updateNodeModules = async (destination, spinner) => {
  spinner.text = "Update node_modules...\n";
  await asyncExec("npm update --legacy-peer-deps", { cwd: destination });
};

const dedupeNodeModules = async (destination, spinner) => {
  spinner.text = "Dedupe node_modules...\n";
  await asyncExec("npm dedupe --legacy-peer-deps", { cwd: destination });
};

const postInstallScripts = async (destination, template, spinner) => {
  switch (template) {
    case "prisma":
      {
        spinner.text = "Run prisma generate...";
        await asyncExec("npm run prisma:generate", { cwd: destination });
      }
      break;
  }
};

const createGitignore = async (destination, spinner) => {
  spinner.text = "Create .gitignore...";

  const file = createWriteStream(path.join(destination, ".gitignore"), {
    flags: "a",
  });

  return writeGitignore({
    type: "Node",
    file: file,
  });
};

const initGit = async (destination) => {
  await asyncExec("git init", { cwd: destination });
};

const succeedConsole = async (template, spinner) => {
  spinner.succeed(chalk`{green Complete setup project}`);

  const msg =
    {
      prisma:
        "⛰ Prisma installed. Check your .env settings and then run `npm run prisma:migrate`",
      knex: "⛰ Knex installed. Check your .env settings and then run `npm run migrate`",
    }[template] || "";

  msg && console.log(msg);
};

const failConsole = async (error, spinner) => {
  spinner.fail(chalk`{red Please leave this error as an issue}`);
  console.error(error);
};

module.exports = createProject;
