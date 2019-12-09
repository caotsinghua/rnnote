import React, { useState } from 'react'
import Modal from 'react-native-modal'
import { View, Text } from 'react-native'
import styles from './styles'
import { Input, Button } from 'react-native-elements'
export interface AddBookModalProps {
  isVisible: boolean
  onCancel: () => void
}

const AddBookModal: React.FC<AddBookModalProps> = ({ isVisible, onCancel }) => {
  const [value, setValue] = useState('')
  const onOk = () => {
    console.log('添加笔记本')
    onCancel()
  }
  return (
    <Modal isVisible={isVisible} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>添加笔记本</Text>
        </View>
        <Input placeholder="笔记本名称" value={value} onChangeText={text => setValue(text)} />
        <View style={styles.footer}>
          <Button
            title="取消"
            type="clear"
            titleStyle={styles.cancelText}
            onPress={onCancel}
          ></Button>
          <Button title="确定" type="clear" titleStyle={styles.okText} onPress={onOk}></Button>
        </View>
      </View>
    </Modal>
  )
}

export default AddBookModal
