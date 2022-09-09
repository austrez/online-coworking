import { ROOM } from './consts';
import { TMessage, TUser } from '../types';

type TMessageExceptRoomId = Omit<TMessage, 'roomId'>;
type RoomLeavePayload = {
	userId: string;
};

interface ServerToClientEvents {
	[ROOM.JOIN]: (user: TUser) => void;
	[ROOM.LEAVE]: (payload: RoomLeavePayload) => void;
	[ROOM.MESSAGE]: (message: TMessageExceptRoomId) => void;
}

interface ClientToServerEvents {
	hello: () => void;
}

interface InterServerEvents {
	ping: () => void;
}

interface SocketData {
	name: string;
	age: number;
}

export { ROOM };
export type {
	ServerToClientEvents,
	ClientToServerEvents,
	InterServerEvents,
	SocketData,
};
