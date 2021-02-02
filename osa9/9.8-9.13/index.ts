import express from 'express';
const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req, res) => {
    res.send('PONG!');
});

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});