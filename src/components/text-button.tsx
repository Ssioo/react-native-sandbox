import { PRIMARY_COLOR } from 'infra/theme'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const TEXT_BUTTON_SELECTED_COLOR = PRIMARY_COLOR

export const TextButton: React.FC<{
  text: string
  isSelected: boolean
  onPress: () => void
}> = (props) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          borderWidth: props.isSelected ? 0.5 : 0,
          borderColor: TEXT_BUTTON_SELECTED_COLOR,
        },
      ]}
      onPress={props.onPress}
    >
      <Text
        style={[
          styles.buttonText,
          {
            color: props.isSelected ? TEXT_BUTTON_SELECTED_COLOR : '#000',
          },
        ]}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '50%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
  },
})
