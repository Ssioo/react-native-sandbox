import { Dimensions, Platform } from 'react-native'

export const SERVER_BASE_URL = !__DEV__
  ? 'http://15.165.170.5'
  : 'http://15.165.170.5'

export const DEFAULT_REFRESH_INTERVAL = 30000

export const WINDOW_WIDTH = Dimensions.get('window').width
export const WINDOW_HEIGHT = Dimensions.get('window').height

export const isIOS = Platform.OS === 'ios'
export const isAOS = Platform.OS === 'android'

export const BACK_BUTTON_EXIT_RESET_TIME = 1000

export const WARNING_WHITELIST = ['Calling bridge.imageLoader is deprecated']