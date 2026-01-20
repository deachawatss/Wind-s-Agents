# /ai-deps - Bump AI SDK Dependencies

Bump AI SDK dependencies to minor/patch versions only.

## Instructions

1. Read package.json files in the project
2. Look for AI SDK dependencies:
   - "ai"
   - "@ai-sdk/openai"
   - "@ai-sdk/anthropic"
   - "@openrouter/ai-sdk-provider"
   - And any other AI-related packages

3. Check for upgradable versions (minor/patch ONLY - ignore major)

4. Create a report with:
   - Dependency name
   - Current version
   - Available upgrade version
   - Links to changelog if available

5. Write findings to `ai-sdk-updates.md`

**DO NOT actually upgrade the dependencies - just create the report.**
