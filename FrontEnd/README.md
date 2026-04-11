# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      # Teacher App - Next.js + TypeScript + Material-UI
      This is a Next.js application for a teaching and tutoring service, featuring booking functionality, package information, and more.
      ## Getting Started
      First, install the dependencies:
      ```bash
      npm install
      ```
      Then, run the development server:
      ```bash
      npm run dev
      ```
      Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
      ## Build for Production
      ```bash
      npm run build
      npm start
      ```

      ## Tech Stack

      - **Next.js 16** - React framework with App Router
      - **TypeScript** - Type safety
      - **Material-UI (MUI)** - Component library with Emotion styling
      - **React 19** - Latest React features

      ## Project Structure

      ```
      app/                    # Next.js App Router pages
        layout.tsx           # Root layout with theme provider
        page.tsx             # Home page
        about/               # About page
        Booking/             # Booking page
        Packages/            # Packages page
        Services/            # Services page
      src/
        Components/          # Reusable React components
        theme.ts             # Material-UI theme configuration
      ```

      ## Pages

      - **Home (/)** - Landing page with hero section and service overview
      - **/about** - Qualifications and experience information
      - **/Packages** - Available tutoring packages
      - **/Booking** - Book a session
      - **/Services** - Core services offered

      ## Migration from Vite

      This project was migrated from Vite to Next.js. Key changes:
      - React Router replaced with Next.js App Router
      - Client components marked with 'use client' directive
      - Path aliases using @/ prefix
      - Vite config replaced with next.config.js
      - Scripts updated in package.json

      ## Learn More

      To learn more about Next.js, take a look at the following resources:

      - [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
      - [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
