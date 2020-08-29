import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import { observer } from 'mobx-react'
import { HomeStack } from 'navigators/home-stack'
import React, { useEffect } from 'react'
import { LoginScreen } from 'screens/login'
import { NoticesScreen } from 'screens/notices'
import { SettingsScreen } from 'screens/settings'
import { userStore } from 'stores/user'

// https://reactnavigation.org/docs/drawer-navigator/#providing-a-custom-drawercontent
const DrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  )
}

const Drawer = createDrawerNavigator()
export const RootDrawer = observer(() => {
  useEffect(() => {
    userStore.initToken()
  }, [])
  // https://reactnavigation.org/docs/auth-flow/#how-it-will-work
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      {!userStore.hasToken || !userStore.profile ? (
        // if not logged in, or no profile
        <Drawer.Screen
          name='Login'
          component={LoginScreen}
          // https://reactnavigation.org/docs/drawer-navigator/#options
          options={{
            swipeEnabled: false,
          }}
        />
      ) : (
        <>
          <Drawer.Screen
            name='HomeStack'
            component={HomeStack}
            options={{
              title: '홈',
              swipeEnabled: false,
            }}
          />
          <Drawer.Screen
            name='Notices'
            component={NoticesScreen}
            options={{
              title: '공지사항',
            }}
          />
          <Drawer.Screen
            name='Settings'
            component={SettingsScreen}
            options={{
              title: '설정',
            }}
          />
        </>
      )}
    </Drawer.Navigator>
  )
})
