---
title: 'Retiring Streamlit for Seshat — the Cockpit'
date: 2026-07-16
kind: log
tags: ['seshat', 'react', 'fastapi', 'packaging']
---

Seshat's UI used to be a Streamlit app. It's now a packaged desktop
application: a FastAPI backend running in-process on a background thread, and
a React frontend I've been calling the **Cockpit** — sidebar icon nav, a
session timeline grouped by day with sticky headers, inline confirm/correct
for inferred intents, and a data panel for browsing artifacts.

The build changed to match: `build.ps1` now compiles the React app before
PyInstaller freezes the executable, and the spec bundles the static frontend
and hard-fails if it's missing, so it's no longer possible to ship a build
without a UI in it. Streamlit and the `seshat ui` command are gone entirely.

Along the way I hit a packaging bug worth remembering: a windowed build
(`console=False`) sets `sys.stdout`/`sys.stderr` to `None`, and uvicorn's log
formatter calls `.isatty()` on them during startup — so the double-clicked
`.exe` crashed before its window even opened. Every test I'd run had given it
real stdout (redirected output, explicit args), so the bug only showed up the
one way an actual user would launch it. Fixed by pointing those streams at a
log file before anything else imports.
