import { ApiError, InputError } from './error'
import { BaseApi } from './base'

class UserApi extends BaseApi {
  async login(id: string, pw: string, language: string) {
    if (!id || !pw) throw new InputError()
    const res = await this.post('/user/token', {
      id,
      pw,
      language,
    })
    if (res.code !== 200) throw new ApiError(res)
    return res.result.token
  }

  async signUp() {
    const res = await this.post('/user')
    if (res.code !== 200) throw new ApiError(res)
    return res.result
  }

  async getProfile() {
    const res = await this.get('/user')
    if (res.code !== 200) throw new ApiError(res)
    return res.result
  }
}

export const userApi = new UserApi()
