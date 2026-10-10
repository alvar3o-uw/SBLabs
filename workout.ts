type Workout = {
    name: string,
    date: Date,
    time: number,
    sets: number,
    progressions: number,
    exercises: ExerciseInstance[];
}

type ExerciseInstance = {
    name: string,
    sets: ExerciseSet[];
};

export type ExerciseSet = {
    weight: number,
    reps: number,
    rir: number,
    setNum: number;
};

function isRirProgression(
    previous: ExerciseSet,
    current: ExerciseSet
): boolean {
    return (current.weight === previous.weight
            && current.reps === previous.reps
            && current.rir > previous.rir);
}

function isRepProgression(
    previous: ExerciseSet,
    current: ExerciseSet
): boolean {
    return (current.weight === previous.weight
            && current.reps > previous.reps
            && current.rir === previous.rir);
}

function isWeightProgression(
    previous: ExerciseSet,
    current: ExerciseSet
): boolean {
    return (current.weight > previous.weight
            && current.reps > (previous.reps - 6));
}

function isBetterSet(
    candidate: ExerciseSet,
    bestSoFar: ExerciseSet
): boolean {
    if (candidate.weight > bestSoFar.weight)
        return true;
    else if (candidate.weight < bestSoFar.weight)
        return false;
    else if ((candidate.reps + candidate.rir) > (bestSoFar.reps + bestSoFar.rir))
        return true;
    else
        return false;
}

function findBestSet(sets: ExerciseSet[]) : ExerciseSet | undefined {
    let bestSoFar = sets[0];

    if (bestSoFar === undefined)
        return undefined;
    for (const candidate of sets){
        if (isBetterSet(candidate, bestSoFar) === true)
            bestSoFar = candidate;
    }

    return bestSoFar;
}

// type muscleGroup = ;
// type ExerciseInfo = {};
