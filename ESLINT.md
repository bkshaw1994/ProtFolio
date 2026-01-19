# ESLint Configuration

This project uses ESLint to maintain code quality and consistency across both client and server codebases.

## Overview

- **Client**: Uses ESLint with React-specific rules and formatting standards
- **Server**: Uses ESLint v9 with modern flat config format for Node.js
- **Root**: Contains workspace-level configuration for the entire project

## Installation

ESLint and related plugins are already configured. If you need to reinstall:

### Client Dependencies
```bash
cd client
npm install --save-dev eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

### Server Dependencies
```bash
cd server
npm install --save-dev eslint
```

## Usage

### Linting Commands

#### Client (React)
```bash
cd client
npm run lint           # Check for linting issues
npm run lint:fix       # Automatically fix fixable issues
```

#### Server (Node.js)
```bash
cd server
npm run lint           # Check for linting issues
npm run lint:fix       # Automatically fix fixable issues
```

#### Root Level (All files)
```bash
npx eslint .           # Check all files in workspace
npx eslint . --fix     # Fix all fixable issues
```

### VS Code Integration

The project includes VS Code settings (`.vscode/settings.json`) that:
- Automatically fix ESLint issues on save
- Enable ESLint validation for JavaScript and React files
- Configure proper working directories for client and server

## Configuration Files

### Client Configuration
- **File**: `client/.eslintrc.json`
- **Format**: Legacy format (compatible with Create React App)
- **Extends**: `react-app`, `react-app/jest`
- **Rules**: Custom rules for React, formatting, and code quality

### Server Configuration
- **File**: `server/eslint.config.js`
- **Format**: Flat config (ESLint v9)
- **Environment**: Node.js with CommonJS
- **Rules**: Server-specific rules for Express.js applications

### Root Configuration
- **File**: `.eslintrc.json`
- **Purpose**: Workspace-level overrides and configuration
- **Scope**: Both client and server with specific overrides

## Key Rules

### Common Rules (Both Client & Server)
- `no-unused-vars`: Warn for unused variables (allow `_` prefix)
- `prefer-const`: Prefer const over let when possible
- `indent`: 2 spaces with switch case indentation
- `quotes`: Single quotes preferred
- `semi`: Always use semicolons
- `comma-dangle`: No trailing commas
- `object-curly-spacing`: Always add spaces in object literals

### Client-Specific Rules
- `no-console`: Warn (allow console.warn and console.error)
- React hooks and JSX rules from `react-app` configuration
- Accessibility rules included

### Server-Specific Rules
- `no-console`: Off (console logging allowed in server)
- Node.js global variables configured
- Express.js patterns supported

## Ignored Files

### Client
- `node_modules/`
- `build/`
- `public/`
- Environment files (`.env*`)
- Service workers

### Server
- `node_modules/`
- Log files (`*.log`)
- Environment files (`.env*`)
- Coverage reports
- Upload directories

## Integration with Development Workflow

1. **Pre-commit**: Consider adding ESLint to pre-commit hooks
2. **CI/CD**: Add linting checks to your build pipeline
3. **Editor**: Use ESLint extension in your code editor
4. **Auto-fix**: Enable auto-fix on save in your editor

## Troubleshooting

### Common Issues

1. **Circular dependency errors**: Usually caused by plugin conflicts
   - Solution: Simplify extends array, remove redundant plugins

2. **Config format errors**: ESLint v9 uses flat config
   - Solution: Use `eslint.config.js` for new projects

3. **Import resolution**: Make sure working directories are set correctly
   - Solution: Check `.vscode/settings.json` working directories

### Getting Help

- Check the current lint issues: `npm run lint`
- Auto-fix what's possible: `npm run lint:fix`
- Review the specific rule documentation at [ESLint Rules](https://eslint.org/docs/rules/)

## Current Status

As of the latest setup:
- ✅ Client: 110 warnings (mostly formatting - fixable)
- ✅ Server: 60 warnings (mostly formatting - fixable)
- ✅ No errors in either codebase
- ✅ VS Code integration configured
- ✅ Auto-fix on save enabled

Most warnings are cosmetic (trailing commas, spacing) and can be auto-fixed with `npm run lint:fix`.
