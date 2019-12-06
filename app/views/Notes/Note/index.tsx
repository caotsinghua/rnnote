import React from 'react'
import styles from './styles'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import Header from '../../../components/Header'
import { NavigationStackProp } from 'react-navigation-stack'

interface NoteProps {
  navigation: NavigationStackProp
}
const Note: React.FC<NoteProps> = React.memo(({ navigation }) => {
  return (
    <SafeAreaView>
      <Header leftType="back" title={navigation.getParam('title', '笔记详情')} />
      <Text>详情</Text>
    </SafeAreaView>
  )
})

export default Note
