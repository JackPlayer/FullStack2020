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
  if (average < target) return {rating: 1, ratingDescription: 'Bad'}
}

console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1]
, 2));