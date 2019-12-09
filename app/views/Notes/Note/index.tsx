import React, { useState } from 'react'
import styles from './styles'
import { View, Text } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import Header from '../../../components/Header'
import { NavigationStackProp } from 'react-navigation-stack'
import ActionSheet, { ActionSheetItem } from '../../../components/ActionSheet'
import AddBookButton from './components/AddBookButton'
import AddBookModal from './components/AddBookModal'
interface NoteProps {
  navigation: NavigationStackProp
}
const Note: React.FC<NoteProps> = React.memo(({ navigation }) => {
  const [bookName, setBookName] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [bookModalVisible, setBookModalVisible] = useState(false)

  const leftComponent = (
    <View style={styles.headerLeft}>
      <Icon name="arrow-back" color="#fff" />
      <Icon name="save" color="#fff" containerStyle={styles.headerIcon} />
    </View>
  )
  const handleSelectBook = () => {
    setModalVisible(true)
  }
  const actionSheetData: ActionSheetItem[] = [
    {
      name: '测试',
      key: 1
    },
    {
      name: '测试2',
      key: 2
    }
  ]
  const handleActionSelect = (item: ActionSheetItem) => {
    setBookName(item.name)
    setModalVisible(false)
  }
  const handleAddBook = () => {
    setBookModalVisible(true)
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header leftComponent={leftComponent} title="" />
      <Input placeholder="输入标题..." leftIcon={{ name: 'title' }} />
      <View style={styles.bookSelect}>
        <Button
          icon={{ name: 'book' }}
          title={bookName}
          type="clear"
          containerStyle={styles.bookNameButtonContainer}
          buttonStyle={styles.bookNameButton}
          titleStyle={{ color: '#000' }}
          onPress={handleSelectBook}
        ></Button>
        <Icon name="info" />
      </View>
      <ActionSheet
        isVisible={modalVisible}
        data={actionSheetData}
        onItemPress={handleActionSelect}
        title={<AddBookButton onPress={handleAddBook} />}
      />
      <AddBookModal
        isVisible={bookModalVisible}
        onCancel={() => {
          setBookModalVisible(false)
        }}
      />
    </SafeAreaView>
  )
})

export default Note
