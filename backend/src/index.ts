import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import apiRouter from './routes/api.js';
import WebSocketManager from './routes/socket.js';
import ConfigurationModel from './database/Configuration.js'

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

// Initiate routing handlers
app.use('/api', apiRouter);
const socketRouter = new WebSocketManager(io, ConfigurationModel);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
