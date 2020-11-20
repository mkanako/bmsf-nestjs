import { Injectable, Inject, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, MoreThan } from 'typeorm'
import { classToPlain } from 'class-transformer'
import { StoragerService } from '@common/storagers'
import { AdminAttachment as Attachment } from '@entities/admin/attachment.entity'
import { AttachmentQueryDto } from './attachment.dto'
import { Request } from '../auth/interfaces'

@Injectable({ scope: Scope.REQUEST })
export class AttachmentService {
  private pageSize = 20

  constructor (
    @InjectRepository(Attachment) private attachment: Repository<Attachment>,
    @Inject(REQUEST) private request: Request,
    private readonly storagerService: StoragerService,
  ) {}

  get uid () {
    return this.request.user.id
  }

  async getList (query: AttachmentQueryDto) {
    const where = {
      type: query.type,
      uid: this.uid,
    }
    if (query?.filter?.year) {
      const { year, month = 1 } = query.filter
      Object.assign(where, { createdAt: MoreThan(new Date(year, month - 1)) })
    }
    const total = await this.attachment.count({ where })
    let data: Attachment[] = []
    if (total > 0) {
      data = await this.attachment.find({
        select: ['id', 'filename', 'path'],
        order: { id: 'DESC' },
        skip: (query.page - 1) * this.pageSize,
        take: this.pageSize,
        where,
      })
      data.forEach(item => this.appendUrl(item))
    }
    return {
      pageSize: this.pageSize,
      page: query.page,
      total,
      data: data,
    }
  }

  async store (file: Express.Multer.File) {
    const attachment = this.attachment.create({
      uid: this.uid,
      type: file.mimetype.split('/')[0],
      path: this.storagerService.getPath(file.path),
      filename: file.originalname,
    })
    const result = await this.attachment.insert(attachment)
    if (result.identifiers[0].id) {
      attachment.id = result.identifiers[0].id
      this.appendUrl(attachment)
      return classToPlain(attachment)
    }
    return false
  }

  async delete (id: number) {
    const result = await this.attachment.findOne({ id, uid: this.uid })
    if (result) {
      this.attachment.delete(id)
      this.storagerService.remove(result.path)
      return true
    }
    return false
  }

  private appendUrl (attachment: Attachment) {
    Object.assign(
      attachment,
      {
        url: this.storagerService.getUrl(attachment.path),
      },
    )
  }
}
