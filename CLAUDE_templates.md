# CLAUDE_templates.md - Templates & Formats

> **Navigation**: [Main](CLAUDE.md) | [Safety](CLAUDE_safety.md) | [Workflows](CLAUDE_workflows.md) | [Subagents](CLAUDE_subagents.md) | [Lessons](CLAUDE_lessons.md) | **Templates**

---

## Git Commit Format

```
[type]: [brief description]

- What: [specific changes]
- Why: [motivation]
- Impact: [affected areas]

Closes #[issue-number]
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

---

## Issue Creation Template

```bash
gh issue create --title "feat: Descriptive title" --body "$(cat <<'EOF'
## Overview
Brief description of the feature/bug.

## Current State
What exists now.

## Proposed Solution
What should be implemented.

## Technical Details
- Components affected
- Implementation approach

## Acceptance Criteria
- [ ] Specific testable criteria
- [ ] Performance requirements
EOF
)"
```

---

## Retrospective Template

Use this template when running `rrr` to create retrospective documents in `ψ/memory/retrospectives/`:

```markdown
# Session Retrospective

**Session Date**: YYYY-MM-DD
**Start Time**: HH:MM GMT+7
**End Time**: HH:MM GMT+7
**Duration**: ~X minutes
**Primary Focus**: Brief description
**Session Type**: [Feature Development | Bug Fix | Research | Refactoring]

## Session Summary
[2-3 sentence overview of what was accomplished]

## Tags
`tag1` `tag2` `tag3` `feature-name`

## Commits This Session
- `abc1234` feat: Description of change
- `def5678` fix: Another change

## Timeline
| Time (GMT+7) | Event | Reference |
|--------------|-------|-----------|
| HH:MM | Started session | - |
| HH:MM | [Milestone 1] | `abc1234` |
| HH:MM | Created retrospective | - |

## Technical Details

### Files Modified
[paste git diff --name-only output]

### Key Code Changes
- Component X: Added Y functionality
- Module Z: Refactored for better performance

### Architecture Decisions
- Decision 1: Rationale
- Decision 2: Rationale

## AI Diary (REQUIRED - min 150 words)
Write first-person narrative. Be VULNERABLE - include doubts and uncertainty.

**MUST include at least ONE of each:**
- "I assumed X but learned Y when..."
- "I was confused about X until..."
- "I expected X but got Y because..."

## What Went Well
Each item needs: WHAT succeeded -> WHY it worked -> IMPACT

- [Success]: [Why it worked] -> [Measurable impact]

## What Could Improve
[Session-specific issues - what went wrong THIS session]
- [Mistake or inefficiency during this session]

## Blockers & Resolutions
- **Blocker**: Description
  **Resolution**: How it was solved

## Honest Feedback (REQUIRED - min 100 words)
**Must include ALL THREE friction points:**
- What DIDN'T work? (tool limitation, miscommunication, wasted effort)
- What was FRUSTRATING? (even minor annoyances count)
- What DELIGHTED you? (unexpected wins)

## Co-Creation Map
| Contribution | Human | AI | Together |
|--------------|-------|-----|----------|
| Direction/Vision | | | |
| Options/Alternatives | | | |
| Final Decision | | | |
| Execution | | | |
| Meaning/Naming | | | |

## Lessons Learned
- **Pattern**: [Description] - [Why it matters]
- **Mistake**: [What happened] - [How to avoid]
- **Discovery**: [What was learned] - [How to apply]

## Next Steps
- [ ] Immediate task 1
- [ ] Follow-up task 2
- [ ] Future consideration
```

---

## Error Handling Patterns

- Use `try/catch` blocks for operations that might fail.
- Provide descriptive error messages.
- Implement graceful fallbacks in the UI.
- Use custom error types where appropriate.

---

## Code Standards

- Follow the established style guide for the language/framework.
- Enable strict mode and linting where possible.
- Write clear, self-documenting code and add comments where necessary.
- Avoid `any` or other weak types in strongly-typed languages.

---

## Quick Command Reference

```bash
# Development
gh issue create        # Create issue
gh pr create           # Create PR

# Git
git status             # Check status
git log --oneline -10  # Recent commits
git diff --name-only   # Changed files
```

---

**See also**: [CLAUDE_workflows.md](CLAUDE_workflows.md) for how to use these templates, [CLAUDE_lessons.md](CLAUDE_lessons.md) for patterns discovered
