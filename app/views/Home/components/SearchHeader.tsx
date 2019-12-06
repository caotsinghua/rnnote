import React, { useState, useEffect } from 'react'
import { View, Picker, Text } from 'react-native'
import { SearchBar, Input, Button } from 'react-native-elements'
import styles from '../style'
import SearchInput from '../../../components/SearchInput'
interface SearchHeaderProp {
  onSearch: Function
}

const SearchHeader: React.FC<SearchHeaderProp> = ({ onSearch }) => {
  const [timePick, setTimePick] = useState('new')
  const [typePick, setTypePick] = useState('all')
  const [areaPick, setAreaPick] = useState('all')
  const [keyword, setKeyword] = useState('')
  const handleSearch = () => {
    const queryInfo = {
      timePick,
      typePick,
      areaPick,
      keyword
    }
    onSearch(queryInfo)
  }
  useEffect(() => {
    console.log('触发查询')
    handleSearch()
  }, [timePick, typePick, areaPick])
  return (
    <View style={styles.searchHeader}>
      <View style={styles.inputSearchWrapper}>
        <SearchInput
          round
          containerStyle={{ flex: 1 }}
          value={keyword}
          onChangeText={setKeyword}
          onEndEditing={handleSearch}
          placeholder="关键词..."
        />
        <Button type="clear" title="搜索" onPress={handleSearch}></Button>
      </View>
      <View style={styles.pickers}>
        <Picker style={{ flex: 1 }} selectedValue={timePick} onValueChange={setTimePick}>
          <Picker.Item label="最新发表" value="new" />
          <Picker.Item label="最早发表" value="old" />
        </Picker>
        <Picker
          mode="dropdown"
          style={{ flex: 1 }}
          selectedValue={typePick}
          onValueChange={setTypePick}
        >
          <Picker.Item label="全部" value="all" />
          <Picker.Item label="技术" value="tech" />
          <Picker.Item label="文章" value="art" />
        </Picker>
        <Picker style={{ flex: 1 }} selectedValue={areaPick} onValueChange={setAreaPick}>
          <Picker.Item label="默认地区" value="all" />
          <Picker.Item label="北京" value="bj" />
        </Picker>
      </View>
    </View>
  )
}

export default React.memo(SearchHeader)
