import express from 'express';
import diagnosisRouter from './routes/diagnosisRouter';

const app = express();

app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req, res) => {
    console.log("Someone is on ping");
    res.send('pong');
});

app.use('/api/diagnosis', diagnosisRouter);


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});