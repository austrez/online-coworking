import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

import { ROOM } from './types';
import { TMessage, TRooms } from '../types';

export default class WebSocket {
	private io = {} as Server;

	constructor(httpServer: HttpServer) {
		this.io = new Server(httpServer, {});
	}

	connect() {
		this.io.on('connection', (socket) => {
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
	}
}
