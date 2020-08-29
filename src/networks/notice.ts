import { Notice } from 'models/notice'
import { BaseApi } from './base'
import { ApiError } from './error'

class NoticeApi extends BaseApi {
  async getNotices(): Promise<Notice[]> {
    const res = await this.get('/notices')
    if (res.code !== 200) throw new ApiError(res)
    return res.result
  }
}

export const noticeApi = new NoticeApi()
