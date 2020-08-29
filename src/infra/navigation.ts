import { NavigationContainerRef } from '@react-navigation/core'
import { CommonActions, DrawerActions } from '@react-navigation/native'
import { confirm } from 'infra/util'
import React from 'react'

// https://reactnavigation.org/docs/navigating-without-navigation-prop/#handling-initialization
let _isNavigationReady: boolean = false
export const setIsNavigationReady = (isReady: boolean) => {
  _isNavigationReady = isReady
}
export const _navigationRef = React.createRef<NavigationContainerRef>()

export const navigation = {
  navigate: (name: string, params?: object) => {
    if (!_isNavigationReady) return
    _navigationRef.current?.navigate(name, params)
  },
  openDrawer() {
    if (!_isNavigationReady) return
    _navigationRef.current?.dispatch(DrawerActions.openDrawer())
  },
  closeDrawer() {
    if (!_isNavigationReady) return
    _navigationRef.current?.dispatch(DrawerActions.closeDrawer())
  },
  setRoot(name: string) {
    if (!_isNavigationReady) return
    _navigationRef.current?.dispatch(
      CommonActions.reset({
        index: 0,
        // @ts-ignore
        routes: [{ name }],
      }),
    )
  },
  goBack() {
    if (!_isNavigationReady) return
    _navigationRef.current?.goBack()
  },
}

let ignoreProgressLossWarnFlag = false
export const setIgnoreProgressLossWarnFlag = (v: boolean) => {
  ignoreProgressLossWarnFlag = v
}

export const registerProgressLossWarn = (navigation: any) => {
  navigation.addListener('beforeRemove', (e: any) => {
    if (ignoreProgressLossWarnFlag) return
    e.preventDefault()
    confirm(
      '진행중이던 내용이 사라집니다.\n정말 이전 화면으로 돌아갈까요?',
      '확인',
      () => navigation.dispatch(e.data.action),
    )
  })
}
