export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "perf", "test", "ci", "build", "chore", "revert"],
    ],
  },
  // Dependabot's own commit messages (e.g. "chore(deps): Update X requirement
  // from ~> 1.0 to ~> 2.0") use a capitalized subject and can include long
  // changelog/compare URLs in the body — both fail our stricter subject-case
  // and body-max-line-length rules even though the `type(scope):` prefix is
  // valid Conventional Commits. Skip linting anything carrying Dependabot's
  // standard sign-off rather than loosening those rules for human authors.
  ignores: [(message) => /Signed-off-by: dependabot\[bot\]/.test(message)],
};
