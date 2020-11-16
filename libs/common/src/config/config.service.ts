import { Injectable } from '@nestjs/common'
import { ConfigService as NestConfigService } from '@nestjs/config'
import { CONFIGS_TYPE } from './config-data'

@Injectable()
export class ConfigService extends NestConfigService {
  getItem<CONFIGS_ITEM extends keyof CONFIGS_TYPE> (name: CONFIGS_ITEM) {
    return this.get(name) as CONFIGS_TYPE[CONFIGS_ITEM]
  }
}
