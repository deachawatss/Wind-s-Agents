# OPENCODE_workflows.md - Short Codes & Context Management

> **Navigation**: [Main](OPENCODE.md) | [Safety](OPENCODE_safety.md) | **Workflows** | [Subagents](OPENCODE_subagents.md) | [Lessons](OPENCODE_lessons.md) | [Templates](OPENCODE_templates.md)

---

## Short Codes (Token-Efficient)

Short codes trigger `/commands`. Details loaded only when called.

| Code | Calls | Purpose |
|------|-------|---------|
| `ccc` | `/ccc` | Create Context & Compact |
| `nnn` | `/nnn` | Next Task Planning |
| `lll` | `/lll` | List Project Status |
| `rrr` | `/rrr` | Retrospective + Lesson |
| `gogogo` | `/gogogo` | Execute Plan |

**Core Pattern**: `ccc → nnn → gogogo → rrr`

**Details**: See `.opencode/skills/[code]/` (loaded on demand)

---

## Slash Commands

| Command | Purpose |
|---------|---------|
| `/snapshot` | Quick knowledge capture |
| `/distill` | Extract patterns |
| `/recap` | Fresh start context |
| `/context-finder` | Search git/issues |
| `/trace` | Find lost projects |
| `/jump` | Signal topic change |
| `/pending` | Show pending tasks |
| `/feel` | Log emotions |
| `/fyi` | Log information for future |
| `/forward` | Create handoff for next session |

---

## `/trace` - Find Lost Projects

**Purpose**: Track down projects that have moved, graduated, or been archived.

### Three Modes

| Mode | Command | What it finds |
|------|---------|---------------|
| **Project Search** | `/trace [slug\|name]` | Specific project by name |
| **Incubation View** | `/trace incubation` | All projects in lifecycle stages |
| **Graduated View** | `/trace graduated` | Projects moved to own repos |

### Usage Examples

```bash
# Find a specific project
/trace headline              # Find by slug or name

# Special modes
/trace incubation            # Show all: graduated + incubating + ideas
/trace graduated             # Only projects that moved to own repos
```

---

## GitHub Workflow

### Creating Issues
```bash
# 1. Update main branch
git checkout main && git pull

# 2. Create a detailed issue
gh issue create --title "feat: Descriptive title" --body "$(cat <<'EOF'
## Overview
Brief description of the feature/bug.

## Current State
What exists now.

## Proposed Solution
What should be implemented.

## Acceptance Criteria
- [ ] Specific testable criteria
EOF
)"
```

### Standard Development Flow
```bash
# 1. Create a branch from the issue
git checkout -b feat/issue-number-description

# 2. Make changes
# ... implement feature ...

# 3. Commit with a descriptive message
git add -A
git commit -m "feat: Brief description

- What: Specific changes made
- Why: Motivation for the changes

Closes #issue-number"

# 4. Push and create a Pull Request
git push -u origin branch-name
gh pr create --title "Same as commit" --body "Fixes #issue_number"

# 5. CRITICAL: NEVER MERGE PRs YOURSELF
# WAIT for explicit user instruction to merge
```

---

## Context Management

| Level | Action |
|-------|--------|
| 70%+ | Finish soon |
| 80%+ | Wrap up |
| 90%+ | Manual handoff |
| **95%+** | AUTO-HANDOFF (creates file) |

**Don't fear context running out:**
- Auto-compact enabled
- Auto-handoff at 95%
- Update handoff regularly
- Data is preserved

---

## Retrospective Workflow (rrr)

When running `rrr`:

1. **Gather Data**: Get git log, file changes, session activity
2. **Create Directory**: `ψ/memory/retrospectives/YYYY-MM/DD/`
3. **Write Retrospective**: Use template from OPENCODE_templates.md
4. **Required Sections**:
   - AI Diary (min 150 words) - BE VULNERABLE
   - Honest Feedback (min 100 words)
   - Co-Creation Map
   - Lessons Learned
5. **Commit**: Add to git with descriptive message

---

## Session Start Ritual

```bash
# 1. Check context
/recap

# 2. Review pending
/pending

# 3. Set focus
echo "STATE: working
TASK: [description]
SINCE: $(date '+%H:%M')" > ψ/inbox/focus-agent-main.md
```

---

## Session End Ritual

```bash
# 1. Create retrospective
rrr

# 2. Create handoff (if needed)
/forward

# 3. Update activity log
echo "$(date '+%Y-%m-%d %H:%M') | completed | session end" >> ψ/memory/logs/activity.log
```

---

## Knowledge Capture Flow

```
Active Work → /snapshot → ψ/memory/logs/
     ↓
Session End → rrr → ψ/memory/retrospectives/
     ↓
Periodic → /distill → ψ/memory/learnings/
     ↓
Core Identity → Manual → ψ/memory/resonance/
```

---

**See also**: [OPENCODE_templates.md](OPENCODE_templates.md) for retrospective template, [OPENCODE_safety.md](OPENCODE_safety.md) for PR workflow rules
