import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface UserCreationAttrs {
	login: string;
	password: string;
	name: string;
}

@Table
export class User extends Model<User, UserCreationAttrs> {
	@Column({
		type: DataType.STRING,
		unique: true,
		primaryKey: true,
	})
	id: string;

	@Column({
		type: DataType.STRING,
	})
	name: string;

	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false,
	})
	login: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	password: string;

	@Column({
		type: DataType.BLOB,
	})
	avatar: typeof Blob;
}
