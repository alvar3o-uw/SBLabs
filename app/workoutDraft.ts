export type EditableSet = {
  setNum: number;
  weight: number | "";
  reps: number | "";
  rir: number | "";
  confirmed: boolean;
};

export type EditableExerciseInstance = {
  id: number;
  name: string;
  sets: EditableSet[];
};