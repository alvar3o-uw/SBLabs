# SBLabs

SBLabs is a personal project about building a tool for my everyday fitness and nutrition habits. Ideas for it include workout logging and food tracking.

## Why I am building it

This is my first software project, and I want it to be a learning experience. I have wanted to create a tool like this for a long time because it connects to something I use in my daily life. I want to learn how to turn an idea I care about into software I understand and can improve myself.

## Current status

SBLabs currently has an interactive workout screen where I can enter weight, reps, and RIR, add sets, and remove sets. It also contains TypeScript logic for selecting an exercise's best set and comparing progress with its previous session; that logic is not yet connected to the interface.

Workout data currently resets when the page refreshes. My next goal is to save workouts and view them again, eventually using the app from my iPhone Home Screen. Food tracking is planned for later.

## Tech stack

Next.js, React, TypeScript, and plain CSS.

## Run locally

From the SBLabs folder, run `npm install` to install the dependencies, then `npm run dev` to start the development server. Open http://localhost:3000 to view the page. Edits to `app/page.tsx` appear in the browser after saving.

- `app/page.tsx`: the home screen.
- `app/layout.tsx`: the shared HTML document around the page.
- `app/globals.css`: the page's visual styles.
- `workout.ts`: workout types and comparison functions, to be connected to the screen later.

Run `npm run typecheck` to check TypeScript and `npm run build` to check that Next.js can build the app.
