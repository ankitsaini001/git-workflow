# git-workflow

A sandbox repository for learning and experimenting with GitHub Actions.

## Workflows

| Workflow | File | Trigger | What it does |
| --- | --- | --- | --- |
| `custom` | [.github/workflows/custom.yml](.github/workflows/custom.yml) | Manual (`workflow_dispatch`) | Runs a single job, `first-job`, on `ubuntu-latest` that prints a hello and a goodbye message. |

## Running the workflow

1. Open the **Actions** tab of this repository.
2. Select the **custom** workflow from the list on the left.
3. Click **Run workflow**, choose the `main` branch, and confirm.
4. Open the run to see the output of the `Hello Github Actions` and `Bye` steps.
