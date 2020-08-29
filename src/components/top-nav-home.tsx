import { Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components'
import { InfoOutlineIcon, MenuIcon, WorkIcon } from 'components/icon'
import { navigation } from 'infra/navigation'
import React from 'react'
import { View } from 'react-native'
import { modalStore } from 'stores/modal'

const TopNavHomeBar = () => {
  return (
    <TopNavigation
      accessoryLeft={() => (
        <TopNavigationAction
          icon={MenuIcon}
          onPress={() => navigation.openDrawer()}
        />
      )}
      accessoryRight={() => (
        <>
          <TopNavigationAction
            icon={InfoOutlineIcon}
            onPress={() => (modalStore.info = true)}
          />
        </>
      )}
      alignment='center'
    />
  )
}

const TopNavHomeTitle = () => {
  return (
    <View
      style={{
        position: 'absolute',
        alignItems: 'center',
        width: '100%',
        top: 12,
        elevation: 5,
      }}
      pointerEvents='box-none'
    >
      <Text
        style={{
          fontSize: 28,
          fontFamily: 'NotoSansKR-Bold',
          textAlign: 'center',
        }}
      >
        RN Sandbox
      </Text>
    </View>
  )
}

export const TopNavHome = () => {
  return (
    <View>
      <TopNavHomeBar />
      <TopNavHomeTitle />
    </View>
  )
}
