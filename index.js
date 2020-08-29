import 'infra/bugsnag'
// https://github.com/mobxjs/mobx-react-lite/#observer-batching
import 'mobx-react-lite/batchingForReactNative'
import { AppRegistry } from 'react-native'
import codePush from 'react-native-code-push'
import { name as appName } from './app.json'
import { App } from './app.tsx'

let app = App
// enable codepush only in release
if (!__DEV__) {
  app = codePush({
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    installMode: codePush.InstallMode.ON_NEXT_RESTART,
    mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
  })(app)
}
AppRegistry.registerComponent(appName, () => app)
