# SBLabs

SBLabs is a personal project about building a tool for my everyday fitness and nutrition habits. Ideas for it include workout logging and food tracking.

## Why I am building it

This is my first software project, and I want it to be a learning experience. I have wanted to create a tool like this for a long time because it connects to something I use in my daily life. I want to learn how to turn an idea I care about into software I understand and can improve myself.

## Current status

SBLabs currently has an interactive workout screen where I can name a workout, add and remove exercise blocks, select an exercise, and enter weight, reps, and RIR for each set. Sets start blank and can be added, removed, confirmed, and unlocked for corrections. Confirmed sets lock their fields and display a green highlight. Changing an exercise resets that block to one blank set.

The Save Workout button becomes available when the workout has a name and every exercise has at least one confirmed set. Its save action is not connected yet. The project also contains TypeScript logic for selecting an exercise's best set and comparing progress with its previous session; that logic is not yet connected to the interface.

Email-and-password sign-in is connected to Supabase Auth. The login page displays authentication errors and opens the workout screen after successful sign-in. The workout screen checks the current user before displaying the form and redirects signed-out visitors to login. A compact Sign Out button appears in the header. Account registration is not yet available through the interface.

The Supabase database now has tables for workouts, exercise instances, and sets, with validation constraints, cascading deletes, and Row Level Security policies based on workout ownership. The initial migration is recorded in Supabase; it is not yet stored in this repository.

Workout data currently resets when the page refreshes because saving is not connected yet. My next goal is to save workouts and view them again from any device after signing in, eventually using the app from my iPhone Home Screen. Food tracking is planned for later.

## Tech stack

Next.js, React, TypeScript, plain CSS, and Supabase Auth and Postgres, using `@supabase/supabase-js` and `@supabase/ssr`.

## Run locally

From the SBLabs folder, run `npm install` to install the dependencies. Create a `.env.local` file in that folder with your Supabase project URL and publishable key:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Use a publishable key, never a secret or service-role key. `.env.local` is ignored by Git. These two values are available to browser code; database access is controlled by authentication and RLS policies.

Run `npm run dev`, then open http://localhost:3000/login. Signing in requires a confirmed Supabase Auth account in the configured project. Edits to the app appear in the browser after saving.

- `app/page.tsx`: the workout screen, shared exercise state, and workout completion checks.
- `app/login/page.tsx`: the email-and-password sign-in form and authentication feedback.
- `lib/supabase/client.ts`: the browser Supabase client helper.
- `app/ExerciseBlock.tsx`: the reusable exercise selector and set controls.
- `app/workoutDraft.ts`: shared types for exercise and set data being edited.
- `app/layout.tsx`: the shared HTML document around the page.
- `app/globals.css`: the page's visual styles.
- `workout.ts`: workout types and comparison functions, to be connected to the screen later.

Run `npm run typecheck` to check TypeScript and `npm run build` to check that Next.js can build the app.
