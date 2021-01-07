/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import express from 'express';

import bmiCalculator from './bmiCalculator';

const app = express();
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


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});