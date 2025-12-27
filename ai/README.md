# AI Context System

This directory defines the **rules, constraints, and expectations**
for AI-assisted development in this project.

These files are first-class artifacts and must evolve with the codebase.

## Mandatory Usage
Before asking any AI to generate or modify code:
1. Load all global context files
2. Load exactly one task file from `/tasks`
3. Follow them strictly

## Load Order
1. 00-context.md
2. 01-rules-do.md
3. 02-rules-dont.md
4. 03-constraints.md
5. One task file

## Philosophy
- AI suggestions must align with documented intent
- If rules conflict, stop and ask for clarification
- Speed is secondary to correctness and clarity
