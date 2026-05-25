# CLAUDE.md — Teacher App

## Team Guidelines Source
All company rules, workflows, skills, and agent definitions live at:
`C:\Users\abdel\Desktop\Claude Projects\IT_Team\`

**Do not load all files by default. Load only what is relevant to the current task (token efficiency is a company standard).**

The entry point and full documentation map is:
`C:\Users\abdel\Desktop\Claude Projects\IT_Team\CLAUDE.md`

Read that file first at the start of every session, then load only the specific files needed for the task at hand.

---

## On-Demand Loading Guide

| If working on...             | Load these files |
|------------------------------|-----------------|
| A new feature                | `workflows/feature-delivery.md`, `agents/frontend-engineer.md` or `backend-engineer.md` |
| A bug                        | `workflows/bug-triage.md` |
| A code review                | `workflows/code-review.md` |
| An API or server action      | `skills/api-design.md`, `skills/error-handling.md` |
| A form or user input         | `skills/form-handling.md` |
| A database change            | `skills/database-design.md` |
| A component                  | `skills/component-patterns.md` |
| Tests                        | `skills/testing-patterns.md` |
| Deployment                   | `workflows/deployment.md`, `agents/devops-engineer.md` |
| Security-sensitive changes   | `agents/security-reviewer.md` |
| Definition of done check     | `company/definition-of-done.md` |
| Architecture decisions       | `memory/architecture-decisions.md` |

---

## Always Apply (no file load needed)

- TypeScript strict mode, no `any`, no `console.log` in production
- Named exports only, one component per file, files ≤ 300 lines, functions ≤ 50 lines
- Zod validation at every trust boundary
- No hardcoded secrets — always update `.env.example` when adding env vars
- Auth enforced at route level, authz at data layer
- All user input validated server-side
- Never silent catches
- pnpm as package manager
- Next.js App Router — Server Components by default, Client only when needed
- Mobile-first, WCAG AA accessibility

## Task Routing
Before starting any work, check `C:\Users\abdel\Desktop\Claude Projects\IT_Team\tasks\index.md`. If no task exists for the work, create one from `_template.md` first.
