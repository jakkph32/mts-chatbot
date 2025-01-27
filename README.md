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

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/mts-chatbot.git
    cd mts-chatbot
    ```
2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Choose a template:**

    - **Basic Chatbot Template:** Navigate to `templates/Chatbot`
    - **Chatbot with Database Integration:** Navigate to `templates/Chatbot_with_Database`

4.  **Configure Environment Variables:**
    - Copy `sample.env.development.local` to `.env.development.local` and populate it with your development environment variables
    - Copy `sample.env.production.local` to `.env.production.local` and populate it with your production environment variables
5.  **Start Developing**

- Navigate to the template you selected
- Run in development

  ```bash
  npm run dev
  ```

- Run in production

  ```bash
   npm run prod
  ```

## Available Templates

- **Chatbot:** A basic template for creating simple chatbots.
- **Chatbot with Database:** A more advanced template that demonstrates chatbot integration with a database.

## Development

- **Running Locally (Root):**

  - Run `npm run dev:root` to start the application in development mode. This will use `nodemon` and `ts-node` for hot-reloading.

- **Running in Development (Templates):**

  - Run `npm run dev` to start the application in development mode. This will use `nodemon` and `ts-node` for hot-reloading.

- **Running in Production (Templates):**

  - Run `npm run prod` to start the application in production mode.

- **Code Formatting:**

  - Run `npm run format` to automatically format your code with Prettier.

- **Linting:**
  - Run `npm run lint` to check for code errors and enforce code style with ESLint.

## Contributing

Contributions are welcome! Feel free to submit a pull request.

## License

[MIT License](LICENSE)
