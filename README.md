# Playwright TypeScript Example

This project contains automated tests using [Playwright](https://playwright.dev/) and TypeScript.

## Prerequisites

Before you begin, ensure you have [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) installed.

## Getting Started

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Install Playwright Browsers:**
   ```bash
   yarn playwright install
   ```

## Running Tests

You can run your tests using the following commands:
- **Run all tests:**
  ```bash
  yarn test
  ```

- **Open Playwright UI Mode:**
  ```bash
  yarn test:ui
  ```

- **Show HTML Report:**
  ```bash
  yarn report
  ```

- **Run a specific test file:**
  ```bash
  yarn test tests/example.spec.ts
  ```

## Project Structure

- `tests/`: Contains the test files.
- `pages/`: Page Object Models (POM) for better maintainability.
- `playwright.config.ts`: Configuration for Playwright.