import React from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'
import { PRIMARY_COLOR } from 'infra/theme'

export const HeaderText: React.FC<{
  style?: StyleProp<TextStyle>
}> = (props) => {
  return (
    <Text
      style={[
        {
          color: PRIMARY_COLOR,
          fontSize: 16,
          fontWeight: 'bold',
        },
        props.style,
      ]}
    >
      {props.children}
    </Text>
  )
}
