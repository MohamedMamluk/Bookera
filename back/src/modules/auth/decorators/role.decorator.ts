import { SetMetadata } from '@nestjs/common';
import { Roles as Role } from 'src/common/enums/roles.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
