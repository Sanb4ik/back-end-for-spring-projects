import { Server } from 'socket.io';

const activeUsers = new Map();

export default function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3001',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  const getTime = () => {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}`;
  };

  io.on('connection', (ws) => {
    ws.on('username', (username) => {
      activeUsers.set(username, ws);
      broadcastToAllExceptSender('connected', { username: username, time: getTime() });
    });

    ws.on('message', (message) => {
      const { username, message: userMessage } = JSON.parse(message);
      activeUsers.forEach((connection, name) => {
        const nik = name === username ? `you` : username;
        connection.send(JSON.stringify({ time: getTime(), username: nik, text: userMessage }));
      });
    });

    ws.on('disconnect', () => {
      const username = getUsernameByConnection(ws);
      activeUsers.delete(username);
      broadcastToAllExceptSender('disconnected', { username: username, time: getTime() });
    });
  });
}

function broadcastToAllExceptSender(type, payload) {
  activeUsers.forEach((connection) => {
    connection.send(JSON.stringify({ text: type, username: payload.username, time: payload.time }));
  });
}

function getUsernameByConnection(ws) {
  for (const [username, connection] of activeUsers.entries()) {
    if (connection === ws) {
      return username;
    }
  }
  return null;
}
