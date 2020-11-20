import { Type, Transform } from 'class-transformer'

class filter {
  @Type(() => Number)
  year?: number

  @Type(() => Number)
  @Transform(value => value >= 1 && value <= 12 ? value : 1)
  month?: number
}

export class AttachmentQueryDto {
  @Type(() => Number)
  @Transform(value => value > 0 ? value : 1)
  page = 1

  @Type(() => String)
  @Transform(value => ['image', 'audio', 'video'].includes(value) ? value : 'image')
  type = 'image'

  @Type(() => filter)
  filter?: filter
}
