import express from 'express';
import cors from 'cors';
import router from './route/index.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
