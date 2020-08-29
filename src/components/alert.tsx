import { COLOR } from 'infra/color'
import { MODAL_MIDDLE_WIDTH } from 'infra/dimensions'
import { PRIMARY_COLOR } from 'infra/theme'
import { formatStringOrError } from 'infra/format'
import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

export class Alert extends React.Component<any, any> {
  static instance: Alert

  constructor(props: any) {
    super(props)
    this.state = {
      visible: false,
      title: '',
      content: '',
    }
    Alert.instance = this
    this._hide = this._hide.bind(this)
  }

  static show(content: string | Error, title?: string) {
    Alert.instance._show(formatStringOrError(content), title)
  }

  _show(content: string, title?: string) {
    this.setState({ visible: true, title, content })
  }

  _hide() {
    this.setState({ visible: false, title: '', content: '' })
  }

  render() {
    const { visible, title, content } = this.state
    if (!visible) return null
    return (
      <View style={styles.layout}>
        <TouchableWithoutFeedback onPress={this._hide}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
        <View style={styles.alertBox}>
          <Text style={styles.titleText}>{title || '알림'}</Text>
          <Text style={styles.contentText}>{content}</Text>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.buttonContainer} onPress={this._hide}>
            <Text style={styles.buttonText}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const borderRadius = 20

const styles = StyleSheet.create({
  layout: {
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    height: '100%',
    backgroundColor: COLOR.backdrop,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    zIndex: 11,
    width: '100%',
    height: '100%',
  },
  alertBox: {
    position: 'absolute',
    zIndex: 12,
    width: MODAL_MIDDLE_WIDTH,
    borderRadius: borderRadius,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 30,
    paddingBottom: 11,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 18,
    paddingBottom: 24,
  },
  divider: {
    borderBottomColor: 'rgba(0,0,0, 0.05)',
    borderBottomWidth: 1,
    alignSelf: 'stretch',
  },
  buttonContainer: {
    height: 54,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
  },
  buttonText: {
    color: PRIMARY_COLOR,
    fontSize: 16,
  },
})
