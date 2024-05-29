import express from 'express';
const app = express();

const PORT = 3000;

app.use('/', (req, res) => {
  res.send('Successful response.');
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
