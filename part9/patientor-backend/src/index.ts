import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnosisRouter';
import patientsRouter from './routes/patientsRouter';

const app = express();

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3500;

app.get('/api/ping', (_req, res) => {
    console.log("Someone is on ping");
    res.send('pong');
});

app.use('/api/diagnosis', diagnosisRouter);
app.use('/api/patients', patientsRouter);



app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});