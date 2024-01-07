import express from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './route/index.js';
import initializeSocket from './socket.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3001' }));
app.use(cookieParser());
app.use('/api', router);

const server = http.createServer(app);
initializeSocket(server);

server.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
