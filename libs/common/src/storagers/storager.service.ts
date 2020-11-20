import fs from 'fs-extra'
import { resolve, relative } from 'path'
import { Injectable, Inject } from '@nestjs/common'
import { MULTER_INSTANCE } from './storager.constants'
import { ConfigService } from '@common/config'

@Injectable()
export class StoragerService {
  private root: string
  private url: string

  constructor (
    private readonly configService: ConfigService,
    @Inject(MULTER_INSTANCE) private readonly multerInstance: any,
  ) {
    const { root, url } = this.configService.getItem('storage')
    this.root = root
    this.url = url.replace(/\/*$/, '') + '/'
  }

  getUrl (path?: string) {
    if (path) {
      return this.url + path
    }
    return this.url
  }

  getPath (path: string) {
    return relative(this.root, path)
  }

  remove (path: string) {
    fs.unlinkSync(resolve(this.root, path))
  }
}
