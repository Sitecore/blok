# Pull Request

## PR title format

Use a short, specific title. Start with a **type tag** in square brackets:

- **[fix]:** bug fixes
- **[feat]:** new features or capabilities
- **[docs]:** documentation-only changes—README, contributing guides, the docs site, registry/marketplace copy, code comments meant for consumers, Storybook or example updates—where the main intent is explaining or documenting rather than changing runtime behavior
- **[refactor]:** internal code changes that are not a fix or a feature
- **[chore]:** tooling, dependencies, CI, or maintenance

## Summary

Why is this PR needed? What problem does it solve or what does it add?

## Description

What changed, how, and any design or tradeoff notes reviewers should know.

## Related issue

Link related GitHub issues or discussions.

- Fixes #(issue number)
- Related: #(issue number)

## Testing instructions

How to verify this PR (steps, URLs, scenarios).

## Reviewers

If you know who should review, @mention them here (optional).

## Checklist

- [ ] **`npm run lint`** (Biome) passes—no new lint issues in changed files
- [ ] **Biome formatting** is applied where needed (`npm run lint:fix` and/or `npm run format` so style stays consistent)
- [ ] Code follows the project style guidelines
- [ ] Self-reviewed the code changes
- [ ] Comments added for non-obvious parts of the code
- [ ] Documentation updated when behavior or public APIs change
- [ ] Tests added or updated and passing (when applicable)
- [ ] No new warnings or errors introduced
- [ ] Dependent changes merged or published (if this PR depends on them)

## Additional notes

Anything else reviewers should know (risks, follow-ups, screenshots).
