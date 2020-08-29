import { Card, Layout, Text } from '@ui-kitten/components'
import { SafeArea } from 'components/layout'
import { TopNavDrawer } from 'components/top-nav-drawer'
import { subBackButton } from 'infra/backpress'
import { isAOS } from 'infra/constant'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { noticeStore } from 'stores/notice'
import { Notice } from 'models/notice'

export const NoticesScreen = observer((props: any) => {
  const [selected, setSelected] = useState(-1)
  useEffect(() => {
    const unsub = isAOS ? subBackButton(props.navigation) : () => {}
    return () => unsub()
  }, [props.navigation])
  return (
    <SafeArea>
      <TopNavDrawer title='공지사항' />
      {noticeStore.notices.length > 0 ? (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
          <Layout
            style={{ flex: 1, paddingHorizontal: 12, paddingVertical: 8 }}
          >
            {noticeStore.notices.map((n) => (
              <NoticeItem
                key={n.id}
                n={n}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </Layout>
        </ScrollView>
      ) : (
        <Layout
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>아직 공지사항이 없습니다!</Text>
        </Layout>
      )}
    </SafeArea>
  )
})

const NoticeItem: React.FC<{
  n: Notice
  selected: number
  setSelected: (id: number) => void
}> = ({ n, selected, setSelected }) => {
  return (
    <Card
      style={{ marginVertical: 4 }}
      onPress={() => {
        setSelected(selected === n.id ? -1 : n.id)
      }}
      activeOpacity={0.5}
    >
      <Text style={{ fontWeight: 'bold', marginBottom: 6 }}>
        {n?.title ?? 'Untitled'}
      </Text>
      <Text
        numberOfLines={selected === n.id ? undefined : 2}
        ellipsizeMode='tail'
      >
        {n?.content ?? ''}
      </Text>
      <Text
        style={{
          alignSelf: 'flex-end',
          marginTop: 6,
          fontSize: 12,
        }}
      >
        {n?.createdAt ?? ''}
      </Text>
    </Card>
  )
}
