/**
 * @since 2022/12/02
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { SetMetadata } from '@nestjs/common'
import { Role } from '../enums/role.enum'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
export const RoleAdmin = () => Roles(Role.Admin)
export const RoleUser = () => Roles(Role.User)
