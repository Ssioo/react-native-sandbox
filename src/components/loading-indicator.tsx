import { PRIMARY_COLOR } from 'infra/theme'
import { observer } from 'mobx-react'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { appStore } from 'stores/app'

export const LoadingIndicator = observer(() => {
  if (!appStore.isLoading) return null
  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 100,
        backgroundColor: 'rgba(255,255,255,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator size='large' color={PRIMARY_COLOR} />
    </View>
  )
})
