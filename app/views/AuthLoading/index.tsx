import React, { useEffect, useCallback, useState } from 'react'
import { NavigationSwitchScreenProps, SafeAreaView } from 'react-navigation'
import { ActivityIndicator, Text } from 'react-native'
import styles from './style'
import Storage from '../../utils/storage'
const AuthLoading: React.FC<NavigationSwitchScreenProps> = ({ navigation }) => {
  const [text, setText] = useState('正在获取登陆状态...')
  const checkLoginStatus = useCallback(async () => {
    const token = await Storage.get('u-token')
    if (token) {
      navigation.navigate('Home')
    } else {
      setText('跳转到登陆')
      setTimeout(() => {
        navigation.navigate('Auth')
      }, 1000)
    }
  }, [])
  useEffect(() => {
    checkLoginStatus()
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" />
      <Text>{text}</Text>
    </SafeAreaView>
  )
}

export default React.memo(AuthLoading)
