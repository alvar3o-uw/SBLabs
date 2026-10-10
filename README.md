# SBLabs

SBLabs is a personal project about building a tool for my everyday fitness and nutrition habits. Ideas for it include workout logging and food tracking.

## Why I am building it

This is my first software project, and I want it to be a learning experience. I have wanted to create a tool like this for a long time because it connects to something I use in my daily life. I want to learn how to turn an idea I care about into software I understand and can improve myself.

## Current status

SBLabs currently has an interactive workout screen where I can name a workout, add and remove exercise blocks, select an exercise, and enter weight, reps, and RIR for each set. Sets start blank and can be added, removed, confirmed, and unlocked for corrections. Confirmed sets lock their fields and display a green highlight. Changing an exercise resets that block to one blank set.

The Save Workout button becomes available when the workout has a name and every exercise has at least one confirmed set. Its save action is not connected yet. The project also contains TypeScript logic for selecting an exercise's best set and comparing progress with its previous session; that logic is not yet connected to the interface.

Workout data currently resets when the page refreshes. My next goal is to save workouts and view them again, eventually using the app from my iPhone Home Screen. Food tracking is planned for later.

## Tech stack

Next.js, React, TypeScript, and plain CSS.

## Run locally

From the SBLabs folder, run `npm install` to install the dependencies, then `npm run dev` to start the development server. Open http://localhost:3000 to view the page. Edits to `app/page.tsx` appear in the browser after saving.

- `app/page.tsx`: the workout screen, shared exercise state, and workout completion checks.
- `app/ExerciseBlock.tsx`: the reusable exercise selector and set controls.
- `app/workoutDraft.ts`: shared types for exercise and set data being edited.
- `app/layout.tsx`: the shared HTML document around the page.
- `app/globals.css`: the page's visual styles.
- `workout.ts`: workout types and comparison functions, to be connected to the screen later.

Run `npm run typecheck` to check TypeScript and `npm run build` to check that Next.js can build the app.
