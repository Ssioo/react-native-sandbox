import { SafeArea } from 'components/layout'
import { TopNavHome } from 'components/top-nav-home'
import { subBackButton } from 'infra/backpress'
import { DEFAULT_REFRESH_INTERVAL, isAOS } from 'infra/constant'
import { tFunc, withT } from 'infra/i18n'
import { IReactionDisposer } from 'mobx'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { noticeStore } from 'stores/notice'

class _HomeScreen extends React.PureComponent<{
  t: tFunc
  navigation: any
}> {
  intervals: NodeJS.Timeout[] = []
  disposers: IReactionDisposer[] = []
  unsubBackButton?: Function

  componentDidMount() {
    if (isAOS) this.unsubBackButton = subBackButton(this.props.navigation)
    this.startIntervals()
    noticeStore.updateNotices()
  }

  componentWillUnmount() {
    this.clearIntervals()
    this.disposers.forEach((d) => d())
    this.disposers = []
    if (this.unsubBackButton) this.unsubBackButton()
  }

  startIntervals() {
    // start immediately
    // start intervals
    this.intervals = [setInterval(() => {}, DEFAULT_REFRESH_INTERVAL)]
  }

  clearIntervals() {
    if (!this.intervals.length) return
    this.intervals.forEach((i) => clearInterval(i))
    this.intervals = []
  }

  render() {
    return (
      <SafeArea>
        <TopNavHome />
        <View style={styles.container}>
          <Text>HOME</Text>
        </View>
      </SafeArea>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

// @ts-ignore
export const HomeScreen = withT()(_HomeScreen)
