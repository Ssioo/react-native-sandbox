import { SERVER_BASE_URL } from 'infra/constant'

// BaseApi should be a leaf node in dependency graph
let token: string | null = null
export const setToken = (t: string | null) => {
  token = t
}

export interface NetworkMessage {
  isSuccess: boolean
  code: number
  message?: string
  result?: any
}

export class BaseApi {
  get commonHeaders() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token || '',
    }
  }

  async get(path: string): Promise<NetworkMessage> {
    const res = await fetch(`${SERVER_BASE_URL}${path}`, {
      method: 'GET',
      headers: this.commonHeaders,
    })
    return await res.json()
  }

  async post(path: string, body?: object): Promise<NetworkMessage> {
    const res = await fetch(`${SERVER_BASE_URL}${path}`, {
      method: 'POST',
      headers: this.commonHeaders,
      body: JSON.stringify(body),
    })
    return await res.json()
  }

  async put(path: string, body: object): Promise<NetworkMessage> {
    const res = await fetch(`${SERVER_BASE_URL}${path}`, {
      method: 'PUT',
      headers: this.commonHeaders,
      body: JSON.stringify(body),
    })
    return await res.json()
  }

  async delete(path: string): Promise<NetworkMessage> {
    const res = await fetch(`${SERVER_BASE_URL}${path}`, {
      method: 'DELETE',
      headers: this.commonHeaders,
    })
    return await res.json()
  }
}
