# Candor

A brutally honest AI resume critic built specifically for developers.

No match scores. No keyword stuffing advice. No "great start!" energy.
Candor reads your resume the way a hiring manager actually reads it —
and tells you exactly what's weak, what's missing, and what to rewrite.

## Who it's for
Junior to mid-level developers. Self-taught developers. Bootcamp grads.
Anyone whose resume is getting ignored and wants to know why.

## How it works
Paste your resume text or upload a PDF. Optionally paste a job description
for targeted feedback. Candor sends both to an LLM and returns
a structured critique across 7 dimensions with priority rewrites included.

## Privacy
Your resume never touches a server. Everything runs in the browser.
Your API key is stored in sessionStorage only — never persisted, never logged.

## Tech
- React + Vite
- Tailwind CSS
- LLM API (client-side)
- pdf.js (client-side PDF text extraction)
- No backend. No database. No accounts.

## Run locally
git clone https://github.com/[yourusername]/candor
cd candor
npm install
npm run dev
Add your API key in the app when prompted.

## Live demo
https://[deploy-url]

## Part of
Built as part of a frontend portfolio series alongside black.ui.
