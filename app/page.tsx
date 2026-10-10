"use client";

import { useState } from "react";
import ExerciseBlock from "./ExerciseBlock";
import type {
  EditableExerciseInstance,
  EditableSet,
} from "./workoutDraft";

export default function HomePage() {

const [exercises, setExercises] = useState<EditableExerciseInstance[]>([
  { id: 1, name: "", sets: [] },
]);

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

  return (
    <main>
      <p className="brand">SBLabs</p>
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
