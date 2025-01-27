# Chatbot Template with Prisma

This template provides a foundation for building a chatbot application using Node.js and TypeScript, enhanced with Prisma for database interactions. It includes pre-configured settings for development and production environments, along with tools for linting, formatting, and deployment.

## Features

- **Node.js and TypeScript:** Built with modern JavaScript practices and strong typing for robust development.
- **Prisma ORM:** Simplifies database interactions with a type-safe and intuitive API.
- **Environment Configuration:** Includes sample environment files for both development and production.
- **Pre-configured Tooling:**
  - **ESLint:** For code linting and quality.
  - **Prettier:** For code formatting and consistency.
  - **Husky:** For Git hooks to enforce pre-commit checks.
- **Nginx Configuration:** Ready-to-use Nginx configuration for easy deployment.
- **Swagger Documentation:** Swagger YAML file included for API documentation.

## Project Structure

```
├── .husky/                     # Git hooks
│   └── pre-commit             # Pre-commit hook
├── nginx.conf                 # Nginx configuration
├── package.json               # Project dependencies and scripts
├── README.md                  # This README file
├── sample.env.development.local # Sample development environment variables
├── sample.env.production.local # Sample production environment variables
├── swagger.yml                # Swagger API definition
├── tsconfig.json              # TypeScript configuration
└── src/                       # Source code directory
    ├── app.ts                # Main application file
    └── prisma/                 # Prisma related files
        └── schema.prisma      # Prisma schema definition
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
