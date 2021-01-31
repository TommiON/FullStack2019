type BMICategory = 
    'Very severely underweight' |
    'Severely underweight' |
    'Underweight' |
    'Normal (healthy weight)' |
    'Overweight' |
    'Obese Class I (Moderately obese)' |
    'Obese Class II (Severely obese)' |
    'Obese Class III (Very severely obese)';

interface BodyParameters {
    heigth: number;
    mass: number;
}

const parseBodyArguments = (args: Array<string>) : BodyParameters => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
          heigth: Number(args[2]),
          mass: Number(args[3])
        }
      } else {
        throw new Error('Provided values were not numbers!');
      }
}
    
const calculateBmi = (params: BodyParameters) : BMICategory => {
    const height = params.heigth;
    const mass = params.mass
    const bmi = mass / ((height/100) * (height/100));
   
    if(bmi <= 15)               return 'Very severely underweight';
    if(bmi > 15 && bmi <= 16)   return 'Severely underweight';
    if(bmi > 16 && bmi <= 18.5) return 'Underweight';
    if(bmi > 18.5 && bmi <= 25) return 'Normal (healthy weight)';
    if(bmi > 25 && bmi <= 30)   return 'Overweight';
    if(bmi > 30 && bmi <= 35)   return 'Obese Class I (Moderately obese)';
    if(bmi > 35 && bmi <= 40)   return 'Obese Class II (Severely obese)';
    if(bmi > 40)                return 'Obese Class III (Very severely obese)';

}

try {
    const params = parseBodyArguments(process.argv);
    console.log(calculateBmi(params))
  } catch (e) {
    console.log('Error: ', e.message);
  }

