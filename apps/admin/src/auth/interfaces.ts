import { Request as req } from 'express'

export interface Payload {
  sub: number
  username: string
  exp?: number
}

export interface Request extends req {
  user: {
    id: number
    username: string
    payload: Payload
  }
}
