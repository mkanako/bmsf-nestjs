import { SetMetadata } from '@nestjs/common'

export const EXCLUDE_GUARD = 'exclude-guard'
export const excludeGuard = () => SetMetadata(EXCLUDE_GUARD, true)
