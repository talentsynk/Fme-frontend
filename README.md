# FME Skills Database Platform (Frontend)

Welcome to the frontend repository for the FME Skills Database Platform, powered by [Coderina](https://coderina.org/) and built for talentsynk. This project provides a robust, scalable portal managing various stakeholders including the FME (Federal Ministry of Education), MDA (Ministries, Departments, and Agencies), and STC (State Tech Components).

This is a [Next.js](https://nextjs.org/) (v14) project bootstrapping a modern, responsive web application.

---

## Tech Stack

The project utilizes the following core technologies:
- **Framework**: [Next.js v14](https://nextjs.org/) (App Router)
- **UI Library**: [React 18](https://reactjs.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Styled Components](https://styled-components.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 📁 Project Structure

The project follows a standard Next.js App Router structure augmented with Redux and modular components:

```text
Fme-frontend/
├── public/                 # Static assets (images, fonts, favicons)
│   └── assets/             # Sub-folders for fme, mda, and stc assets
└── src/
    ├── app/                # Next.js App router (pages, layouts)
    │   ├── (auth)/         # Authentication routes (login, register, recovery)
    │   ├── (dashboard)/    # Dashboard shells for different roles
    │   │   ├── fme/        # FME portal pages
    │   │   ├── mda/        # MDA portal pages
    │   │   └── stc/        # STC portal pages
    │   ├── (nonadmin)/     # Non-administrative user paths
    │   └── (root)/         # Root application landing pages
    ├── components/         # Reusable React components categorized by feature
    ├── constants/          # Application-wide constants and configuration values
    ├── lib/                # Utility scripts, helpers, and configurations
    ├── redux/              # Redux slices, hooks, and global store config
    ├── types/              # TypeScript typings and interfaces
    └── utils/              # Generic utility functions
```

---

## 🛠 Prerequisites

Ensure you have the following installed on your local machine before continuing:
- **Node.js** (v18.x or later recommended)
- **npm**, **yarn**, or **pnpm** (npm v9+ is recommended as per package-lock.json)
- **Git**

---

## Getting Started

### 1. Clone the Repository
Clone this repository to your local machine:
```bash
git clone https://github.com/talentsynk/Fme-frontend.git
cd Fme-frontend
```

### 2. Install Dependencies
Install the required project dependencies:
```bash
npm install
# or
yarn install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root of the project to store your local configuration. Refer to any provided `.env.example` or coordinate with the backend team for required API endpoints and secrets.
```bash
touch .env.local
```
*(You will need to specify variables like your API Base URLs here. Example: `NEXT_PUBLIC_API_URL=...`)*

### 4. Run the Development Server
Start the Next.js development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application running. Edit files in `src/app/` and the application will hot-reload.

---

## Contributing

We welcome contributions to the FME Skills Database Platform! If you're a developer reading this, here's how you can get started:

1. **Fork** the repository and create your branch from `main` (or the respective development branch).
```bash
git checkout -b feature/your-feature-name
```
2. **Make your changes**: Write clean, modular, and well-documented code. Please adhere to the existing ESLint and Prettier configurations.
3. **Commit your changes**: Provide clear, descriptive commit messages.
```bash
git commit -m "feat: Add new user profile component"
```
4. **Push to your branch**:
```bash
git push origin feature/your-feature-name
```
5. **Open a Pull Request**: Submit a PR summarizing your changes against the main project repository.

### Coding Standards
- **TypeScript**: Ensure proper typing. Avoid the use of `any` whenever possible.
- **Components**: Group related styles, logic, and tests together.
- **State**: Use Redux Toolkit for complex global state. Prefer local component state where global states aren't necessary.

---

## Scripts

- `npm run dev`: Starts the application in development mode.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a Next.js production server (run build first).
- `npm run lint`: Runs ESLint to catch and fix code issues.

---

## Learn More

To learn more about the tools driving this frontend, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)

---
*Built by [talentsynk](https://github.com/talentsynk).*
