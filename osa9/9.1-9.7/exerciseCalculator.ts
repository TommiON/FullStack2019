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

interface ExerciseParameters {
    target: number
    hours: Array<number>
}

const parseExerciseArguments = (args: Array<string>) : ExerciseParameters => {
    if (args.length < 4) throw new Error('Not enough arguments');

    let target: number
    if (!isNaN(Number(args[2]))) {
        target = Number(args[2])
    } else {
        throw new Error('Target hours parameter not a number!');
    }

    let hoursArgs = args.slice(3)
    let hours: Array<number> = []
    hoursArgs.forEach((h) => {
        if (!isNaN(Number(h))) {
            hours.push(Number(h))
        } else {
            throw new Error('Non-number detected in exercise hours parameters!');
        }
    })

    return {
        target: target,
        hours: hours
    }
}

const calculateExercises = (params: ExerciseParameters): ExerciseResult => {
    const totalDays = params.hours.length
    const daysWithExercise = (params.hours.filter(h => h > 0)).length
    const totalHours = params.hours.reduce((accumulator, current) => accumulator + current)
    const averageHours = totalHours / totalDays
    const actualAtLeastTarget = averageHours >= params.target

    let ratingValue: RatingValue, ratingText: RatingDescription

    if(averageHours/params.target > 1.1) {
        ratingValue = 3
        ratingText = 'Excellent'
    } else if(averageHours/params.target <= 1.1 && averageHours/params.target > 0.9) {
        ratingValue = 2
        ratingText = 'OK'
    } else {
        ratingValue = 1
        ratingText = 'Should do better'
    }

    return {
        periodLength: totalDays,
        trainingDays: daysWithExercise,
        target: params.target,
        average: averageHours,
        success: actualAtLeastTarget,
        rating: ratingValue,
        ratingDescription: ratingText
    }

}

try {
    const params = parseExerciseArguments(process.argv);
    console.log(calculateExercises(params))
  } catch (e) {
    console.log('ERROR! ', e.message);
}
