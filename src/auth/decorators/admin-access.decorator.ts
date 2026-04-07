import { Role } from '@prisma/client';
import { Roles } from './roles.decorator';

export const AdminAccess = () => Roles(Role.OWNER, Role.ADMIN, Role.EDITOR);
