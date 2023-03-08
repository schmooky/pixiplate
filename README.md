# pixiplate

Decent template repo for pixi v7 with @pixi/react and mobx

![GitHub package.json version](https://img.shields.io/github/package-json/v/devianllert/nextplate?style=for-the-badge)

## Introduction
This is a **template** with all you need for your next web application. Aims for developers who really care about code quality, architecture, security and all the best practices in frontend.

---

## Features

#### Architecture (WIP!)
- Architecture of pixiplate is reminiscent of project structure we use at Broit. It provides developer with decent game development foundation and uses reactive development principles to provide high development speed.
- Most of the time problems are solved with React hooks and classes are obly used while being wrapped in functional @pixi/react components when necessary. 

#### Localization

- **[i18next](https://www.i18next.com)** – The easiest way to translate your PixiJS games
- **[BabelEdit](https://www.codeandweb.com/babeledit)** - Reliable localization editor. To use i18next localization files with Sheets or Excell, check out Scripts section

#### State Management

- **[mobx](https://github.com/mobxjs/mobx)** – A lightweight and easy to work with state manager
- **[MobX Developer Tools](https://github.com/mobxjs/mobx-devtools)** - Simple extension to look at your stores from browser

#### Motion

- **[GSAP](https://greensock.com/docs/v3/GSAP)** - Do I even need to explain why?
- **[@pixi/spine](https://github.com/pixijs/spine)** - Industry standart for skeletal animation

#### Design Patters

- **[ESLint](https://eslint.org)** – Find and fix problems in your JavaScript code
- **[Prettier](https://prettier.io)** – An opinionated code formatter, supporting multiple languages and code editors
- **[Husky](https://github.com/typicode/husky)** – Modern native Git hooks made easy
- **[lint-staged](https://github.com/okonet/lint-staged)** – Run linters against staged git files and don't let 💩 slip into your code base
- **[commitlint](https://commitlint.js.org/#/)** – Helps your team adhering to a commit convention
- **[Standard Version](https://github.com/conventional-changelog/standard-version)** – A utility for versioning using semver and CHANGELOG generation powered by Conventional Commits

#### Analysis

- **[PostHog](https://posthog.com)** – Collect any analytics without GDPR compliancy

#### Additional Plugins

- **[pixi-viewport](https://github.com/davidfig/pixi-viewport)** – For when you need a camera

---

## Getting Started

1. Click on "**Use this template**" button
2. Configure your new repository and click on "**Create repository from template**" button
3. Now you can clone the generated repository to your local machine:
    ```bash
    git clone https://github.com/<YOUR-GITHUB-LOGIN>/<NAME-OF-YOUR-GENERATED-REPOSITORY>.git
    ```

4. install dependencies:
   ```bash
   yarn install
   ```

### Development

Run the local development server:

```
yarn dev
```

### Production

You can generate a build to test and/or deploy to your production environment.

```bash
docker run -it $(docker build -q .)
```

### Linting

You can run linting with this commands:

```bash
yarn lint
```

Run to automatically fix problems:

```bash
yarn lint:fix
```
### Misc

Run to analyse production bundle:

```bash
yarn analyse:bundle
```

## Project structure

### Assets

### Components

### Stores
