import { registerAs } from '@nestjs/config'
import { configs as configsObj } from '@root/config'

type TYPEOF_CONFIGS = typeof configsObj

export type CONFIGS_TYPE = {
  [P in keyof TYPEOF_CONFIGS]: ReturnType<TYPEOF_CONFIGS[P]>
}

export const configs = Object.keys(configsObj).map(key => registerAs(key, configsObj[key as keyof TYPEOF_CONFIGS]))
