import express from 'express';
import diagnosesRouter from './src/routes/diagnoses';

const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    res.send('PONG!');
});

app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});