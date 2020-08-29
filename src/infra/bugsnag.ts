import { Client, Configuration } from 'bugsnag-react-native'
import { CODEPUSH_VERSION } from 'infra/version'

const config = new Configuration('b770d1e7ebc9a7b8271892c305620142')
config.codeBundleId = CODEPUSH_VERSION
config.autoNotify = !__DEV__
export const bugsnag = new Client(config)
