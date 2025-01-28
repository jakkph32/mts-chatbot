import chalk from 'chalk';
import { exec } from 'child_process';
import editJsonFile from 'edit-json-file';
import { createWriteStream, readdir } from 'fs';
import GitIgnore from 'gitignore'
import ora from 'ora';
import { join } from 'path';
import { promisify } from 'util';
import { cp, mkdir } from 'node:fs/promises';
import inquirer from 'inquirer';
import path from "path"

const readDir = promisify(readdir);
const asyncExec = promisify(exec);
const writeGitignore = promisify(GitIgnore.writeFile);
const spinner = ora();

const createProject = async () => {
  let projectName;

  const projectNameArg = process.argv[2];
  if (projectNameArg) {
    projectName = projectNameArg;
    console.log(chalk.green(`Project name: ${projectName}`));
  } else {
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'What is your project name?',
        validate: input => input.trim() !== '' || 'Project name cannot be empty',
      },
    ]);
    projectName = answer.projectName;
  }

  const { packageManager } = await inquirer.prompt([
    {
      type: 'list',
      name: 'packageManager',
      message: 'Choose a package manager',
      choices: ['npm', 'yarn', 'pnpm', 'bun'],
      default: 'npm',
    },
  ]);

  try {
    const template = await chooseTemplates();

    console.log('[ 1 / 3 ] 🔍  copying project...');
    console.log('[ 2 / 3 ] 🚚  fetching node_modules...');

    await copyProjectFiles(projectName, template);
    await updatePackageJson(projectName);

    console.log('[ 3 / 3 ] 🔗  linking node_modules...');
    console.log('\u001b[2m──────────────────────────────────────────\u001b[22m');

    spinner.start();

    await installNodeModules(projectName, packageManager);
    await postInstallScripts(projectName, template, packageManager);
    await createGitignore(projectName);
    await initGit(projectName);

    await succeedConsole(template);
  } catch (error) {
    await failConsole(error);
  }
};

const getTemplateDir = async () => {
  const contents = await readDir(path.join(path.resolve(), 'apps'), {
    withFileTypes: true,
  });
  const directories = contents.filter(p => p.isDirectory()).map(p => p.name);

  return directories;
};

const chooseTemplates = async () => {
  const directories = await getTemplateDir();
  const choices = [];

  for (const dir of directories) {
    try {
      const packageJsonPath = join(__dirname, '../apps', dir, 'package.json');
      const packageJson = require(packageJsonPath);
      const description = packageJson.description || '';
      choices.push({ name: `${dir}🔹 ${description}`, value: dir });
    } catch (error) {
      choices.push({ name: dir, value: dir });
      console.error(chalk.yellow(`Warning: Could not read description for template ${dir}.`));
    }
  }

  const { chooseTemplates } = await inquirer.prompt([
    {
      type: 'list',
      name: 'chooseTemplates',
      message: 'Select a template',
      choices: [...choices, new inquirer.Separator()],
    },
  ]);

  return chooseTemplates;
};

const copyProjectFiles = async (projectName, template) => {
  const source = path.join(path.resolve(), 'apps', template);
  const destination = join(process.cwd(), projectName);

  try {
    await mkdir(destination, { recursive: true });
    await cp(source, destination, { recursive: true });
    return;
  } catch (error) {
    console.error('Error during file copy:', error);
    throw error;
  }
};

const updatePackageJson = async projectName => {
  const file = editJsonFile(`${join(process.cwd(), projectName)}/package.json`, { autosave: true });
  file.set('name', projectName);
};

const checkPackageManagerInstalled = async packageManager => {
  if (typeof packageManager !== 'string' || !['npm', 'pnpm', 'yarn', 'bun'].includes(packageManager)) {
    console.error(`Invalid package manager: ${packageManager}`);
    return false;
  }

  try {
    await asyncExec(`${packageManager} --version`);
    return true;
  } catch (error) {
    console.error(`Error checking ${packageManager} installation:`, error);
    return false;
  }
};

const installNodeModules = async (destination, packageManager) => {
  spinner.text = `Install node_modules with ${packageManager}...\n`;

  const isPackageManagerInstalled = await checkPackageManagerInstalled(packageManager);
  if (!isPackageManagerInstalled) {
    spinner.fail(chalk.red(`\n❌ ${packageManager} is not installed. Please install it and try again.\n`));
    process.exit(1);
  }

  let installCommand = '';
  switch (packageManager) {
    case 'npm':
      installCommand = 'npm install --legacy-peer-deps';
      break;
    case 'yarn':
      installCommand = 'yarn install';
      break;
    case 'pnpm':
      installCommand = 'pnpm install';
      break;
    case 'bun':
      installCommand = 'bun install';
      break;
    default:
      installCommand = 'npm install --legacy-peer-deps';
  }
  await asyncExec(installCommand, { cwd: destination });
};

const getScriptCommand = (packageManager, scriptName) => {
  switch (packageManager) {
    case 'npm':
      return `npm run ${scriptName}`;
    case 'yarn':
      return `yarn run ${scriptName}`;
    case 'pnpm':
      return `pnpm run ${scriptName}`;
    case 'bun':
      return `bun run ${scriptName}`;
    default:
      return `npm run ${scriptName}`;
  }
};

const runScript = async (destination, packageManager, scriptName) => {
  const scriptCommand = getScriptCommand(packageManager, scriptName);
  try {
    await asyncExec(scriptCommand, { cwd: destination });
  } catch (error) {
    spinner.warn(chalk.yellow(`\n⚠️ Failed to run ${scriptName}, you may need to run it manually. \n`));
    console.error(chalk.red(`\n❌ Error: ${error.message}\n`));
  }
};

const postInstallScripts = async (destination, template, packageManager) => {
  switch (template) {
    case 'Chatbot_with_Prisma':
      {
        spinner.text = 'Run prisma generate...';
        await runScript(destination, packageManager, 'prisma:generate');
      }
      break;
  }
};

const createGitignore = async destination => {
  spinner.text = 'Create .gitignore...';
  const file = createWriteStream(join(destination, '.gitignore'), {
    flags: 'a',
  });

  return writeGitignore({
    type: 'Node',
    file: file,
  });
};

const initGit = async destination => {
  await asyncExec('git init', { cwd: destination });
};

const succeedConsole = async template => {
  spinner.succeed(chalk.green('🎉 Complete setup project'));
  const msg = {
    prisma: '⛰ Prisma installed. Check your .env settings and then run `npm run prisma:migrate`',
    knex: '⛰ Knex installed. Check your .env settings and then run `npm run migrate`',
  }[template || ''];

  msg && console.log(msg);
};

const failConsole = async error => {
  spinner.fail(chalk.red('Please leave this error as an issue'));
  console.error(error);
};

export default createProject;
