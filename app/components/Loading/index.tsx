import React from 'react'
import styles from './styles'
import { ActivityIndicator, View } from 'react-native'

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  )
}

export default Loading
