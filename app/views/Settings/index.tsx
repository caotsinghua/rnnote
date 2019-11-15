import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import { MapDispatchToProps, connect, DispatchProp } from 'react-redux'
import { Dispatch } from 'redux'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import Toast from 'react-native-root-toast'

interface SettingsProps extends NavigationStackScreenProps {
  onLogout: Function
}
const Settings: React.FC<SettingsProps> = ({ navigation, onLogout }) => {
  function handleLogout() {
    onLogout(() => {
      Toast.show('退出成功')
      navigation.navigate('AuthLoading')
    })
  }
  return (
    <View>
      <Button title="退出登陆" onPress={handleLogout}></Button>
    </View>
  )
}
const mapDispatchToProps: MapDispatchToProps<any, any> = (dispatch: Dispatch<any>) => {
  return {
    onLogout: (cb: Function) => dispatch({ type: 'user/logout', cb })
  }
}
export default connect(() => ({}), mapDispatchToProps)(React.memo(Settings))
