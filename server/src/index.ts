import express from 'express';
import { createServer } from 'http';

import { TRooms } from './types';

type TCreateRoomBody = {
	roomId: string;
};

const rooms: TRooms = new Map([]);

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

httpServer.listen(8000);
