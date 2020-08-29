import { NetworkMessage } from './base'

export class InputError extends Error {
  constructor(msg: string = '올바르게 입력해주세요!') {
    super(msg)
    this.name = 'InputError'
  }
}

export class ApiError extends Error {
  constructor(res: NetworkMessage) {
    super(`[${res.code}] ${res.message}`)
    this.name = 'ApiError'
  }
}
