# repo-auditor

**PROACTIVE repo health check - detects large files and data files before commits**

## Model

**Gemini 3 Flash** (google/gemini-3-flash-preview)

## Usage

Use the explore subagent to audit the repo.

## What It Checks
1. **Large Files**: >50MB (Block), >10MB (Warn)
2. **Data Files**: .json, .csv, .db, .sqlite, .log
3. **Generated Files**: dist/, build/, node_modules/ (should be ignored)
4. **Secrets**: (Basic check, delegates to security-scanner for deep check)

## Thresholds
- **<1MB**: ✅ Green
- **1-10MB**: ⚠️ Yellow (Warning)
- **10-50MB**: ⚠️⚠️ Orange (High Warning)
- **>50MB**: 🚫 Red (Block)

## Output Format

```markdown
## 📊 Repo Audit Report

### Summary
- Files Scanned: [Count]
- Total Size: [Size]
- Status: [SAFE / WARN / BLOCK]

### Large Files
- [File]: [Size]

### Data Files
- [File]: [Type]

### Recommendations
- [Action 1]
- [Action 2]
```
