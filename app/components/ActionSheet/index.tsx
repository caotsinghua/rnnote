import React, { ReactElement } from 'react'
import Modal from 'react-native-modal'
import { View, FlatList, ListRenderItem, Text } from 'react-native'
import styles from './styles'
import { ListItem } from 'react-native-elements'
export interface ActionSheetProps {
  data: ActionSheetItem[]
  isVisible: boolean
  renderItem?: ListRenderItem<ActionSheetItem>
  onItemPress: (item: ActionSheetItem, index: number) => void
  title?: ReactElement // actionsheet标题
}

export interface ActionSheetItem {
  name: string
  key: string | number
}
const ActionSheet: React.FC<ActionSheetProps> = React.memo(
  ({ isVisible, data, renderItem, onItemPress, title }) => {
    if (typeof renderItem === 'undefined') {
      renderItem = ({ item, index }) => {
        const handleItemPress = () => {
          onItemPress(item, index)
        }
        return <ListItem key={index} title={item.name} onPress={handleItemPress} />
      }
    }

    let Title: any = null
    switch (typeof title) {
      case 'undefined': {
        break
      }
      case 'string': {
        Title = <Text>{title}</Text>
        break
      }
      default: {
        Title = title
      }
    }
    return (
      <Modal isVisible={isVisible} style={styles.modal}>
        <View style={styles.content}>
          {Title}
          <FlatList
            data={data}
            keyExtractor={item => item.key.toString()}
            renderItem={renderItem}
          />
        </View>
      </Modal>
    )
  }
)

export default ActionSheet
