/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import express from 'express';

import bmiCalculator from './bmiCalculator';
import exerciseCalculator from './exerciseCalculator';

const app = express();

app.use(express.json());


app.get('/bmi', (_req, res) => {
  if (!_req.query.height || !_req.query.weight)  { 
    res.status(400).send({error: 'malformatted parameters'});
    return;
  }
  if (isNaN(Number(_req.query.height)) || isNaN(Number(_req.query.weight))) {
    res.status(400).send({error: 'malformatted parameters'});
    return; 
  }
  const height = Number(_req.query.height);
  const weight = Number(_req.query.weight);
  let bmi;
  let bmiMessage; 
  try {
    bmi = bmiCalculator.calculateBMI(height, weight);
    bmiMessage = bmiCalculator.messageFromBMI(bmi);

  } catch (e) {
    res.status(400).send({error: e.message});
    return;
  }

  res.send({
    height,
    weight,
    bmi,
    bmiMessage,
  });
});

app.post('/exercise', (_req, res) => {
  if(!_req.body) {
    res.status(400).json({ error: 'exerciseList and target fields required' });
    return;
  }
  const { exerciseList, target } = _req.body;
  if (!exerciseList || !target) {
    res.status(400).json({ error: 'exerciseList and target fields required' });
    return;
  }
  let exerciseObject;
  try {
    exerciseObject = exerciseCalculator.calculateExercise(exerciseList, target);
  } catch (e) {
    res.status(400).json({ error: e.message });
    return;
  }
  res.json(exerciseObject);
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});