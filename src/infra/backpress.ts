import { BACK_BUTTON_EXIT_RESET_TIME } from 'infra/constant'
import { BackHandler, ToastAndroid } from 'react-native'

const HARDWARE_BACK_PRESS = 'hardwareBackPress'
const subBackPress = (cb: () => boolean) => {
  BackHandler.addEventListener(HARDWARE_BACK_PRESS, cb)
}
const unsubBackPress = (cb: () => boolean) => {
  BackHandler.removeEventListener(HARDWARE_BACK_PRESS, cb)
}

const genOnBackPress = () => {
  let isBackButtonPressed = false
  let backButtonTimer: NodeJS.Timeout
  return () => {
    if (!isBackButtonPressed) {
      ToastAndroid.show('한 번 더 누르면 종료됩니다', ToastAndroid.SHORT)
      isBackButtonPressed = true
      backButtonTimer = setTimeout(() => {
        isBackButtonPressed = false
      }, BACK_BUTTON_EXIT_RESET_TIME)
      return true
    }
    clearTimeout(backButtonTimer)
    isBackButtonPressed = false
    BackHandler.exitApp()
    return true
  }
}
const _onBackPress = genOnBackPress()
// should be called in componentDidMount
export const subBackButton = (
  navigation: { addListener: Function },
  onBackPress: () => boolean = _onBackPress,
) => {
  const unSubs = [
    navigation.addListener('focus', () => {
      subBackPress(onBackPress)
    }),
    navigation.addListener('blur', () => {
      unsubBackPress(onBackPress)
    }),
  ]
  return () => {
    unSubs.forEach((u) => u())
  }
}
