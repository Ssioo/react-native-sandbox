import * as eva from '@eva-design/eva'
import { NavigationContainer } from '@react-navigation/native'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { Alert } from 'components/alert'
import { LoadingIndicator } from 'components/loading-indicator'
import { PermissionSettingModal } from 'components/permission-setting-modal'
import { Toast } from 'components/toast'
import { UpdateAppModal } from 'components/update-app-modal'
import { isIOS, WARNING_WHITELIST } from 'infra/constant'
import { setupI18n, teardownI18n } from 'infra/i18n'
import { MaterialCommunityIconsPack, MaterialIconsPack } from 'infra/icon-pack'
import { _navigationRef, setIsNavigationReady } from 'infra/navigation'
import { mapping, theme } from 'infra/theme'
import { RootDrawer } from 'navigators/root-drawer'
import React, { useEffect } from 'react'
import { StatusBar, YellowBox } from 'react-native'
import 'react-native-gesture-handler'
import SplashScreen from 'react-native-splash-screen'
import { appStore } from 'stores/app'
import { keyboardStore } from 'stores/keyboard'
import { permissionStore } from 'stores/permission'
import { Confirm } from 'components/modal-pos-neg'

export const App = () => {
  useEffect(() => {
    appStore.startAppStateListener()
    setIsNavigationReady(true)
    SplashScreen.hide()
    setupI18n()
    permissionStore.updatePermissionStatus()
    YellowBox.ignoreWarnings(WARNING_WHITELIST)
    keyboardStore.sub()
    return () => {
      keyboardStore.unsub()
      teardownI18n()
      setIsNavigationReady(false)
      appStore.stopAppStateListener()
    }
  }, [])
  return (
    <>
      <StatusBar barStyle={isIOS ? 'dark-content' : 'default'} />
      <IconRegistry
        icons={[EvaIconsPack, MaterialIconsPack, MaterialCommunityIconsPack]}
      />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.light, ...theme }}
        // @ts-ignore
        customMapping={mapping}
      >
        <NavigationContainer ref={_navigationRef}>
          <RootDrawer />
        </NavigationContainer>
      </ApplicationProvider>
      <Toast />
      <Alert />
      <Confirm />
      <LoadingIndicator />
      <PermissionSettingModal />
      <UpdateAppModal />
    </>
  )
}
