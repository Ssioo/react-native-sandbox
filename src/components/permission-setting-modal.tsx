import { Button, Card, Layout, Modal, Text } from '@ui-kitten/components'
import { COLOR } from 'infra/color'
import { MODAL_MIDDLE_WIDTH } from 'infra/dimensions'
import { PRIMARY_COLOR } from 'infra/theme'
import { observer } from 'mobx-react'
import React from 'react'
import { permissionStore } from 'stores/permission'

export const PermissionSettingModal: React.FC = observer(() => {
  return (
    <Modal
      visible={!permissionStore.locationAny}
      style={{ width: MODAL_MIDDLE_WIDTH }}
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
            필수 위치권한 설정
          </Text>
          <Text style={{ fontSize: 14 }}>
            원활한 앱 사용을 위해 위치권한이 필수적으로 필요합니다.
          </Text>
          <Text style={{ fontSize: 14, marginTop: 6 }}>
            아래 설정 버튼을 눌러 위치권한을
            <Text
              style={{ fontSize: 14, color: PRIMARY_COLOR, fontWeight: 'bold' }}
            >
              {' "앱 사용 중에만 허용"'}
            </Text>
            으로 설정해주세요.
          </Text>
        </Layout>
        <Layout
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 16,
          }}
        >
          <Button
            onPress={async () => {
              await permissionStore.requestLocationPermission()
            }}
          >
            설정
          </Button>
        </Layout>
      </Card>
    </Modal>
  )
})
