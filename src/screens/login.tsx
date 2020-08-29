import { Button, Input, Layout, Text } from '@ui-kitten/components'
import { SecretInput } from 'components/input'
import { DismissKeyboardLayout } from 'components/layout'
import { alert } from 'infra/util'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { userStore } from 'stores/user'

export const LoginScreen = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  useEffect(() => {
    userStore.loadUserAuth().then(({ userId, userPw }) => {
      setEmail(userId)
      setPassword(userPw)
    })
  }, [])
  return (
    <DismissKeyboardLayout style={styles.layout}>
      <Layout style={styles.container}>
        <Text style={styles.header} category='h2'>
          Welcome!👋
        </Text>
        <Layout style={styles.inputContainer}>
          <Input
            style={styles.emailInput}
            label='이메일'
            keyboardType='email-address'
            autoCapitalize='none'
            value={email}
            onChangeText={setEmail}
            size='large'
          />
          <SecretInput
            label='비밀번호'
            value={password}
            onChangeText={setPassword}
            size='large'
          />
        </Layout>
        <Button
          onPress={() => {
            userStore.login(email, password).catch((e) => alert(e))
          }}
          size={'large'}
        >
          로그인
        </Button>
      </Layout>
    </DismissKeyboardLayout>
  )
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '60%',
    alignItems: 'center',
  },
  header: {
    marginBottom: 40,
    fontWeight: 'bold',
  },
  inputContainer: {
    alignSelf: 'stretch',
    marginBottom: 40,
  },
  emailInput: {
    marginBottom: 16,
  },
})
