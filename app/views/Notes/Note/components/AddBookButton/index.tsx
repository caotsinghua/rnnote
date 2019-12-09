import React from 'react'
import { TouchableNativeFeedback, Text, View } from 'react-native'
import styles from './styles'
import { Icon, ListItem } from 'react-native-elements'

export interface AddBookButtonProps {
  text?: string
  onPress?: () => void
}

const AddBookButton: React.FC<AddBookButtonProps> = React.memo(
  ({ text = '选择笔记本', onPress }) => {
    if (typeof onPress === 'undefined') {
      onPress = () => {}
    }
    return (
      <ListItem
        title={text}
        rightIcon={{ name: 'add' }}
        onPress={onPress}
        titleStyle={styles.text}
      />
    )
  }
)

export default AddBookButton
