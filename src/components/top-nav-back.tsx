import { TopNavigation, TopNavigationAction } from '@ui-kitten/components'
import { ArrowBackIcon } from 'components/icon'
import { navigation } from 'infra/navigation'
import React from 'react'

export const TopNavBack: React.FC<{
  title?: string
}> = ({ title }) => {
  return (
    <TopNavigation
      title={title}
      accessoryLeft={() => (
        <TopNavigationAction
          icon={ArrowBackIcon}
          onPress={() => navigation.goBack()}
        />
      )}
      alignment='center'
    />
  )
}
