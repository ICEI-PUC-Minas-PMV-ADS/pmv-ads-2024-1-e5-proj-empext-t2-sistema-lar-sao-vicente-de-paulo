export enum RoleUsuario {
	CREATE = 101,
	FIND = 102,
	UPDATE = 103,
	DELETE = 104,
}

export enum RoleCargo {
	CREATE = 201,
	FIND = 202,
	UPDATE = 203,
	DELETE = 204,
}

export enum RoleIdoso {
	CREATE = 301,
	FIND = 302,
	UPDATE = 303,
	DELETE = 304,
}

export type TypeRole = RoleUsuario | RoleCargo | RoleIdoso;
