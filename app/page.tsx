"use client";

import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";
import { useEffect, useState } from "react";
import ExerciseBlock from "./ExerciseBlock";
import type {
  EditableExerciseInstance,
  EditableSet,
} from "./workoutDraft";

export default function HomePage() {

const [exercises, setExercises] = useState<EditableExerciseInstance[]>([
  { id: 1, name: "", sets: [] },
]);
const router = useRouter();
const [checkingAuth, setCheckingAuth] = useState(true);

function addExercise() {
  setExercises((currentExercises) => [
    ...currentExercises,
    {
      id: Math.max(0, ...currentExercises.map((exercise) => exercise.id)) + 1,
      name: "",
      sets: [],
    },
  ]);
}

function removeExercise(id: number) {
  setExercises((currentExercises) =>
    currentExercises.filter((exercise) => exercise.id !== id)
  );
}

function changeExerciseName(id: number, name: string) {
  setExercises((currentExercises) =>
    currentExercises.map((exercise) =>
      exercise.id === id
        ? { ...exercise, name: name }
        : exercise
    )
  );
}

function changeExerciseSets(id: number, sets: EditableSet[]) {
  setExercises((currentExercises) =>
    currentExercises.map((exercise) =>
      exercise.id === id
        ? { ...exercise, sets: sets }
        : exercise
    )
  );
}

function isExerciseComplete(exercise: EditableExerciseInstance): boolean {
  return (
    exercise.name !== "" &&
    exercise.sets.length > 0 &&
    exercise.sets.every((set) => set.confirmed)
  );
}

function isWorkoutComplete(
  workoutName: string,
  exercises: EditableExerciseInstance[] ): boolean {
  return (
    workoutName.trim() !== "" &&
    exercises.length > 0 &&
    exercises.every(isExerciseComplete)
  );
}

const [workoutName, setWorkoutName] = useState("");
const workoutComplete = isWorkoutComplete(workoutName, exercises);

async function handleSignOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Sign-out failed:", error.message);
    return;
  }

  router.replace("/login");
}

useEffect(() => {
  async function checkUser() {
    const supabase = createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      router.replace("/login");
      return;
    }

    setCheckingAuth(false);
  }

  checkUser();
}, [router]);

  if (checkingAuth) {
    return (
      <main>
        <p role="status">Checking your sign-in…</p>
      </main>
    );
  }

  return (
    <main>
      <header className="workout-header">
        <p className="brand">SBLabs</p>
        <button className="sign-out" type="button" onClick={handleSignOut}>
          Sign Out
        </button>
      </header>
      <h1>
        <input
          className="workout-title"
          aria-label="Workout name"
          type="text"
          placeholder="My Workout"
          value={workoutName}
          onChange={(event) => setWorkoutName(event.target.value)}
        />
      </h1>

      {exercises.map((exercise) => (
        <ExerciseBlock
          key={exercise.id}
          exerciseName={exercise.name}
          onExerciseChange={(name) => changeExerciseName(exercise.id, name)}
          onRemove={() => removeExercise(exercise.id)}
          sets={exercise.sets}
          onSetsChange={(sets) => changeExerciseSets(exercise.id, sets)}
        />
      ))}

      <button type="button" onClick={addExercise}>
        Add Exercise
      </button>

      <button type="button" disabled={!workoutComplete}>
        Save Workout
      </button>

    </main>
  );
}
