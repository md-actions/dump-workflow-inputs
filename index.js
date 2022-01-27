const core = require('@actions/core');
const github = require('@actions/github');

try {
  const facts = [];

  // Collect branch/tag and commit hash
  if (github.context.ref.startsWith('refs/heads/')) {
    facts.push({label: 'Branch', value: github.context.ref.substring(11)});
  } else {
    // Tags start with refs/tags/
    facts.push({label: 'Tag', value: github.context.ref.substring(10)});
  }
  facts.push({label: 'Commit', value: github.context.sha});

  // Parse inputs
  const workflowInputsString = core.getInput('inputs');
  if (workflowInputsString && workflowInputsString !== 'null') {
    const workflowInputs = JSON.parse(workflowInputsString);
    for(const [key, value] of Object.entries(workflowInputs)) {
      facts.push({
        label: key.substring(0, 1).toUpperCase() + key.substring(1),
        value: value
      });
    }
  }

  // Find longest label for pretty formatting
  const labelLengths = facts.map((fact) => fact.label.length);
  const labelLength = Math.max(...labelLengths) + 2; // Include 2 more spaces for ": "

  // Output facts
  for(const fact of facts) {
    core.info((fact.label + ': ').padEnd(labelLength) + fact.value);
  }
} catch(error) {
  core.setFailed(error.message);
}
