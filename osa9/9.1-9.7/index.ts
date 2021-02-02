import express from 'express';
const app = express();
import {BodyParameters, BMICategory, calculateBmi} from './bmiCalculator';

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
  
const PORT = 3003;
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});