export enum RoleDefault {
    IS_USUARIO_ADMINISTRADOR = 'IS_USUARIO_ADMINISTRADOR',
}

export enum RoleCrmEtapa {
    CREATE = 101,
    FIND = 102,
    FIND_ALL = 103,
    UPDATE = 104,
    DELETE = 105,
}

export enum RoleDistribuidoraTarifa {
    CREATE = 201,
    FIND = 202,
    FIND_ALL = 203,
    UPDATE = 204,
    DELETE = 205,
}

export enum RoleEmpresa {
    CREATE = 301,
    FIND = 302,
    FIND_ALL = 303,
    UPDATE = 304,
    DELETE = 305,
}

export enum RoleLead {
    CREATE = 401,
    FIND = 402,
    FIND_ALL = 403,
    UPDATE = 404,
    DELETE = 405,
}

export enum RoleOferta {
    CREATE = 501,
    FIND = 502,
    FIND_ALL = 503,
    UPDATE = 504,
    DELETE = 505,
}

export enum RoleOfertante {
    CREATE = 601,
    FIND = 602,
    FIND_ALL = 603,
    UPDATE = 604,
    DELETE = 605,
}

export enum RoleUsuario {
    CREATE = 701,
    FIND = 702,
    FIND_ALL = 703,
    UPDATE = 704,
    DELETE = 705,
}

export enum RoleUsuarioPermissao {
    CREATE = 801,
    FIND = 802,
    FIND_ALL = 803,
    UPDATE = 804,
    DELETE = 805,
}

export type TypeRole =
    | RoleDefault
    | RoleCrmEtapa
    | RoleDistribuidoraTarifa
    | RoleEmpresa
    | RoleLead
    | RoleOferta
    | RoleUsuario
    | RoleOfertante
    | RoleUsuario
    | RoleUsuarioPermissao;
