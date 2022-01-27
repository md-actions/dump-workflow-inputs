# dump workflow inputs

This action dumps the branch/tag, commit hash and workflow inputs to the log.

# Usage

```yaml
- uses: md-actions/dump-workflow-inputs@HEAD
  with:
    inputs: ${{ toJSON(github.event.inputs) }}
```

The json representation of the workflow inputs. There is no other way to access this information from within an action, so you need to pass it.

## Development

For GitHub actions, all dependencies need to be included in the repository. Therefore, node_modules is not .gitignored.
