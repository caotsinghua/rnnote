import React, { useEffect, useState } from 'react'
import { View, RefreshControl } from 'react-native'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { withNavigation, FlatList, SectionList } from 'react-navigation'
import { NavigationDrawerProp } from 'react-navigation-drawer'
import { ListItem, Text } from 'react-native-elements'
import { SwipeListView } from 'react-native-swipe-list-view'
import styles from '../style'
import NoteItem from './NoteItem'
import { NoteSection } from 'app/store/modules/notes'

export interface NoteListProps {
  notesData: NoteSection[]
  navigation: NavigationDrawerProp
  onFetchData: Function
}
const NoteList: React.FC<NoteListProps> = ({ notesData, navigation, onFetchData }) => {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    onFetchData(() => {
      setRefreshing(false)
    })
  }
  const NoteRefreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}></RefreshControl>
  )

  return (
    <SectionList
      sections={notesData}
      renderItem={({ item }) => <NoteItem item={item} />}
      renderSectionHeader={renderSectionHeader}
      data={notesData}
      keyExtractor={(item, index) => index.toString()}
      stickySectionHeadersEnabled={true}
      refreshControl={NoteRefreshControl}
    ></SectionList>
  )
}
const renderSectionHeader = ({ section }: { section: any }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.listItemTime}>{section.label}</Text>
  </View>
)
export default withNavigation(React.memo(NoteList))
