import { Button, Card, Layout, Modal } from '@ui-kitten/components'
import { COLOR } from 'infra/color'
import React from 'react'
import { Text } from 'react-native'

export class Confirm extends React.Component<any, any> {
  static instance: Confirm

  constructor(props: any) {
    super(props)
    this.state = {
      visible: false,
      content: null,
      okay: null,
      onOkay: null,
      cancel: null,
      onCancel: null,
      onBackdropPress: null,
    }
    Confirm.instance = this
    this._hide = this._hide.bind(this)
  }

  static show(
    content: string,
    okay: string,
    onOkay: () => void,
    cancel?: string,
    onCancel?: () => void,
    onBackdropPress?: () => void,
  ) {
    Confirm.instance._show(
      content,
      okay,
      onOkay,
      cancel,
      onCancel,
      onBackdropPress,
    )
  }

  _show(
    content: string,
    okay?: string,
    onOkay?: () => void,
    cancel?: string,
    onCancel?: () => void,
    onBackdropPress?: () => void,
  ) {
    this.setState({
      visible: true,
      content,
      okay,
      onOkay,
      cancel,
      onCancel,
      onBackdropPress,
    })
  }

  _hide() {
    this.setState({
      visible: false,
      content: null,
      okay: null,
      onOkay: null,
      cancel: null,
      onCancel: null,
      onBackdropPress: null,
    })
  }

  render() {
    const {
      visible,
      content,
      okay,
      onOkay,
      cancel,
      onCancel,
      onBackdropPress,
    } = this.state
    return (
      <Modal
        visible={visible}
        backdropStyle={{ backgroundColor: COLOR.backdrop }}
        onBackdropPress={() => {
          if (onBackdropPress) onBackdropPress()
          this._hide()
        }}
      >
        <Card disabled={true}>
          <Layout>
            <Text>{content}</Text>
          </Layout>
          <Layout
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
            }}
          >
            <Button
              style={{ marginRight: 10 }}
              onPress={() => {
                if (onOkay) onOkay()
                this._hide()
              }}
            >
              {okay || '확인'}
            </Button>
            <Button
              appearance='ghost'
              onPress={() => {
                if (onCancel) onCancel()
                this._hide()
              }}
            >
              {cancel || '취소'}
            </Button>
          </Layout>
        </Card>
      </Modal>
    )
  }
}
