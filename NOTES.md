# Development Notes

## NPM Commands and When to Use Them

### `npm run dev` / `npm start`
- **Not needed for:** 
  - React component changes
  - CSS/styling updates
  - Most code changes during development
  - These changes are automatically reflected due to Hot Module Replacement (HMR)

- **Needed when:**
  - Starting the development server for the first time
  - After changes to:
    - package.json dependencies
    - vite.config.js / webpack.config.js
    - environment variables (.env files)
    - server-side code (if applicable)
    - project configuration files

### `npm run build`
- **When to use:**
  - Creating a production-ready build
  - Before deploying to production
  - Testing production optimization
  - Analyzing bundle size
  
### `npm install`
- **When to use:**
  - After cloning the project
  - When package.json is modified
  - After pulling changes that include new dependencies
  - When switching branches with different dependencies

### Common Development Workflow
1. Start development server once (`npm run dev`)
2. Make changes to components/code
3. See immediate updates in browser
4. Only restart server if changing configuration files
5. Run build command when ready for production 