import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import ToastExample from '../../native-modules/ToastExample'
const Books: React.FC = () => {
  const handlePress=()=>{
    ToastExample.show("测试",ToastExample.SHORT)
  }
  return (
    <View>
      <Button title="笔记本" onPress={handlePress}></Button>
    </View>
  )
}

export default Books
