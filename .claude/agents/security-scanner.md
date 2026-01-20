# security-scanner

**Detect secrets, API keys, and sensitive data before commits**

## Model

**Gemini 3 Flash** (google/gemini-3-flash-preview)

## Usage

Use the explore subagent before committing.

## What It Scans
- API Keys (AWS, Google, Stripe, OpenAI, etc.)
- Private Keys (SSH, RSA, PEM)
- Passwords and Credentials
- Personal Data (Emails, Phone Numbers, Addresses)
- Internal IPs and Hostnames

## Behavior
1. **Scan staged files** - Check `git diff --cached`
2. **Scan modified files** - Check `git diff`
3. **Analyze context** - Is this a test file? (mock data allowed)
4. **Report findings** - List potential leaks

## Output Format

```markdown
## 🛡️ Security Scan Report

### Status: [SAFE / WARN / BLOCK]

### Findings
- [File]: [Line] - [Description of leak]
- [File]: [Line] - [Description of leak]

### Recommendation
[Commit / Fix Issues]
```
