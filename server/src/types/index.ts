type TMessage = {
	userId: string;
	message: string;
	roomId: string;
	time: string;
};

type TUser = {
	name: string;
};

type TUsers = Map<string, TUser>;

type TRoom = {
	messages: TMessage[];
	users: TUsers;
};

type TRooms = Map<string, TRoom>;

export type { TMessage, TUser, TUsers, TRoom, TRooms };
