import express from 'express';
const app = express();
app.use(express.json());
import {BodyParameters, BMICategory, calculateBmi} from './bmiCalculator';
import {ExerciseParameters, ExerciseResult, calculateExercises} from './exerciseCalculator';

app.get('/hello', (_req, res) => {
    res.send('Hello FullStack');
});

app.get('/bmi', (req, res) => {
    const mass = req.query.mass;
    const height = req.query.height;
    
    if(isNaN(Number(mass)) || isNaN(Number(height)) || height === undefined || mass === undefined) {
        const error = {
            error: 'malformatted parameters'
        };
        res.send(error);
    } 

    const params: BodyParameters = {
        heigth: Number(height),
        mass: Number(mass)
    };

    const bmiCategory: BMICategory = calculateBmi(params);
    
    const result = {
        weight: mass,
        height: height,
        bmi: bmiCategory
    };

    res.send(result);
});

app.post('/exercises', (req, res) => {
    if(req.body.target === undefined || req.body.target === null || req.body.dailyExercises === undefined || req.body.dailyExercises === null) {
        res.status(400);
            res.send({
                error: "parameters missing"
              });
    }
    let rawParams: Array<string> = [];
    rawParams.push(req.body.target);
    rawParams = rawParams.concat(req.body.dailyExercises);
    rawParams.forEach(p => {
        if(isNaN(Number(p))) {
            res.status(400);
            res.send({
                error: "malformatted parameters"
              });
        }
    })
    
    const params: ExerciseParameters = {
        target: req.body.target,
        hours: req.body.dailyExercises
    };

    const result: ExerciseResult = calculateExercises(params);

    res.send(result);
});
  
const PORT = 3003;
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});