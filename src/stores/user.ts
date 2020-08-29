import { bugsnag } from 'infra/bugsnag'
import { setProfile } from 'infra/profile'
import { storage } from 'infra/storage'
import { TOKEN_KEY, USER_ID_KEY, USER_PW_KEY } from 'infra/storage-key'
import { action, computed, observable, reaction } from 'mobx'
import { createContext } from 'react'
import { Profile } from 'models/user'
import { userApi } from 'networks/user'
import { setToken } from 'networks/base'

class UserStore {
  @observable token: string | null = null
  @observable profile: Profile | null = null

  @computed get hasToken() {
    return this.token !== null && this.token.length > 0
  }

  constructor() {
    reaction(
      () => this.profile,
      (p) => {
        if (p) {
          bugsnag.setUser(`${p.id}`, p.name, p.phone)
          setProfile(p)
        } else {
          bugsnag.clearUser()
          setProfile(null)
        }
      },
    )
  }

  @action
  setBaseToken(token: string | null) {
    this.token = token
    setToken(token)
  }

  async saveToken(token: string) {
    this.setBaseToken(token)
    await storage.set(TOKEN_KEY, token)
  }

  @action
  async clearToken() {
    await storage.remove(TOKEN_KEY)
    this.setBaseToken(null)
  }

  @action
  async updateProfile() {
    this.profile = await userApi.getProfile()
  }

  @action
  async initToken() {
    const token = await storage.get(TOKEN_KEY)
    this.setBaseToken(token)
    if (this.hasToken) {
      await this.updateProfile()
    }
  }

  async loadUserAuth() {
    return restoreUserAuth()
  }

  async login(email: string, password: string) {
    const token = await userApi.login(email, password, 'ko-KR')
    await this.saveToken(token)
    await this.updateProfile()
    await persistUserAuth(email, password)
  }

  @action
  async logout() {
    await this.clearToken()
    this.profile = null
  }
}

export const persistUserAuth = async (userId: string, userPw: string) => {
  await Promise.all([
    storage.set(USER_ID_KEY, userId),
    storage.set(USER_PW_KEY, userPw),
  ])
}

export const restoreUserAuth = async () => {
  const [id, pw] = await Promise.all([
    storage.get(USER_ID_KEY),
    storage.get(USER_PW_KEY),
  ])
  return {
    userId: id ?? '',
    userPw: pw ?? '',
  }
}

export const userStore = new UserStore()
export const UserStoreContext = createContext(userStore)
