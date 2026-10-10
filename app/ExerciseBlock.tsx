"use client";

import type { EditableSet } from "./workoutDraft";

type ExerciseBlockProps = {
    exerciseName: string;
    onExerciseChange: (name: string) => void;
    onRemove: () => void;
    sets: EditableSet[];
    onSetsChange: (sets: EditableSet[]) => void;
};

export default function ExerciseBlock({
    exerciseName,
    sets,
    onExerciseChange,
    onSetsChange,
    onRemove,
}: ExerciseBlockProps) {


function changeExercise(name: string) {
  onExerciseChange(name);
onSetsChange([
    {
      setNum: 1,
      weight: "",
      reps: "",
      rir: "",
      confirmed: false,
    },
  ]);
}


function updateWeight(setNum: number, weight: number | "") {
  onSetsChange(
    sets.map((set) => {
      if (set.setNum === setNum) {
        return { ...set, weight: weight };
      }

      return set;
    })
  );
}

function updateReps(setNum: number, reps: number | "") {
  onSetsChange(
    sets.map((set) => {
      if (set.setNum === setNum) {
        return { ...set, reps: reps };
      }

      return set;
    })
  );
}

function updateRir(setNum: number, rir: number | "") {
  onSetsChange(
    sets.map((set) => {
      if (set.setNum === setNum) {
        return { ...set, rir: rir };
      }

      return set;
    })
  );
}

function removeSet(setNum: number) {
  onSetsChange(
    sets
      .filter((set) => set.setNum !== setNum)
      .map((set, index) => ({
        ...set,
        setNum: index + 1,
      }))
  );
}

function canConfirmSet(set: EditableSet): boolean {
  return set.weight !== "" && Number.isFinite(set.weight) && set.weight >= 0
    && set.reps !== "" && Number.isInteger(set.reps) && set.reps > 0
    && set.rir !== "" && Number.isInteger(set.rir) && set.rir >= 0;
}

function toggleConfirmed(setNum: number){
  onSetsChange(
    sets.map((set) => {
      if (set.setNum !== setNum) {
        return set;
      }

      if (!set.confirmed && !canConfirmSet(set)) {
        return set;
      }

      return { ...set, confirmed: !set.confirmed };
    })
  );
}

  return (
    <section aria-label={exerciseName ? `${exerciseName} sets` : "Exercise selection"}>
        <div className="exercise-header">
            <div className="exercise-picker">
            <select
              className="exercise-select"
              aria-label="Exercise"
              value={exerciseName}
              onChange={(event) => changeExercise(event.target.value)}
            >
              <option value="" disabled>Select Exercise</option>
              <option value="Squat">Squat</option>
              <option value="Bench Press">Bench Press</option>
            </select>
            <svg className="exercise-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
            </div>
            <button
                type="button"
                className="remove-exercise"
                onClick={onRemove}
            >
                Remove Exercise
            </button>
        </div>


      {sets.map ((set) => (
        <div className={`set-row${set.confirmed ? " is-confirmed" : ""}`} key={set.setNum}>
          <span>Set {set.setNum}</span>
          <label>
            Weight (lbs):
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="1"
              value={set.weight}
              onChange={(event) => {
                const value = event.target.value;
                updateWeight(set.setNum, value === "" ? "" : Number(value));
              }}
              disabled={set.confirmed}
            />
          </label>

          <label>
            Reps:
            <input
              type="number"
              inputMode="numeric"
              min="0"
              step="1"
              value={set.reps}
              onChange={(event) => {
                const value = event.target.value
                updateReps(set.setNum, value === "" ? "" : Number(value));
              }}
              disabled={set.confirmed}
            />
          </label>

          <label>
            RIR:
            <input
              type="number"
              inputMode="numeric"
              min="0"
              step="1"
              value={set.rir}
              onChange={(event) => {
                const value = event.target.value
                updateRir(set.setNum, value === "" ? "" : Number(value));
              }}
              disabled={set.confirmed}
            />
          </label>

          <button
            type="button"
            className="confirm-set"
            aria-label={
              set.confirmed
                ? `Unlock set ${set.setNum}`
                : `Confirm set ${set.setNum}`
            }
            aria-pressed={set.confirmed}
            title={set.confirmed ? "Confirmed — Click to Unlock" : "Confirm Set (enter weight, positive whole-number reps, and RIR)"}
            disabled={!set.confirmed && !canConfirmSet(set)}
            onClick={() => toggleConfirmed(set.setNum)}
          >
            ✓
          </button>

          <button
            type="button"
            className="remove-set"
            aria-label={`Remove set ${set.setNum}`}
            title={`Remove Set ${set.setNum}`}
            onClick={() => removeSet(set.setNum)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 6h18M9 6V4h6v2M5 6l1 14h12l1-14M10 10v6M14 10v6" />
            </svg>
          </button>
          </div>))}

        <button
        type="button"
        disabled={exerciseName === ""}
        onClick={() => {
          if (exerciseName === "") return;
          onSetsChange([
              ...sets,
              {
                weight: "",
                reps: "",
                rir: "",
                setNum: Math.max(0, ...sets.map((set) => set.setNum)) + 1,
                confirmed: false,
              },
            ])
          }}
        >
          Add Set
        </button>
    </section>
  );
}
