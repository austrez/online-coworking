import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { ROOM } from './consts';
import { TMessage, TRooms } from './types';

type TCreateRoomBody = {
	roomId: string;
};

const rooms: TRooms = new Map([]);

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = new Server(httpServer, {});

app.post('/create-room', (req, res) => {
	const body: TCreateRoomBody = req.body;

	rooms.set(body.roomId, {
		messages: [],
		users: new Map(),
	});

	res.sendStatus(201);
});

app.get('/room', (req, res) => {
	const roomId = (req.query.roomId as string) || '';

	if (rooms.has(roomId)) {
		const room = rooms.get(roomId);
		const messages = room?.messages;
		const users = Object.fromEntries(room?.users || []);

		res.json({ messages, users });
	} else {
		res.status(400).send('Room not found');
	}
});

io.on('connection', (socket) => {
	socket.on(ROOM.JOIN, ({ roomId, userId, userName }) => {
		socket.join(roomId);

		const room = rooms.get(roomId);
		const users = room?.users;
		const newUser = {
			id: userId,
			name: userName,
		};

		users?.set(userId, {
			name: userName,
		});

		socket.to(roomId).emit(ROOM.JOIN, newUser);
	});

	socket.on(ROOM.MESSAGE, ({ message, roomId, userId, time }: TMessage) => {
		const room = rooms.get(roomId);
		room?.messages.push({ message, roomId, userId, time });

		socket.to(roomId).emit(ROOM.MESSAGE, { message, userId, time });
	});

	socket.on(
		ROOM.LEAVE,
		({ roomId, userId }: { roomId: string; userId: string }) => {
			const room = rooms.get(roomId);
			room?.users.delete(userId);

			socket.to(roomId).emit(ROOM.LEAVE, { userId });
		}
	);
});

httpServer.listen(8000);
