import { Layout } from '@ui-kitten/components'
import React from 'react'
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
})

export const SafeArea: React.FC = (props) => {
  return <SafeAreaView style={styles.safeArea}>{props.children}</SafeAreaView>
}

export const DismissKeyboardHOC = (Comp: any) => {
  // @ts-ignore
  return ({ children, ...props }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props}>{children}</Comp>
    </TouchableWithoutFeedback>
  )
}
export const DismissKeyboardLayout = DismissKeyboardHOC(Layout)
