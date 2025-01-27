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

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (Optional, for containerization)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```
2.  **Navigate to the template:**
    ```bash
    cd templates/Chatbot_with_Prisma
    ```
3.  **Install dependencies:**

    ```bash
    npm install # or yarn install
    ```

4.  **Setup environment variables:**
    - Copy `sample.env.development.local` to `.env.development.local`
    - Copy `sample.env.production.local` to `.env.production.local`
    - Update the values in these files to match your environment.

### Development

1.  **Run development server:**
    ```bash
    npm run dev # or yarn dev
    ```
2.  **Access the application in your browser**
    - Typically at `http://localhost:3000`
    - Check your `app.ts` configuration for port details

### Prisma Setup

1. **Install Prisma CLI (if not installed):**
   ```bash
   npm install prisma --save-dev
   ```
2. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```
3. **Migrate database:**
   ```bash
   npx prisma migrate dev --name init
   ```

## Deployment

1.  **Build the application:**
    ```bash
    npm run build # or yarn build
    ```
2.  **(Optional) Deploy with Docker:**
    - Refer to the Docker documentation for best practices.
    - Use the provided `nginx.conf` for server setup.

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](link_to_contributing_file) file for guidelines.

## License

[MIT](LICENSE_FILE_LINK)
