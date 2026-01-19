# Jest Testing Configuration

This project uses Jest for comprehensive testing across both client (React) and server (Node.js) codebases.

## Overview

- **Client**: Jest with React Testing Library for component and integration testing
- **Server**: Jest with Supertest for API and unit testing
- **Root**: Workspace-level configuration for running all tests together
- **Coverage**: Comprehensive coverage reporting with thresholds

## Project Structure

```
ProtFolio/
├── jest.config.js              # Root workspace configuration
├── client/
│   ├── jest.config.json        # Client-specific overrides
│   ├── src/
│   │   ├── setupTests.js       # Client test setup
│   │   └── __tests__/          # Client test files
│   └── package.json
├── server/
│   ├── jest.config.js          # Server configuration
│   ├── jest.setup.js           # Server test setup
│   ├── jest.globalSetup.js     # Global setup (MongoDB)
│   ├── jest.globalTeardown.js  # Global teardown
│   ├── __tests__/              # Server test files
│   └── package.json
└── coverage/                   # Combined coverage reports
```

## Installation

Jest dependencies are already configured. If you need to reinstall:

### Client Dependencies (already installed)
```bash
cd client
# Jest comes with Create React App
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### Server Dependencies
```bash
cd server
npm install --save-dev jest supertest @types/jest mongodb-memory-server
```

## Available Commands

### Root Level (Run All Tests)
```bash
npm test              # Run all tests (client + server)
npm run test:coverage # Run all tests with coverage
npm run test:watch    # Watch mode for all tests
npm run test:ci       # CI mode (no watch, with coverage)
npm run test:client   # Run only client tests
npm run test:server   # Run only server tests
```

### Client-Specific
```bash
cd client
npm test              # Interactive watch mode
npm run test:coverage # Coverage report
npm run test:ci       # CI mode
```

### Server-Specific
```bash
cd server
npm test              # Run all server tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
npm run test:ci       # CI mode
```

## Test File Patterns

### Client Tests
- `src/**/__tests__/**/*.{js,jsx}` - Test files in __tests__ folders
- `src/**/*.(test|spec).{js,jsx}` - Test files with .test or .spec suffix

### Server Tests
- `__tests__/**/*.js` - Test files in __tests__ folder
- `**/?(*.)+(spec|test).js` - Test files with .test or .spec suffix

## Configuration Features

### Client Configuration
- **Environment**: jsdom (browser-like environment)
- **Setup**: React Testing Library with custom utilities
- **Mocks**: localStorage, sessionStorage, IntersectionObserver, etc.
- **Module Mapping**: Path aliases for clean imports
- **Coverage**: Excludes build files and test utilities

### Server Configuration
- **Environment**: Node.js
- **Database**: In-memory MongoDB for isolated testing
- **Setup**: Custom test utilities and global mocks
- **Coverage**: Excludes config files and test utilities
- **Timeout**: 30 seconds for async operations

### Global Coverage Thresholds
- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

## Writing Tests

### Client Component Tests

```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import MyComponent from '../MyComponent';

// Test wrapper with providers
const TestWrapper = ({ children }) => (
  <Provider store={mockStore}>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </Provider>
);

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(
      <TestWrapper>
        <MyComponent />
      </TestWrapper>
    );

    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Server API Tests

```javascript
const request = require('supertest');
const app = require('../index');

describe('API Routes', () => {
  it('should return project data', async () => {
    const response = await request(app)
      .get('/api/projects')
      .expect(200);

    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
```

### Unit Tests

```javascript
const { formatDate } = require('../utils');

describe('Utility Functions', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2023-12-25');
      expect(formatDate(date)).toBe('12/25/2023');
    });
  });
});
```

## Test Utilities

### Client Utilities (setupTests.js)
- Mock browser APIs (localStorage, IntersectionObserver, etc.)
- Global test helpers for store and router mocking
- Custom render functions with providers

### Server Utilities (jest.setup.js)
- Mock console methods for cleaner output
- Test data factories (createTestUser, createTestProject, etc.)
- Environment variable setup
- MongoDB configuration

## Database Testing

The server uses MongoDB Memory Server for isolated testing:

- **Automatic Setup**: In-memory database starts before tests
- **Clean State**: Database is cleared between tests
- **No Dependencies**: No external MongoDB instance required
- **Fast**: In-memory operations for quick test execution

## Coverage Reports

Coverage reports are generated in multiple formats:
- **Text**: Console output with summary
- **LCOV**: For integration with code coverage tools
- **HTML**: Detailed browser-viewable report in `coverage/` directory
- **JSON**: Machine-readable format

### Viewing Coverage
```bash
# Generate coverage report
npm run test:coverage

# View HTML report
open coverage/lcov-report/index.html
```

## Continuous Integration

For CI/CD pipelines, use the CI-specific commands:

```bash
# .github/workflows/test.yml example
npm run test:ci  # No watch mode, generates coverage
```

## Mocking

### Client Mocking
- **API Calls**: Global fetch mock in setupTests.js
- **External Libraries**: Mock framer-motion, react-router, etc.
- **Browser APIs**: localStorage, IntersectionObserver, etc.

### Server Mocking
- **External APIs**: Mock axios calls to GitHub API
- **Database**: Use test database with controlled data
- **File System**: Mock file operations when needed

## Best Practices

### Test Organization
1. Group related tests with `describe` blocks
2. Use descriptive test names that explain the expected behavior
3. Keep tests focused on single functionality
4. Use `beforeEach`/`afterEach` for test isolation

### Test Data
1. Use factory functions for consistent test data
2. Keep test data minimal and focused
3. Use realistic but simple data structures
4. Clear data between tests to avoid interference

### Assertions
1. Use specific assertions (`toHaveProperty` vs `toBeTruthy`)
2. Test both positive and negative cases
3. Assert on behavior, not implementation details
4. Use snapshot testing sparingly and meaningfully

### Performance
1. Mock external dependencies to speed up tests
2. Use `describe.skip` or `it.skip` for temporarily disabled tests
3. Keep test suites focused and well-organized
4. Avoid overly complex test setups

## Common Issues & Solutions

### "Module not found" errors
- Check module path mappings in jest.config.json
- Ensure setupTests.js is properly configured
- Verify babel presets for React components

### Async test failures
- Use proper async/await patterns
- Increase timeout for slow operations
- Ensure proper cleanup in afterEach hooks

### Coverage not meeting thresholds
- Add tests for uncovered branches
- Review coverage report for missed lines
- Consider excluding non-testable files

### Database connection issues
- Ensure MongoDB Memory Server is properly configured
- Check global setup/teardown functions
- Verify test isolation between test suites

## Example Test Structure

```
__tests__/
├── components/
│   ├── Navbar.test.js
│   ├── Footer.test.js
│   └── LoadingSpinner.test.js
├── pages/
│   ├── Home.test.js
│   └── Projects.test.js
├── services/
│   ├── api.test.js
│   └── githubService.test.js
├── utils/
│   └── helpers.test.js
└── integration/
    └── routes.test.js
```

## Current Status

✅ **Jest Setup Complete**
- Root, client, and server configurations
- Test utilities and mocking setup
- Coverage reporting with thresholds
- ESLint integration for test files
- Example test files for demonstration

✅ **Ready for Development**
- Run `npm test` to execute all tests
- Add new test files following the patterns shown
- Coverage reports available in `coverage/` directory
- CI-ready with `npm run test:ci`
