# rrr - Session Retrospective Skill

**Create a comprehensive retrospective at the end of each session**

## Trigger

Type `rrr` or `/rrr` to invoke.

## Model

**GLM 4.7 Pro** (main agent writes, subagents gather data)

## Workflow

### 1. Gather Data (use subagents)
```bash
# Get recent commits
git log --oneline -20

# Get modified files
git diff --name-only HEAD~10..HEAD

# Get current time
date '+%Y-%m-%d %H:%M'
```

### 2. Create Directory
```bash
YEAR_MONTH=$(date +"%Y-%m")
DAY=$(date +"%d")
TIME_DOT=$(date +"%H.%M")
mkdir -p "ψ/memory/retrospectives/${YEAR_MONTH}/${DAY}"
```

### 3. Write Retrospective

Use the template from OPENCODE_templates.md with these REQUIRED sections:

| Section | Min Length | Purpose |
|---------|------------|---------|
| AI Diary | 150 words | Vulnerable first-person narrative |
| Honest Feedback | 100 words | What didn't work, frustrated, delighted |
| Co-Creation Map | 5 rows | Track human vs AI contributions |
| Lessons Learned | 3+ items | Patterns, mistakes, discoveries |

### 4. Commit
```bash
git add "ψ/memory/retrospectives/${YEAR_MONTH}/${DAY}/${TIME_DOT}_*.md"
git commit -m "retro: Session retrospective $(date '+%Y-%m-%d %H:%M')"
```

## Required Sections

### AI Diary (VULNERABLE)
Must include at least one of each:
- "I assumed X but learned Y when..."
- "I was confused about X until..."
- "I expected X but got Y because..."

### Honest Feedback
Must include all three:
- What DIDN'T work?
- What was FRUSTRATING?
- What DELIGHTED you?

### Co-Creation Map
| Contribution | Human | AI | Together |
|--------------|-------|-----|----------|
| Direction/Vision | | | |
| Options/Alternatives | | | |
| Final Decision | | | |
| Execution | | | |
| Meaning/Naming | | | |

## File Naming

`ψ/memory/retrospectives/YYYY-MM/DD/HH.MM_slug.md`

Example: `ψ/memory/retrospectives/2026-01/20/06.38_birth.md`

## Anti-Patterns

- ❌ Skipping AI Diary (missing vulnerability)
- ❌ Generic feedback ("everything went well")
- ❌ Not linking commits/issues
- ❌ Subagent writes the diary (main must write)

## Ownership

**Main agent (GLM 4.7 Pro) MUST write the retrospective**

- Subagents: Gather data only
- Main: Write all narrative sections
- Reason: Main has full context + needs vulnerability
