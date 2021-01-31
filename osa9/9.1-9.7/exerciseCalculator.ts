type RatingValue = 1 | 2 | 3;
type RatingDescription = 'Excellent' | 'OK' | 'Should do better';

interface ExerciseResult {
    periodLength: number
    trainingDays: number
    target: number
    average: number
    success: boolean
    rating: RatingValue
    ratingDescription: RatingDescription
}

const calculateExercises = (hours: Array<number>, target: number): ExerciseResult => {
    const totalDays = hours.length
    const daysWithExercise = (hours.filter(h => h > 0)).length
    const totalHours = hours.reduce((accumulator, current) => accumulator + current)
    const averageHours = totalHours / totalDays
    const actualAtLeastTarget = averageHours >= target

    let ratingValue: RatingValue, ratingText: RatingDescription

    if(averageHours/target > 1.1) {
        ratingValue = 3
        ratingText = 'Excellent'
    } else if(averageHours/target <= 1.1 && averageHours/target > 0.9) {
        ratingValue = 2
        ratingText = 'OK'
    } else {
        ratingValue = 1
        ratingText = 'Should do better'
    }

    return {
        periodLength: totalDays,
        trainingDays: daysWithExercise,
        target: target,
        average: averageHours,
        success: actualAtLeastTarget,
        rating: ratingValue,
        ratingDescription: ratingText
    }

}

const hours = [0,2,5,0,3]
console.log(calculateExercises(hours, 1))