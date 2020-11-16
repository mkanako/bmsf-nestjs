import { registerAs } from '@nestjs/config'
import { config } from '@root/config'

type TYPEOF_CONFIGS = typeof config

export type CONFIGS_TYPE = {
  [P in keyof TYPEOF_CONFIGS]: ReturnType<TYPEOF_CONFIGS[P]>
}

export const configData = Object.keys(config).map(key => registerAs(key, config[key as keyof TYPEOF_CONFIGS]))
