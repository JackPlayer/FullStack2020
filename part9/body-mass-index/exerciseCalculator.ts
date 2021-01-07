interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: Rating['rating'],
  ratingDescription: Rating['ratingDescription'],
  target: number,
  average: number,
}

interface Rating {
  rating: number,
  ratingDescription: RatingMessage,
}

type RatingMessage = 'Bad' | 'Average' | 'Good'

interface ExerciseInputArguments {
  exerciseList: number[],
  target: number,
}

const parseExerciseArguments = (args: string[]): ExerciseInputArguments => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (isNaN(Number(args[2]))) throw new Error('Target must be a number');
  const target = Number(args[2])

  const exerciseList = [];

  for (let i = 3; i < args.length; i++ ) {
    const arg = args[i];
    if (!isNaN(Number(arg))) {
      exerciseList.push(Number(arg))
    } else {
      throw new Error(`Provided value ${arg} is not a number!`);
    }
  }
  return {
    exerciseList,
    target,
  };

}

const calculateExercise = (exerciseList: number[], target: number): Result => {
  const periodLength = exerciseList.length;
  let trainingDays = 0;
  let totalHours = 0;
  
  exerciseList.forEach((hours) => {
    if (hours !== 0) trainingDays++;
    totalHours += hours;
  })

  let average = 0;

  if (periodLength !== 0) average = totalHours / periodLength;
  
  const success = average >= target ? true : false;
  const rating = getRating(target, average);
  return {
    periodLength,
    trainingDays,
    success,
    target,
    average,
    rating: rating.rating,
    ratingDescription: rating.ratingDescription,
  }
}

const getRating = (target: number, average: number): Rating => {
  if (average >= target + 1) return {rating: 3, ratingDescription: 'Good'}
  if (average >= target && average < target + 1) return {rating: 2, ratingDescription: 'Average'}
  return {rating: 1, ratingDescription: 'Bad'}
}

try {
  const {exerciseList, target} = parseExerciseArguments(process.argv);
  console.log(calculateExercise(exerciseList, target))
} catch (error) {
  console.log("Error: ", error.message);
}