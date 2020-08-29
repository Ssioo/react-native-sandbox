import { TopNavigation, TopNavigationAction } from '@ui-kitten/components'
import { MenuIcon } from 'components/icon'
import { navigation } from 'infra/navigation'
import React from 'react'

export const TopNavDrawer: React.FC<{
  title: string
}> = (props) => {
  return (
    <TopNavigation
      accessoryLeft={() => (
        <TopNavigationAction
          icon={MenuIcon}
          onPress={() => navigation.openDrawer()}
        />
      )}
      title={props.title}
      alignment='center'
    />
  )
}
