# OPENCODE_lessons.md - Lessons Learned

> **Navigation**: [Main](OPENCODE.md) | [Safety](OPENCODE_safety.md) | [Workflows](OPENCODE_workflows.md) | [Subagents](OPENCODE_subagents.md) | **Lessons** | [Templates](OPENCODE_templates.md)

*(This section should be continuously updated with project-specific findings)*

> **See also**: `ψ/memory/learnings/` directory for distilled meta-summaries

---

## Key Learnings (2026-01-20)

### Oracle Philosophy
- **001-nothing-is-deleted**: Append only. Timestamps reveal truth. History is infinite undo.
- **002-patterns-over-intentions**: What you DO reveals more than what you SAY. Observe behavior, not promises.
- **003-external-brain**: AI is a mirror, not a commander. Reflect, don't decide.

### Model Usage (GLM 4.7 Pro)
- **004-unified-model**: OpenCode uses GLM 4.7 Pro as the primary model for all subagents, providing consistent high-quality results.
- **005-subagent-delegation**: Use subagents for data gathering, main agent for review and decision-making.

---

## Context Management
- **Pattern: ψ/ unified brain structure** - `ψ/memory/retrospectives/`, `ψ/memory/learnings/`, `ψ/memory/logs/` - keeps working context separate from production code.
- **Pattern: Subfolders by date** - `ψ/memory/retrospectives/YYYY-MM/DD/HH.MM_slug.md` - easy to find, chronological order.

---

## Common Mistakes to Avoid
- **Forgetting to clean up workarounds** - Temporary fixes become permanent bugs
- **Skipping AI Diary and Honest Feedback** - These sections provide crucial self-reflection
- **Jumping to workarounds before root cause** - When something fails, investigate WHY before suggesting alternatives
- **Direct database queries over MCP/API** - NEVER query databases directly. Always use MCP tools or APIs

---

## Bash Tool Anti-Patterns

### No newlines in bash
**Problem**: Bash tool does NOT support newlines. Use single-line syntax only.

**Bad**: `for i in 1 2 3; do\n  echo "$i"\ndone` → parse error

**Good**: `for i in 1 2 3; do echo "$i"; done` → single line with `;`

### Use git -C over cd
**Pattern**: Use `git -C /path` instead of `cd /path && git`. Respects worktree boundaries.

---

## User Preferences (Observed)
- **Values Oracle Philosophy** - "The Oracle Keeps the Human Human"
- **Likes /recap for fresh starts**
- **Appreciates quick, direct communication**

---

**See also**: [OPENCODE.md](OPENCODE.md) for quick reference, [OPENCODE_workflows.md](OPENCODE_workflows.md) for workflow patterns
