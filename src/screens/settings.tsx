import { Button, Layout, Text, Toggle } from '@ui-kitten/components'
import { HeaderText } from 'components/header-text'
import { SafeArea } from 'components/layout'
import { TopNavDrawer } from 'components/top-nav-drawer'
import { subBackButton } from 'infra/backpress'
import { isAOS, isIOS } from 'infra/constant'
import { theme } from 'infra/theme'
import { goToAppDownloadPage } from 'infra/util'
import { CODEPUSH_VERSION } from 'infra/version'
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native'
import { keyboardStore } from 'stores/keyboard'
import { noticeStore } from 'stores/notice'

export const SettingsScreen = observer((props: any) => {
  useEffect(() => {
    const unsub = isAOS ? subBackButton(props.navigation) : () => {}
    return () => unsub()
  }, [props.navigation])
  return (
    <KeyboardAvoidingView
      behavior={isIOS ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SafeArea>
        <TopNavDrawer title='설정' />
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
          <Layout
            style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 10 }}
          >
            <TouchableWithoutFeedback onPress={() => keyboardStore.hide()}>
              <Layout>
                <Layout>
                  <HeaderText style={{ marginVertical: 10 }}>
                    현재 앱 버전
                  </HeaderText>
                  <Layout
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Text>v{CODEPUSH_VERSION}</Text>
                    {noticeStore.needUpdate ? (
                      <Button
                        size='tiny'
                        style={{ marginLeft: 10 }}
                        onPress={() => goToAppDownloadPage()}
                      >
                        업데이트
                      </Button>
                    ) : (
                      <Text
                        style={{
                          color: theme['color-success-500'],
                          fontWeight: 'bold',
                          fontSize: 12,
                          alignSelf: 'flex-end',
                          marginLeft: 4,
                        }}
                      >
                        (최신 버전입니다)
                      </Text>
                    )}
                  </Layout>
                </Layout>
                <Layout style={{ marginTop: 10 }}>
                  <HeaderText style={{ marginVertical: 10 }}>
                    의견 보내기
                  </HeaderText>
                  <Text style={{ fontSize: 11 }}>
                    버그를 발견하거나 개선하면 좋을 부분이 있다면 언제든지
                    알려주세요.
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      marginTop: 4,
                      marginBottom: 14,
                    }}
                  >
                    - 🧑‍💻 개발자 올림
                  </Text>
                </Layout>
              </Layout>
            </TouchableWithoutFeedback>
          </Layout>
        </ScrollView>
      </SafeArea>
    </KeyboardAvoidingView>
  )
})
