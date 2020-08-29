import { Alert } from 'components/alert'
import { Toast } from 'components/toast'
import { isAOS, isIOS } from 'infra/constant'
// @ts-ignore
import _isEqual from 'lodash.isequal'
import { useCallback, useState } from 'react'
import { Linking } from 'react-native'
import { Confirm } from 'components/modal-pos-neg'

// https://github.com/mobxjs/mobx-react-lite/blob/master/src/utils.ts#L9
export function useForceUpdate() {
  const [, setTick] = useState(0)
  return useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])
}

export const alert = Alert.show

export const confirm = Confirm.show

export const toast = Toast.show

export const longToast = (content: string | Error) => {
  toast(content, 5000)
}

export const isEqual = _isEqual

export const toastWip = () => {
  toast('아직 완성되지 않은 기능이에요 ㅠㅠ')
}

export const getElapsedHoursFromDate = (date: Date | string) => {
  if (!date) return
  return Math.round(
    (new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60),
  )
}

// min included, max included
export const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const goToAppDownloadPage = () => {
  const url = isIOS
    ? 'https://install.appcenter.ms/users/yeonwoo_sio/apps/RNSandbox-ios'
    : isAOS
    ? 'https://install.appcenter.ms/users/yeonwoo_sio/apps/RNSandbox'
    : null
  if (!url) return
  Linking.openURL(url)
}

export const sortKorean = (a: string, b: string) => {
  if (a > b) return 1
  if (b > a) return -1
  return 0
}
