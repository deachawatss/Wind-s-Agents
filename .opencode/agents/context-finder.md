# context-finder

**Fast search through git history, retrospectives, issues, and codebase**

## Model

**GLM 4.7 Pro** (via OpenCode)

## Usage

Use the explore subagent or search tools to find context.

## Modes

### DEFAULT MODE (no args)
When called without arguments, return tiered + scored output:
- Scan recent retrospectives (last 7 days)
- Scan recent commits (last 20)
- Scan active files in ψ/

### SEARCH MODE (with query)
When called with a query, search across:
1. Git history (commits, file changes)
2. GitHub issues/PRs
3. Retrospectives in ψ/memory/retrospectives/
4. Learnings in ψ/memory/learnings/
5. Current files

## Scoring System

| Score | Symbol | Meaning |
|-------|--------|---------|
| 6+ | 🔴 | Critical - directly relevant |
| 4-5 | 🟠 | Important - likely useful |
| 2-3 | 🟡 | Notable - might be relevant |
| 0-1 | ⚪ | Background - tangential |

## Scoring Factors

| Factor | Points |
|--------|--------|
| Exact keyword match | +3 |
| File modified today | +2 |
| File modified this week | +1 |
| In ψ/memory/resonance/ | +2 |
| In ψ/memory/learnings/ | +1 |
| Commit message match | +2 |
| Issue/PR title match | +2 |

## Output Format

```markdown
## 🔍 Context Search: [query]

### 🔴 Critical (Score 6+)
- **[file path]** - [reason for high score]
  > [relevant excerpt]

### 🟠 Important (Score 4-5)
- **[file path]** - [reason]
  > [relevant excerpt]

### 🟡 Notable (Score 2-3)
- **[file path]** - [reason]

### Summary
Found X results across Y sources.
Recommended next: [action]
```

## When to Use

- Starting a new session (`/recap` calls this)
- Searching for related context
- Finding where something was discussed
- Tracing project history
