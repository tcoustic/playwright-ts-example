# Repository Architecture & Decisions

This document outlines the key technical decisions made during the setup of this automation repository.

## 1. Technical Stack
*   **Playwright:** Chosen for its native support for modern web features, built-in waiting mechanisms, and superior speed compared to Selenium. Chosen over Cypress due to its simpler API and less opinionated approach to testing.
*   **TypeScript:** Implemented to provide strict typing, which improves developer experience in WebStorm and catches errors during development rather than at runtime.
*   **Yarn:** Selected as the package manager for consistent dependency locking and speed.

## 2. Project Structure
The repository has the following structure:
*   `tests/`: Simple test logic for better high level readability. 
*   `pages/`: Implementation of the **Page Object Model (POM)** to encapsulate page-specific logic and locators.
*   `models/`: Data structures and interfaces to ensure data consistency across tests.

## 3. Design Decisions

### Page Object Model (POM)
To avoid locator duplication and make tests more readable, all interactions with the UI must be defined in the `pages/` directory. Tests should only call methods from these objects.

### Data Modeling
Instead of hardcoding reused strings in test files, we use dedicated model files in `/models`.
*   **Decision:** Centralizing user credentials (like `CORRECT_USER`) allows for easier updates if test data changes across the environment.

### Configuration (`playwright.config.ts`)
*   **Traceability:** Configured to save traces on the first retry of a failed test to assist in debugging without bloating the `test-results` folder.
*   **Parallelism:** Enabled by default to maximize execution speed, assuming tests remain independent and atomic.

## 4. Testing Standards
*   **Locators:** Priority is given to unique attributes where possible, such as `data-test` or id attributes.
*   **Independence:** Each test must be able to run in isolation. Shared state between tests is strictly avoided.

## 5. Maintenance
*   **Reports:** HTML reports are generated after every run and stored in `playwright-report/`. This folder is ignored by Git to keep the repository clean.

## 6. Omitted Features
*   **Cleanup:** No cleanup is currently implemented, due to nature of the application under test, and lack of persisted data created by tests.