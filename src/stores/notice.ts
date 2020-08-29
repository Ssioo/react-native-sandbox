import { bugsnag } from 'infra/bugsnag'
import { isAOS, isIOS } from 'infra/constant'
import { alert } from 'infra/util'
import { CODEPUSH_VERSION } from 'infra/version'
import { action, computed, observable } from 'mobx'
import { Notice, VersionNotice } from 'models/notice'
import { noticeApi } from 'networks/notice'

class NoticeStore {
  @observable notices: Notice[] = []
  @observable versionNotice: VersionNotice | null = null

  @computed get needUpdate(): boolean {
    if (!this.versionNotice) return false
    const [x1, y1, z1] = CODEPUSH_VERSION.split('.')
    const [x2, y2, z2] = this.versionNotice.version.split('.')
    if (x1 < x2) return true
    if (y1 < y2) return true
    return z1 < z2
  }

  @action
  async updateNotices() {
    try {
      const notices = await noticeApi.getNotices()
      const nonVersionNotices = []
      let versionNotice: VersionNotice | null = null
      for (const n of notices) {
        if (n.title.startsWith('업데이트 안내')) {
          // ignore un-matching platform related
          if (isAOS && n.title.includes('iOS')) continue
          if (isIOS && n.title.includes('Android')) continue
          try {
            versionNotice = {
              ...n,
              version: n.content?.split(' ')[0].substring(1) ?? '1.0.0',
            }
          } catch (e) {
            bugsnag.notify(e)
          }
        } else {
          // skip 2019 contents
          if (n.createdAt?.startsWith('2019')) continue
          nonVersionNotices.push(n)
        }
      }
      this.notices = nonVersionNotices
      this.versionNotice = versionNotice
    } catch (e) {
      alert(e)
    }
  }
}

export const noticeStore = new NoticeStore()
