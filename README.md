# TypeScript CI Demo

[![CI](https://github.com/oliynykroman/lecture-CI-example-setup/actions/workflows/ci.yml/badge.svg)](https://github.com/oliynykroman/lecture-CI-example-setup/actions/workflows/ci.yml)

This repository is a small educational project for demonstrating **Continuous Integration (CI)** with **TypeScript**, **Vitest**, **ESLint**, and **GitHub Actions**.

The goal is not to build a complex application. The goal is to show students how a real CI pipeline checks code automatically every time a developer pushes changes or opens a pull request.

## What Students Will Learn

By studying this repository, students will see:

- how a TypeScript project is structured;
- how automated tests are written and executed;
- how linting helps keep code consistent;
- how TypeScript compilation catches type errors;
- how GitHub Actions runs CI automatically;
- how a failing test makes the pipeline fail;
- how a pull request can be checked before merging code.

## Project Idea

The example project contains a small shopping cart calculation module.

It can:

- calculate the subtotal of cart items;
- apply a percentage discount;
- return the final total;
- reject invalid input such as negative prices or invalid discounts.

This domain is intentionally simple. Students should focus on the CI workflow, not on complex business logic.

## Repository Structure

```text
.
├── .github/
│   └── workflows/
│       └── ci.yml
├── src/
│   ├── cart.ts
│   └── index.ts
├── tests/
│   └── cart.test.ts
├── .gitignore
├── eslint.config.js
├── package.json
├── README.md
└── tsconfig.json
```

## Main Files Explained

### `src/cart.ts`

This file contains the main application logic.

It exports:

- `CartItem` - a TypeScript type that describes a product in the cart;
- `calculateSubtotal()` - calculates the total price before discount;
- `applyDiscount()` - applies a percentage discount;
- `calculateTotal()` - combines subtotal and discount calculation.

The functions also validate input. For example, a negative price is rejected because it would produce an incorrect business result.

### `tests/cart.test.ts`

This file contains automated tests written with **Vitest**.

The tests check that:

- subtotal calculation works correctly;
- discounts are applied correctly;
- an empty cart returns `0`;
- invalid prices throw an error;
- invalid discounts throw an error.

These tests are important because CI will run them automatically. If someone breaks the logic, GitHub Actions will show a failed pipeline.

### `package.json`

This file defines project scripts:

```json
{
  "scripts": {
    "lint": "eslint .",
    "test": "vitest run",
    "build": "tsc --noEmit"
  }
}
```

The scripts are used both locally and in CI:

- `npm run lint` checks code style and common mistakes;
- `npm test` runs automated tests;
- `npm run build` runs the TypeScript compiler.

### `.github/workflows/ci.yml`

This is the CI configuration file for GitHub Actions.

GitHub automatically reads workflow files from `.github/workflows/`.

The CI workflow runs when:

- code is pushed to `main` or `develop`;
- a pull request targeting `main` is opened or updated.

## How The CI Pipeline Works

The workflow contains one job named `quality-checks`.

It runs the same checks on multiple Node.js versions:

```yaml
strategy:
  matrix:
    node-version: [20.x, 22.x]
```

This is called a **matrix build**. It helps verify that the project works in more than one runtime environment.

The pipeline steps are:

1. **Checkout repository**

   GitHub Actions downloads the repository code into the CI runner.

2. **Setup Node.js**

   The workflow installs the selected Node.js version from the matrix.

3. **Install dependencies**

   The workflow runs:

   ```bash
   npm ci
   ```

   `npm ci` is preferred in CI because it installs dependencies exactly from `package-lock.json`.

4. **Lint**

   The workflow runs:

   ```bash
   npm run lint
   ```

   This checks code quality and formatting-related rules.

5. **Test**

   The workflow runs:

   ```bash
   npm test
   ```

   This executes the Vitest test suite.

6. **Build**

   The workflow runs:

   ```bash
   npm run build
   ```

   In this project, the build step uses TypeScript only for type checking. It does not generate JavaScript files because `tsc --noEmit` is used.

## Running The Project Locally

Install dependencies:

```bash
npm install
```

Run linting:

```bash
npm run lint
```

Run tests:

```bash
npm test
```

Run TypeScript type checking:

```bash
npm run build
```

Run all checks locally:

```bash
npm run ci
```

## Suggested Classroom Demonstration

### 1. Show The Green Pipeline

Push the initial working version to GitHub:

```bash
git add .
git commit -m "Add TypeScript CI demo"
git push
```

Open the repository on GitHub and go to:

```text
Actions -> CI
```

Students should see a successful workflow run.

### 2. Break A Test Intentionally

Change this line in `src/cart.ts`:

```ts
return Number(discountedTotal.toFixed(2));
```

to an incorrect version:

```ts
return discountedTotal;
```

Then commit and push the change.

The CI pipeline should fail if the result no longer matches the expected rounded value.

### 3. Fix The Code

Restore the correct implementation, commit again, and push.

Students will see that the pipeline becomes green again.

This demonstrates the main CI feedback loop:

```text
change -> push -> automatic checks -> feedback -> fix -> green pipeline
```

## Pull Request Workflow

A realistic team workflow usually looks like this:

1. Keep `main` as the stable branch.
2. Create or use a working branch such as `develop`.
3. Make changes in `develop`.
4. Push `develop` to GitHub.
5. Open a pull request from `develop` into `main`.
6. Wait for CI checks.
7. Review the code.
8. Merge only if CI is green.

Example:

```bash
git checkout develop
git add .
git commit -m "Improve cart validation"
git push
```

Then open a pull request on GitHub.

For a classroom demonstration, intentionally break one test in `develop`, push it, and open a pull request into `main`. Students will see that CI fails on the pull request while `main` remains protected from the broken change.

## Important CI Concepts

### Continuous Integration

Continuous Integration means that developers integrate their code frequently, and every integration is checked automatically.

The main purpose is to detect problems early.

### Pipeline

A pipeline is a sequence of automated steps.

In this repository, the pipeline is:

```text
install dependencies -> lint -> test -> build
```

### Runner

A runner is the machine where CI steps are executed.

This project uses `ubuntu-latest`, which means GitHub provides a temporary Linux machine for the workflow.

### Job

A job is a group of steps that run on the same runner.

This project has one job: `quality-checks`.

### Step

A step is one action inside a job.

Examples:

- checkout code;
- install Node.js;
- install dependencies;
- run tests.

### Matrix Build

A matrix build runs the same job with different values.

This repository tests the project with Node.js `20.x` and `22.x`.

### Failing Fast

If linting or tests fail, the workflow stops and GitHub marks the CI run as failed.

This prevents broken code from being merged unnoticed.

## Exercises For Students

1. Add a new test for a `100%` discount.
2. Add a new validation rule that rejects an empty item name.
3. Break one test intentionally and inspect the failed GitHub Actions log.
4. Add Node.js `24.x` to the workflow matrix when it is appropriate for your course environment.
5. Create a pull request and observe how CI runs before merging.

## Why This Example Is Useful

This project is small, but it contains the key parts of a real CI setup:

- version-controlled source code;
- package manager configuration;
- automated tests;
- static analysis;
- type checking;
- CI workflow file;
- CI status badge;
- pull request feedback.

The same ideas are used in larger professional projects. The only difference is scale.
