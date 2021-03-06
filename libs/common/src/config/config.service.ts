import { Injectable } from '@nestjs/common'
import { ConfigService as NestConfigService } from '@nestjs/config'
import { CONFIGS_TYPE } from './config-data'

@Injectable()
export class ConfigService extends NestConfigService {
  getItem<CONFIGS_ITEM extends keyof CONFIGS_TYPE> (name: CONFIGS_ITEM, defaultValue?: any) {
    return this.get(name, defaultValue) as CONFIGS_TYPE[CONFIGS_ITEM]
  }
}
