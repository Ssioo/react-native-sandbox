import { Icon, Input, InputProps } from '@ui-kitten/components'
import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'

export const SecretInput = (props: InputProps) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true)
  const renderSecurityIcon = (iconProps: any) => (
    <TouchableWithoutFeedback
      onPress={() => setSecureTextEntry(!secureTextEntry)}
    >
      <Icon {...iconProps} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  )
  return (
    <Input
      {...props}
      secureTextEntry={secureTextEntry}
      accessoryRight={renderSecurityIcon}
    />
  )
}
