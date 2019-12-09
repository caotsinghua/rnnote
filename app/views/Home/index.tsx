import React, { useEffect, useState, useCallback } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import Header from '../../components/Header'
import styles from './style'
import NoteList from './components/NoteList'
import SearchHeader from './components/SearchHeader'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { NoteSection, NotesState } from 'app/store/modules/notes'

interface HomeProps {
  getNotes: (payload?: any, cb?: Function) => any
  notesData: NoteSection[]
}

const Home: React.FC<HomeProps> = ({ getNotes, notesData }) => {
  const [queryData, setQueryData] = useState(undefined)
  const getData = useCallback(
    (callback?: Function) => {
      getNotes(queryData,callback)
    },
    [queryData]
  )

  useEffect(() => {
    getData()
  }, [])

  const handleSearch = (query: any) => {
    // 每次query是最新的，覆盖到querydata
    setQueryData(query)
    getNotes(query)
  }

  return (
    <View style={styles.container}>
      <Header />
      <SearchHeader onSearch={handleSearch} />
      <NoteList notesData={notesData} onFetchData={getData} />
    </View>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getNotes: (payload: any, callback?: Function) => dispatch({ type: 'notes/getNotes', payload, callback })
  }
}
const mapStateToProps = ({ notes }: { notes: NotesState }) => ({
  notesData: notes.data
})
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Home))
