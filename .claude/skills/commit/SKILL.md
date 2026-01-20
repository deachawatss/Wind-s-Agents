# /commit - Git Commit and Push

Git commit and push with conventional commit prefixes.

## Instructions

1. Stage all changes with `git add -A`
2. Create commit with appropriate prefix:
   - `feat:` - new feature
   - `fix:` - bug fix
   - `docs:` - documentation changes
   - `refactor:` - code refactoring
   - `chore:` - maintenance tasks
   - `ci:` - CI/CD changes
   - `wip:` - work in progress

3. Commit message guidelines:
   - Explain WHY something was done from end user perspective
   - Be specific about user-facing changes
   - Avoid generic messages like "improved experience"

4. Before pushing:
   - Run `git pull --rebase` if there are remote changes
   - If conflicts occur, DO NOT FIX THEM - notify user

5. Push to remote with `git push`
