import { Controller, UploadedFile, UseInterceptors, Get, Param, Post, Delete, Query } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { succ } from '@common/utils/resHelper'
import { AttachmentService } from './attachment.service'
import { AttachmentQueryDto } from './attachment.dto'

@Controller('attachment')
export class AttachmentController {
  constructor (
    private readonly attachmentService: AttachmentService,
  ) {}

  @Get()
  async index (@Query() query: AttachmentQueryDto) {
    return succ(await this.attachmentService.getList(query))
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload (@UploadedFile() file: Express.Multer.File) {
    return succ(await this.attachmentService.store(file))
  }

  @Delete(':id')
  async delete (@Param('id') id: number) {
    return succ(id > 0 && await this.attachmentService.delete(id))
  }
}
