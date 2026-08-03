<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Application Execution Rule
Do not start or run the application (e.g. `npm run dev` or other server commands). The user will manage and run the application themselves.

# Git Commit Rule
Do not execute `git commit` without explicit permission from the user. The user will review changes and decide when to commit.

