# OPENCODE_safety.md - Critical Safety Rules

> **Navigation**: [Main](OPENCODE.md) | **Safety** | [Workflows](OPENCODE_workflows.md) | [Subagents](OPENCODE_subagents.md) | [Lessons](OPENCODE_lessons.md) | [Templates](OPENCODE_templates.md)

## Repository Usage
- **NEVER create issues/PRs on upstream**

## Command Usage
- **NEVER use `-f` or `--force` flags with any commands.**
- Always use safe, non-destructive command options.
- If a command requires confirmation, handle it appropriately without forcing.

## Git Operations
- Never use `git push --force` or `git push -f`.
- Never use `git checkout -f`.
- Never use `git clean -f`.
- Always use safe git operations that preserve history.
- **NEVER PUSH DIRECTLY TO MAIN** - Always create a feature branch and PR
- **NEVER MERGE PULL REQUESTS WITHOUT EXPLICIT USER PERMISSION**
- **Never use `gh pr merge` unless explicitly instructed by the user**
- **Always wait for user review and approval before any merge**

## PR Workflow (Required)
1. Create feature branch: `git checkout -b feat/description`
2. Make changes and commit
3. Push branch: `git push -u origin feat/description`
4. Create PR: `gh pr create`
5. **WAIT** for user to review and approve
6. User merges when ready

## History-Rewriting Commands are FORBIDDEN

These commands break history and should NEVER be used:

| FORBIDDEN Command | Why It Breaks Everything |
|-------------------|-------------------------|
| `git commit --amend` | Changes commit hash → divergence |
| `git rebase -i` | Rewrites history → all synced agents become orphaned |
| `git reset --soft/mixed` + recommit | Same as amend - creates new hash |

**The Rule: ALWAYS create NEW commits, NEVER rewrite history**

```bash
# ❌ WRONG - breaks history
git commit --amend -m "fix typo"

# ✅ CORRECT - safe
git commit -m "fix: correct typo in previous commit"
```

## File Operations
- Never use `rm -rf` - use `rm -i` for interactive confirmation.
- Always confirm before deleting files.
- Use safe file operations that can be reversed.

## Temp File Operations
- **NEVER create temp files outside the repository** (e.g., `/tmp/`)
- **ALWAYS use `.tmp/` directory inside repo** (gitignored)
- Signal files, locks, caches -> `.tmp/filename`
- Clean up temp files after use: `rm -f .tmp/filename`

## Package Manager Operations
- Never use `[package-manager] install --force`.
- Never use `[package-manager] update` without specifying packages.
- Always review lockfile changes before committing.

## General Safety Guidelines
- Prioritize safety and reversibility in all operations.
- Ask for confirmation when performing potentially destructive actions.
- Explain the implications of commands before executing them.
- Use verbose options to show what commands are doing.

## File Access Rules (Project-Specific)

**Core principle: User must always know when accessing files outside this repo.**

Any file operation outside the project directory:
1. **Inform user** before accessing, OR
2. **Ask for confirmation** first

This includes: Reading other repos, creating files outside repo, accessing `/tmp/`, `~/.cache/`, home directory, etc.

Not banned, but **must notify every time**.

All outputs should go in `ψ/active/` or `.tmp/` (gitignored) when possible.

---

**See also**: [OPENCODE.md](OPENCODE.md) for quick reference, [OPENCODE_workflows.md](OPENCODE_workflows.md) for development workflows
