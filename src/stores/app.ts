import { action, observable } from 'mobx'
import { AppState, AppStateStatus } from 'react-native'

// https://reactnative.dev/docs/appstate.html
const fgStatus: AppStateStatus[] = ['active']
const bgStatus: AppStateStatus[] = ['background', 'inactive']

class AppStore {
  @observable isLoading = false
  @observable isForeground: boolean = false
  currentAppState: AppStateStatus = 'inactive'

  startAppStateListener() {
    AppState.addEventListener('change', this.onAppStateChange.bind(this))
  }

  stopAppStateListener() {
    AppState.removeEventListener('change', this.onAppStateChange.bind(this))
  }

  @action
  onAppStateChange(next: AppStateStatus) {
    const prev = this.currentAppState
    // bg => fg
    if (bgStatus.includes(prev) && fgStatus.includes(next)) {
      this.isForeground = true
    }
    // fg => bg
    if (fgStatus.includes(prev) && bgStatus.includes(next)) {
      this.isForeground = false
    }
    this.currentAppState = next
  }
}
export const appStore = new AppStore()
