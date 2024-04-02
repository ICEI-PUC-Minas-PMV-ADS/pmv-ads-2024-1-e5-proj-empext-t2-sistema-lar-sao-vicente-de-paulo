import { SetMetadata } from '@nestjs/common';
import { TypeRole } from '../enums/roles';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: TypeRole[]) => SetMetadata(ROLES_KEY, roles);
