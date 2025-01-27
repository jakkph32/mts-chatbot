# MTS Chatbot

**MTS Chatbot** is a toolkit for quickly creating and deploying AI-powered chatbots. It provides pre-built templates with various functionalities, making it easy to get started with your own chatbot project.

## Features

- **Template-based:** Choose from a variety of chatbot templates to fit your needs.
- **Easy to Customize:** All templates are designed to be easily customized to your specific requirements.
- **Environment Variable Management:** Utilizes `.env` files and `cross-env` for seamless environment variable management across different operating systems.
- **Development and Production Ready:** Includes scripts for both development and production builds, leveraging `nodemon` and `ts-node` for development efficiency.
- **Linting and Formatting:** Pre-configured with ESLint and Prettier to maintain code quality and consistency.
- **Version Control:** Pre-configured with Husky for pre-commit hooks to enforce code quality before committing.

## Project Structure

```
mts-chatbot/
  ├── .npmignore               # Files to ignore when publishing to npm
  ├── .npmrc                  # npm configuration
  ├── .prettierignore          # Files to ignore for Prettier formatting
  ├── .prettierrc             # Prettier configuration
  ├── eslint.config.mjs      # ESLint configuration
  ├── package.json            # Project dependencies and scripts
  ├── README.md               # This file
  ├── templates/               # Contains chatbot templates
  │   ├── Chatbot_with_Database/ # Chatbot with database integration template
  │   │   ├── .prettierignore
  │   │   ├── .prettierrc
  │   │   ├── eslint.config.mjs
  │   │   ├── package.json
  │   │   ├── sample.env.development.local # Example development env file
  │   │   ├── sample.env.production.local  # Example production env file
  │   │   ├── src/             # Source code for template
  │   │   │   └── app.ts
  │   │   └── .husky/           # Husky pre-commit hook
  │   │        └── pre-commit
  │   ├── Chatbot/              # Basic chatbot template
  │   │   ├── .prettierignore
  │   │   ├── .prettierrc
  │   │   ├── eslint.config.mjs
  │   │   ├── package.json
  │   │   ├── sample.env.development.local
  │   │   ├── sample.env.production.local
  │   │   ├── src/
  │   │   │   └── app.ts
  │   │   └── .husky/
  │   │       └── pre-commit
  ├── lib/                    # Library files
  │   ├── gitignore.d.ts
  │   └── starter.js
  ├── .husky/                  # Root Husky configuration
  │   └── pre-commit
  └── .github/                 # Github related files
      ├── README.md           # README for GitHub
      └── workflows/          # Github workflows
          └── publish.yml     # Workflow for publishing to NPM

```

## Project Setup Guide

This document outlines the steps to set up a new project using the project starter script.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (Optional, for containerization)
- [Prisma CLI](https://www.prisma.io/docs/reference/prisma-cli-reference)

## Installation

1.  **Run the starter script:**
    Open your terminal or command prompt and run the following command:

    ```bash
    npx create-mts-chatbot <optional-project-name>
    ```

    - `<optional-project-name>` is an optional argument to give the project a name directly.

    **If you don't provide a project name in argument:** The script will prompt you to enter a project name.

    ```
    What is your project name?
    ```

2.  **Choose a package manager:**
    The script will prompt you to select a package manager:

    ```
    Choose a package manager
        > npm
        yarn
        pnpm
        bun
    ```

    Select your preferred package manager (`npm`, `yarn`, `pnpm`, or `bun`).

3.  **Select a template:**
    The script will list available templates. Choose the one that suits your needs:

    ```
    Select a template
        > Chatbot_with_Prisma 🔹 A chatbot template with Prisma integration
          ...
    ```

4.  **Project creation and dependency installation:**

    - The script will create a new directory with your project name and copy template files.
    - It will install the necessary Node.js dependencies using the selected package manager (npm/yarn/pnpm/bun).

5.  **Post-installation scripts:**

- Some templates might require additional steps, such as running `prisma generate` for the "Chatbot_with_Prisma" template.

6.  **Initialize Git:**

    - The script will automatically initialize a git repository within the project directory.

7.  **Completion message:**
    If all goes well, you'll see a "Complete setup project" message with additional instructions, if necessary, for the selected template.

## Usage (Example for Chatbot_with_Prisma template)

After setup for `Chatbot_with_Prisma` template, you'll see the message:

```
⛰ Prisma installed. Check your .env settings and then run `npm run prisma:migrate`
```

1.  **Configure environment variables:**

    - Open the `.env` file in your project directory.
    - Update the settings to match your database configuration or desired settings.

2.  **Run database migrations (for Prisma templates):**
    For `Chatbot_with_Prisma` template, run the following command to apply database changes:

    ```bash
    npm run prisma:migrate
    ```

    If you use yarn, pnpm, or bun, use the `yarn run prisma:migrate`, `pnpm run prisma:migrate` or `bun run prisma:migrate` commands respectively.

3.  **Start your application:**
    Refer to the documentation of your selected template for the command to start the application (e.g., `npm run dev`).

## Troubleshooting

- **Package manager not installed:** If the script fails because your chosen package manager (`npm`,`yarn`,`pnpm` or `bun`) is not installed, you need to install it first.
- **Script errors:** If any errors happen during the process, copy the error message in your terminal and search the web or create an issue in this repo.

## Contributing

If you want to contribute or improve this script, please feel free to make changes and submit a pull request.

## License

[MIT License](LICENSE)
