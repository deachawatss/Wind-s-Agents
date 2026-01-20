# OPENCODE_subagents.md - Available Subagents

> **Navigation**: [Main](OPENCODE.md) | [Safety](OPENCODE_safety.md) | [Workflows](OPENCODE_workflows.md) | **Subagents** | [Lessons](OPENCODE_lessons.md) | [Templates](OPENCODE_templates.md)

## Overview

Subagents are specialized AI assistants that can be invoked for specific tasks. Each has a defined purpose, model, and output format.

**Model**: All subagents use **GLM 4.7 Pro** in the OpenCode environment.

**Delegation Rules**:
1. **Context gathering**: Don't read files directly → use context-finder
2. **Long file summarization**: Don't read 100+ line files → use subagent to read & summarize
3. **Session-specific work**: Main must do (rrr, /where-we-are, reflection) - needs full context

---

## context-finder
**Fast search through git history, retrospectives, issues, and codebase**

- **Usage**: Task tool with subagent_type='explore'
- **Model**: **GLM 4.7 Pro**
- **Modes**:
  - No args → DEFAULT MODE (tiered + scored output)
  - With query → SEARCH MODE
- **Returns**: File paths + excerpts for main agent to read
- **Scoring**: 🔴 Critical (6+), 🟠 Important (4-5), 🟡 Notable (2-3), ⚪ Background (0-1)

---

## coder
**Create code files from GitHub issue specs**

- **Usage**: Task tool with subagent_type='general' with prompt "Implement issue #X"
- **Model**: **GLM 4.7 Pro**
- **Behavior**: Writes files, follows repo patterns, documents decisions
- **Use when**: Quality code implementation needed

---

## executor
**Execute plans from GitHub issues (simple tasks)**

- **Usage**: Task tool with subagent_type='general' with prompt "Execute issue #X"
- **Model**: **GLM 4.7 Pro**
- **Behavior**: Reads bash blocks from issue, runs commands sequentially
- **Safety**: Whitelist commands, blocks rm -rf/--force/sudo

---

## security-scanner
**Detect secrets, API keys, and sensitive data before commits**

- **Usage**: Task tool with subagent_type='explore'
- **Model**: **GLM 4.7 Pro**
- **PROACTIVE**: Use before any commit to public repo
- **Detects**: API keys, passwords, private keys, IP addresses, personal data, full names
- **Output**: Security Scan Report with SAFE TO COMMIT or BLOCK COMMIT

---

## repo-auditor
**PROACTIVE repo health check - detects large files and data files before commits**

- **Usage**: Task tool with subagent_type='explore'
- **Model**: **GLM 4.7 Pro**
- **PROACTIVE**: Use before any commit, like security-scanner
- **Checks**: File sizes (BLOCK >50MB), data files (.json >100KB, .csv, .db), staged files
- **Thresholds**: <1MB ✅, 1-10MB ⚠️, 10-50MB ⚠️⚠️, >50MB 🚫
- **Output**: Executive summary with SAFE/WARN/BLOCK status

---

## marie-kondo
**Lean file placement consultant - ASK BEFORE creating files!**

- **Usage**: Task tool with subagent_type='general'
- **MUST consult before**: Creating any new file, especially in root
- **Philosophy**: "Does this file spark joy? Does it have a home?"
- **Output**: Verdict (APPROVED / REJECTED / REDIRECT) + recommended path

---

## oracle-keeper
**ผู้ดูแลจิตวิญญาณของโปรเจค - Maintain Oracle philosophy**

- **Usage**: Task tool with subagent_type='oracle'
- **Role**:
  - ตีความว่า session ปัจจุบันเชื่อมกับ mission ยังไง
  - Snapshot อัตโนมัติเมื่อมี insight
  - เตือนถ้าหลุดออกจาก philosophy
- **Output**: Oracle Check with Mission Alignment status

---

## project-keeper
**Track project lifecycle: 🌱 Seed → 🌕 Grow → 🎓 Grad | 📚 Learn**

- **Usage**: Task tool with subagent_type='explore'
- **Model**: **GLM 4.7 Pro**
- **Actions**:
  - `list` - Read projects/INDEX.md, return formatted table
  - `add [name] [phase] [location]` - Add new project to INDEX
  - `move [name] [phase]` - Update project phase
  - `log [name]` - Show project timeline from git + logs
  - `sync` - Compare folders vs INDEX, report missing/orphaned
- **Log Format**: `ψ/memory/logs/project-changes.log`
- **INDEX Format**: Phase | Project | Since | Location

---

## note-taker
**จดโน้ต - feeling, info, idea จาก content type commands**

- **Usage**: Task tool with subagent_type='general'
- **Model**: **GLM 4.7 Pro**
- **Input**: Content type + content + optional context
- **Handles**:
  - `/feeling` → `ψ/memory/logs/feelings/`
  - `/info` → `ψ/memory/logs/info/`
  - `/idea` → `ψ/lab/concepts/`
- **Output**: File path ที่สร้าง

---

## Model Selection Guide

| Task Type | Model | Examples |
|-----------|-------|----------|
| Research/Search | GLM 4.7 Pro | context-finder, repo-auditor |
| Quality Code | GLM 4.7 Pro | coder |
| Fast Execution | GLM 4.7 Pro | executor, security-scanner |
| Note-taking | GLM 4.7 Pro | note-taker |
| Project Management | GLM 4.7 Pro | project-keeper |
| Philosophy | GLM 4.7 Pro | oracle-keeper |

**Note**: In OpenCode environment, GLM 4.7 Pro is used as the unified model for all subagents, providing consistent high-quality results.

---

## Subagent Type Mapping (OpenCode)

| Original Claude Subagent | OpenCode Equivalent |
|-------------------------|---------------------|
| haiku | explore (lightweight search) |
| opus | general (complex tasks) |
| sonnet | oracle (reasoning) |

---

**See also**: [OPENCODE.md](OPENCODE.md) for quick reference, [OPENCODE_workflows.md](OPENCODE_workflows.md) for how subagents fit into workflows
