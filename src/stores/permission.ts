import { isAOS, isIOS } from 'infra/constant'
import { confirm } from 'infra/util'
import { action, computed, observable } from 'mobx'
import {
  checkMultiple,
  openSettings,
  Permission,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions'

enum PermissionType {
  LOCATION_FG = 'locationFg',
  LOCATION_BG = 'locationBg',
  CAMERA = 'camera',
}

const PermissionMap: { [k in PermissionType]: Permission } = isIOS
  ? {
      // NOTE: iOS location must only request `LOCATION_WHEN_IN_USE`
      // because naver map iOS internally specifically requires this permission
      // and emits 'Location service not on. Enable location settings.' error
      // if requested with `LOCATION_ALWAYS`.
      locationFg: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      locationBg: PERMISSIONS.IOS.LOCATION_ALWAYS,
      camera: PERMISSIONS.IOS.CAMERA,
    }
  : {
      locationFg: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      // NOTE: ACCESS_BACKGROUND_LOCATION is only for checking
      // it does not support `request`
      // in order to request
      locationBg: PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
      camera: PERMISSIONS.ANDROID.CAMERA,
    }

class PermissionStore {
  @observable locationFg: boolean = false
  @observable locationBg: boolean = false
  @observable camera: boolean = false
  @observable undetermined: PermissionType[] = []

  @computed get locationAny() {
    // NOTE: in ios, `bg` != `fg` + `bg`.
    // in android, `bg` = `fg` + `bg`.
    // also note that we are currently requesting
    // only fg permission in ios bc of naver map.
    // below is to prepare for the future
    // where we may have bg location permission.
    return this.locationFg || this.locationBg
  }

  @computed get hasUndetermined() {
    return this.undetermined.length > 0
  }

  async requestLocationPermission() {
    await this.requestPermission(PermissionType.LOCATION_FG)
    if (isAOS) await this.checkPermissions([PermissionType.LOCATION_BG])
  }

  async updatePermissionStatus() {
    await this.checkPermissions([
      PermissionType.LOCATION_FG,
      PermissionType.LOCATION_BG,
      PermissionType.CAMERA,
    ])
  }

  @action
  async checkPermissions(permissionTypes: PermissionType[]) {
    const res = await checkMultiple(
      permissionTypes.map((pt) => PermissionMap[pt]),
    )
    const undetermined: PermissionType[] = []
    permissionTypes.forEach((k) => {
      const p = PermissionMap[k]
      this[k] = res[p] === RESULTS.GRANTED
      if (res[p] === RESULTS.DENIED) {
        undetermined.push(k)
      }
    })
    this.undetermined = undetermined
  }

  @action
  async requestPermission(permissionType: PermissionType) {
    // ignore if the permission is already granted
    if (this[permissionType]) return
    const res = await request(PermissionMap[permissionType])
    this[permissionType] = res === RESULTS.GRANTED
    if (res === RESULTS.DENIED) {
      confirm(
        '권한이 거부되었습니다! 설정에 직접 들어가서 허용해주세요.',
        '설정으로 이동',
        () => {
          openSettings().catch(() => {})
        },
      )
    }
  }
}

export const permissionStore = new PermissionStore()
