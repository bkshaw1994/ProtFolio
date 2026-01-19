# Build Process Documentation

## Overview
This project implements comprehensive quality gates in the build process to ensure code quality, test coverage, and linting standards before deployment.

## Quality Gates
The build process enforces the following quality gates:
1. **ESLint Validation**: Zero warnings/errors allowed
2. **Test Coverage**: Minimum 70% coverage across all metrics
3. **Unit Tests**: All tests must pass

## Build Scripts

### Root Level Scripts

#### Production Build
```bash
npm run build:prod
```
- Runs comprehensive pre-build validation
- Executes linting with zero tolerance for warnings
- Validates test coverage thresholds
- Builds both client and server for production

#### Development Build
```bash
npm run build:dev
```
- Builds client without quality gate validation
- Useful for development iteration

#### CI/CD Build
```bash
npm run build:ci
```
- Optimized for continuous integration
- Includes comprehensive linting and testing
- Designed for automated pipelines

### Client Scripts

#### Standard Build
```bash
cd client && npm run build
```
- Includes pre-build validation (linting + coverage)
- Builds React application for production

#### Development Build
```bash
cd client && npm run build:dev
```
- Builds without quality gates
- For development purposes only

#### Production Build
```bash
cd client && npm run build:prod
```
- Full validation including linting and coverage
- Recommended for production deployments

### Server Scripts

#### Build Validation
```bash
cd server && npm run build
```
- Validates server code quality
- Runs linting and tests
- Confirms production readiness

## Quality Gate Details

### ESLint Configuration
- **Client**: Uses React-specific rules with `.eslintrc.json`
- **Server**: Uses flat config format with `eslint.config.js`
- **Zero Warnings Policy**: `--max-warnings=0` enforces strict code quality

### Test Coverage Thresholds
All projects maintain minimum 70% coverage across:
- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

### Failure Handling
Build process will fail (exit code 1) if:
- Any ESLint warnings or errors are found
- Test coverage falls below 70% threshold
- Any unit tests fail
- Build compilation errors occur

## Build Process Flow

```
Production Build (npm run build:prod)
├── Pre-build Validation
│   ├── Client Linting (--max-warnings=0)
│   ├── Server Linting (--max-warnings=0)
│   ├── Client Test Coverage (70% threshold)
│   └── Server Test Coverage (70% threshold)
├── Build Execution
│   ├── Client Production Build
│   └── Server Validation
└── Success/Failure Report
```

## Script Reference

### Root Package.json Scripts
- `build:prod` - Full production build with quality gates
- `build:dev` - Development build without validation
- `build:ci` - CI/CD optimized build
- `build:all` - Build both client and server
- `pre-build` - Run all quality gate validations
- `lint:all:check` - Lint entire project with zero warnings
- `test:all:coverage:check` - Validate coverage across project

### Client Package.json Scripts
- `build` - Standard build with validation
- `build:dev` - Development build without validation
- `build:prod` - Production build with full validation
- `build:validate` - Run linting and coverage checks
- `lint:check` - ESLint with --max-warnings=0
- `test:coverage:check` - Jest coverage validation

### Server Package.json Scripts
- `build` - Server build validation
- `build:prod` - Production readiness validation
- `build:validate` - Linting and testing validation
- `lint:check` - ESLint with --max-warnings=0
- `test:coverage:check` - Jest coverage validation

## Usage Examples

### Development Workflow
```bash
# Development with hot reload
npm run dev

# Quick development build
npm run build:dev

# Full validation before commit
npm run build:prod
```

### CI/CD Integration
```bash
# Install dependencies
npm run install-deps

# Run CI build with all quality gates
npm run build:ci

# Deploy if build succeeds
npm start
```

### Quality Validation Only
```bash
# Just run linting
npm run lint:all:check

# Just run tests with coverage
npm run test:all:coverage:check

# Full pre-build validation
npm run pre-build
```

## Troubleshooting

### Build Failures

#### ESLint Warnings
```
ESLint found too many warnings (maximum: 0)
```
**Solution**: Fix all ESLint warnings or use `npm run lint:fix` for auto-fixable issues.

#### Coverage Below Threshold
```
Coverage threshold for branches (70%) not met
```
**Solution**: Add more tests to increase coverage or review threshold settings in jest.config.js.

#### Test Failures
```
Test Suites: 1 failed, 2 passed, 3 total
```
**Solution**: Fix failing tests before attempting to build.

### Performance Tips
- Use `npm run build:dev` during development to skip quality gates
- Run `npm run lint:all:check` frequently to catch issues early
- Monitor coverage reports to identify untested code

## Configuration Files
- `jest.config.js` - Root Jest configuration
- `client/jest.config.json` - Client-specific Jest config
- `server/jest.config.js` - Server-specific Jest config
- `client/.eslintrc.json` - Client ESLint rules
- `server/eslint.config.js` - Server ESLint configuration
- `.vscode/settings.json` - VSCode auto-fix settings

## Best Practices
1. Always run `npm run build:prod` before creating pull requests
2. Fix ESLint warnings immediately to maintain zero-warning policy
3. Write tests to maintain coverage thresholds
4. Use CI/CD scripts in automated pipelines
5. Monitor build performance and optimize as needed
