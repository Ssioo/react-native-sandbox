import { Button, Card, Layout, Modal, Text } from '@ui-kitten/components'
import { COLOR } from 'infra/color'
import { MODAL_WIDE_WIDTH } from 'infra/dimensions'
import { goToAppDownloadPage } from 'infra/util'
import { observer } from 'mobx-react'
import React from 'react'
import { noticeStore } from 'stores/notice'

export const UpdateAppModal: React.FC = observer(() => {
  return (
    <Modal
      visible={noticeStore.needUpdate}
      style={{ width: MODAL_WIDE_WIDTH }}
      backdropStyle={{ backgroundColor: COLOR.backdrop }}
    >
      <Card disabled={true}>
        <Layout>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 16,
              marginBottom: 12,
            }}
          >
            {noticeStore.versionNotice?.title}
          </Text>
          <Text style={{ fontSize: 14 }}>
            {noticeStore.versionNotice?.content ?? ''}
          </Text>
        </Layout>
        <Layout
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 16,
          }}
        >
          <Button onPress={() => goToAppDownloadPage()}>업데이트</Button>
        </Layout>
      </Card>
    </Modal>
  )
})
