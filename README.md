# git-workflow

A practice repository for learning **GitHub Actions**, built around a small **React + Vite** app.

## Tech stack

- [React 19](https://react.dev/)
- [Vite 8](https://vite.dev/) with [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react)
- [ESLint 10](https://eslint.org/) with the React Hooks and React Refresh plugins

## Getting started

Requires Node.js 22 or later (CI uses Node.js 24).

```bash
npm install
npm run dev
```

The dev server runs at <http://localhost:5173>.

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot reload |
| `npm run build` | Build the production bundle into `dist/` |
| `npm run preview` | Serve the built `dist/` folder locally |
| `npm run lint` | Run ESLint over the project |
| `npm test` | Run the Vitest test suite (watch mode locally, single run in CI) |

There is no `npm start` script; use `npm run dev`.

## Project structure

```
.github/workflows/   GitHub Actions workflows (see below)
public/              Static assets served as-is
src/                 React source (main.jsx, App.jsx, styles, assets)
index.html           Page entry point
script.js            Plain JS file checked by the Validate workflow
vite.config.js       Vite configuration
eslint.config.js     ESLint configuration
```

## Branches

| Branch | Purpose |
| --- | --- |
| `main` | Default branch |
| `stage` | Staging branch for changes before they go to `main` |

## GitHub Actions workflows

| Workflow | File | Trigger | What it does |
| --- | --- | --- | --- |
| **Custom Check** | [customCheck.yaml](.github/workflows/customCheck.yaml) | Push to any branch | Two jobs that print a welcome and a goodbye message |
| **Validate** | [validate.yml](.github/workflows/validate.yml) | After **Custom Check** completes (`workflow_run`) | Checks that `index.html` and `script.js` exist, then validates the HTML and JS syntax |
| **Code Quality Check** | [lint.yml](.github/workflows/lint.yml) | Push or pull request to `main` or `stage` | Installs dependencies with `npm ci` on Node.js 24, then runs `npm run lint` and `npm run test` |
| **custom** | [custom.yml](.github/workflows/custom.yml) | Manual (`workflow_dispatch`) | Two jobs that print hello and bye messages |

### How the workflows chain together

```
git push
 ├─ Code Quality Check   (pushes to main / stage only)
 └─ Custom Check
       │ completes
       ▼
    Validate
       ├─ Validate-html  ─┐  run in parallel
       ├─ Validate-js    ─┘
       └─ Validate-codes    runs after both pass
```

`Validate-html` runs only when Custom Check succeeded. `Validate-codes` uses `needs:`, so it waits for both file checks and is skipped if either one is skipped or fails.

### Running the manual workflow

1. Open the **Actions** tab.
2. Select **custom**.
3. Click **Run workflow**, pick a branch, and confirm.

## Troubleshooting

**`ENOSPC: System limit for number of file watchers reached`** when running `npm run dev` on Linux: raise the inotify watch limit, then restart the dev server.

```bash
echo "fs.inotify.max_user_watches=524288" | sudo tee /etc/sysctl.d/60-inotify.conf
sudo sysctl --system
```
