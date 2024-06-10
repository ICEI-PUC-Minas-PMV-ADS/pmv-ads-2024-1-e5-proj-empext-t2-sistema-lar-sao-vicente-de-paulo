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

export enum RoleModeloRelatorioPia {
	CREATE = 401,
	FIND = 402,
	UPDATE = 403,
	DELETE = 404,
}

export enum RoleRelatorioPia {
	CREATE = 501,
	FIND = 502,
	UPDATE = 503,
	DELETE = 504,
}

export enum RoleRelatorioNutricional {
	CREATE = 601,
	FIND = 602,
	UPDATE = 603,
	DELETE = 604,
}

export type TypeRole =
	| RoleUsuario
	| RoleCargo
	| RoleIdoso
	| RoleModeloRelatorioPia
	| RoleRelatorioPia
	| RoleRelatorioNutricional;
