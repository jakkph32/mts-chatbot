const chalk = require("chalk");
const { exec } = require("child_process");
const editJsonFile = require("edit-json-file");
const { createWriteStream, readdir } = require("fs");
const { writeFile } = require("gitignore");
const inquirer = require("inquirer");
const ora = require("ora");
const path = require("path");
const { promisify } = require("util");
const { cp, mkdir } = require("node:fs/promises");

const readDir = promisify(readdir);
const asyncExec = promisify(exec);
const writeGitignore = promisify(writeFile);

const createProject = async () => {
  let spinner;
  let projectName;

  // ตรวจสอบว่ามีชื่อโปรเจคจาก argument หรือไม่
  const projectNameArg = process.argv[2];
  if (projectNameArg) {
    projectName = projectNameArg;
    console.log(chalk.green(`Project name: ${projectName}`));
  } else {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "What is your project name?",
        validate: (input) =>
          input.trim() !== "" || "Project name cannot be empty",
      },
    ]);
    projectName = answer.projectName;
  }

  const { packageManager } = await inquirer.prompt([
    {
      type: "list",
      name: "packageManager",
      message: "Choose a package manager",
      choices: ["npm", "yarn", "pnpm", "bun"],
      default: "npm",
    },
  ]);

  try {
    const template = await chooseTemplates();

    console.log("[ 1 / 3 ] 🔍  copying project...");
    console.log("[ 2 / 3 ] 🚚  fetching node_modules...");

    await copyProjectFiles(projectName, template);
    await updatePackageJson(projectName);

    console.log("[ 3 / 3 ] 🔗  linking node_modules...");
    console.log(
      "\u001b[2m──────────────────────────────────────────\u001b[22m",
    );

    spinner = ora();
    spinner.start();

    await installNodeModules(projectName, spinner, packageManager);
    await postInstallScripts(projectName, template, spinner, packageManager);

    await createGitignore(projectName, spinner);
    await initGit(projectName);

    await succeedConsole(template, spinner);
  } catch (error) {
    await failConsole(error, spinner);
  }
};

const getTemplateDir = async () => {
  const contents = await readDir(path.join(__dirname, "../templates"), {
    withFileTypes: true,
  });
  const directories = contents
    .filter((p) => p.isDirectory())
    .map((p) => p.name);

  return directories;
};

const chooseTemplates = async () => {
  const directories = await getTemplateDir();
  const choices = [];

  for (const dir of directories) {
    try {
      const packageJsonPath = path.join(
        __dirname,
        "../templates",
        dir,
        "package.json",
      );
      const packageJson = require(packageJsonPath);
      const description = packageJson.description || "";
      choices.push({ name: `${dir}🔹 ${description}`, value: dir });
    } catch (error) {
      // Handle error if package.json doesn't exist or can't be parsed
      choices.push({ name: dir, value: dir }); // show only name if error
      console.error(
        chalk.yellow(
          `Warning: Could not read description for template ${dir}.`,
        ),
      );
    }
  }

  const { chooseTemplates } = await inquirer.prompt([
    {
      type: "list",
      name: "chooseTemplates",
      message: "Select a template",
      choices: [...choices, new inquirer.Separator()],
    },
  ]);

  return chooseTemplates;
};

const copyProjectFiles = async (projectName, template) => {
  const source = path.join(__dirname, "../templates", template);
  const destination = path.join(process.cwd(), projectName);

  try {
    await mkdir(destination, { recursive: true });
    await cp(source, destination, { recursive: true });
    return;
  } catch (error) {
    console.error("Error during file copy:", error);
    throw error;
  }
};

const updatePackageJson = async (projectName) => {
  const file = editJsonFile(
    `${path.join(process.cwd(), projectName)}/package.json`,
    { autosave: true },
  );
  file.set("name", projectName);
};

const checkPackageManagerInstalled = async (packageManager) => {
  try {
    await asyncExec(`${packageManager} --version`);
    return true;
  } catch (error) {
    return false;
  }
};

const installNodeModules = async (destination, spinner, packageManager) => {
  spinner.text = `Install node_modules with ${packageManager}...\n`;

  const isPackageManagerInstalled =
    await checkPackageManagerInstalled(packageManager);
  if (!isPackageManagerInstalled) {
    spinner.fail(
      chalk.red(
        `\n❌ ${packageManager} is not installed. Please install it and try again.\n`,
      ),
    );
    process.exit(1);
  }

  let installCommand = "";
  switch (packageManager) {
    case "npm":
      installCommand = "npm install --legacy-peer-deps";
      break;
    case "yarn":
      installCommand = "yarn install";
      break;
    case "pnpm":
      installCommand = "pnpm install";
      break;
    case "bun":
      installCommand = "bun install";
      break;
    default:
      installCommand = "npm install --legacy-peer-deps";
  }
  await asyncExec(installCommand, { cwd: destination });
};

const getScriptCommand = (packageManager, scriptName) => {
  switch (packageManager) {
    case "npm":
      return `npm run ${scriptName}`;
    case "yarn":
      return `yarn run ${scriptName}`;
    case "pnpm":
      return `pnpm run ${scriptName}`;
    case "bun":
      return `bun run ${scriptName}`;
    default:
      return `npm run ${scriptName}`;
  }
};

const runScript = async (destination, spinner, packageManager, scriptName) => {
  const scriptCommand = getScriptCommand(packageManager, scriptName);
  try {
    await asyncExec(scriptCommand, { cwd: destination });
  } catch (error) {
    spinner.warn(
      chalk.yellow(
        `\n⚠️ Failed to run ${scriptName}, you may need to run it manually. \n`,
      ),
    );
    console.error(chalk.red(`\n❌ Error: ${error.message}\n`));
  }
};

const postInstallScripts = async (destination, template, spinner) => {
  switch (template) {
    case "prisma":
      {
        spinner.text = "Run prisma generate...";
        await asyncExec("npm run prisma:generate", { cwd: destination }); // แก้ไข cwd
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
  spinner.succeed(chalk`{green 🎉 Complete setup project}`);
  const msg = {
    prisma:
      "⛰ Prisma installed. Check your .env settings and then run `npm run prisma:migrate`",
    knex: "⛰ Knex installed. Check your .env settings and then run `npm run migrate`",
  }[template || ""];

  msg && console.log(msg);
};

const failConsole = async (error, spinner) => {
  spinner.fail(chalk`{red Please leave this error as an issue}`);
  console.error(error);
};

module.exports = createProject;
