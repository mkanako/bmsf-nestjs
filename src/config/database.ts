import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

export default (): MysqlConnectionOptions => ({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  charset: 'utf8mb4',
})
