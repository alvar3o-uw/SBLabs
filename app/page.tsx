"use client";

import { useState } from "react";

type EditableSet = {
  setNum: number;
  weight: number | "";
  reps: number | "";
  rir: number | "";
};

export default function HomePage() {
const [sets, setSets] = useState<EditableSet[]>([  {
    weight: 0,
    reps: 0,
    rir: 0,
    setNum: 1,
  },
]);

function updateWeight(setNum: number, weight: number | "") {
  setSets(
    sets.map((set) => {
      if (set.setNum === setNum) {
        return { ...set, weight: weight };
      }

      return set;
    })
  );
}

function updateReps(setNum: number, reps: number | "") {
  setSets(
    sets.map((set) => {
      if (set.setNum === setNum) {
        return { ...set, reps: reps };
      }

      return set;
    })
  );
}

function updateRir(setNum: number, rir: number | "") {
  setSets(
    sets.map((set) => {
      if (set.setNum === setNum) {
        return { ...set, rir: rir };
      }

      return set;
    })
  );
}

function removeSet(setNum: number) {
  setSets(
    sets
      .filter((set) => set.setNum !== setNum)
      .map((set, index) => ({
        ...set,
        setNum: index + 1,
      }))
  );
}

  return (
    <main>
      <p className="brand">SBLabs</p>
      <h1>My Workout</h1>

      <section aria-labelledby="exercise-name">
        <h2 id="exercise-name">Cable Curl</h2>
      {sets.map ((set) => (
        <div className="set-row" key={set.setNum}>
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
            />
          </label>

          <button
            type="button"
            className="remove-set"
            aria-label={`Remove set ${set.setNum}`}
            title={`Remove set ${set.setNum}`}
            onClick={() => removeSet(set.setNum)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 6h18M9 6V4h6v2M5 6l1 14h12l1-14M10 10v6M14 10v6" />
            </svg>
          </button>
          </div>))}

        <button
        type="button"
        onClick={() => {
          setSets([
              ...sets,
              {
                weight: 0,
                reps: 0,
                rir: 0,
                setNum: Math.max(0, ...sets.map((set) => set.setNum)) + 1,
              },
            ])
          }}
        >
          Add set
        </button>
      </section>
    </main>
  );
}
