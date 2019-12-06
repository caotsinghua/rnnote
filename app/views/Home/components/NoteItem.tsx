import React, { useState } from 'react'
import styles from '../style'
import { View, Text, TouchableNativeFeedback, Alert } from 'react-native'
import { withNavigation, NavigationProp } from 'react-navigation'
import { ListItem, Button } from 'react-native-elements'
import { NavigationStackProp } from 'react-navigation-stack'
import dayjs from 'dayjs'
import { Note } from 'app/store/modules/notes'
interface RenderItemProp {
  navigation: NavigationStackProp
  item: Note
}

const RenderItem: React.FC<RenderItemProp> = ({ item, navigation }) => {
  const [editing, setEditing] = useState(false)
  const LeftItem = (
    <View style={styles.listItemLeft}>
      <Text style={styles.listItemTime}>{dayjs(item.createTime).format('YYYY/MM/DD')}</Text>
      <Text style={styles.listItemTitle}>{item.title}</Text>
      <Text style={styles.listItemDesc}>{item.desc}</Text>
    </View>
  )
  const handlePressArticle = () => {
    console.log('点击文章')
    console.log(item)
    navigation.navigate('Note', {
      title: item.title,
      desc: item.desc,
      createTime: item.createTime
    })
  }
  const handleEdit = () => {
    navigation.navigate('Note', {
      ...item
    })
    toggleEditing()
  }
  const handleDelete = () => {
    Alert.alert(
      '警告',
      '确认删除？',
      [
        {
          text: '取消',
          onPress: () => {
            console.log('取消')
            toggleEditing()
          },
          style: 'cancel'
        },
        {
          text: '确定',
          style: 'default',
          onPress: () => {
            console.log('qued ')
            toggleEditing()
          }
        }
      ],
      {
        cancelable: false
      }
    )
  }
  const toggleEditing = () => {
    //   长按item，弹出编辑等按钮
    setEditing(editing => !editing)
  }
  return editing ? (
    <TouchableNativeFeedback onPress={toggleEditing}>
      <View style={styles.editingItem}>
        <Button
          icon={{ name: 'md-create', type: 'ionicon', color: '#fff' }}
          buttonStyle={{ borderRadius: 150, width: 60, height: 60 }}
          background={TouchableNativeFeedback.Ripple('#ccc', true)}
          onPress={handleEdit}
        />
        <Button
          icon={{ name: 'ios-trash', type: 'ionicon', color: '#fff' }}
          buttonStyle={{ borderRadius: 150, width: 60, height: 60, backgroundColor: '#f00' }}
          background={TouchableNativeFeedback.Ripple('#ccc', true)}
          onPress={handleDelete}
        />
      </View>
    </TouchableNativeFeedback>
  ) : (
    <ListItem
      containerStyle={{ marginTop: 0, height: 120 }}
      leftElement={LeftItem}
      bottomDivider
      onPress={handlePressArticle}
      onLongPress={toggleEditing}
    ></ListItem>
  )
}

export default withNavigation(RenderItem)
