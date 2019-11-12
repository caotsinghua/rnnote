import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import Header from '../../components/Header'
import styles from './style'
const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Text>首页</Text>
    </View>
  )
}

export default Home
