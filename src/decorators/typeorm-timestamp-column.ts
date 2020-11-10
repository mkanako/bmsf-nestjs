import { Column, UpdateDateColumn, ColumnOptions } from 'typeorm'

const dateColumnTransformer = {
  to: (value: unknown) => {
    if (!value) {
      return new Date()
    }
    return value
  },
  from: (value: unknown) => value,
}

const defaultOptions: ColumnOptions = {
  type: 'timestamp',
  nullable: true,
  default: () => null,
  precision: 0,
  transformer: dateColumnTransformer,
}

export function CreateTimestampColumn (name = 'created_at') {
  return Column(Object.assign({ name }, defaultOptions))
}

export function UpdateTimestampColumn (name = 'updated_at') {
  return UpdateDateColumn(Object.assign({ name }, defaultOptions))
}
