import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  // ====booklist
  listItemLeft: {},
  listItemTime: {
    color: '#999',
    fontSize: 12,
    marginBottom: 6
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  listItemDesc: {
    color: '#444'
  },
  // 当note长按编辑时的container
  editingItem: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  sectionHeader: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginBottom: 0,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  // 搜索header
  searchHeader: {},
  inputSearchWrapper: {
    paddingVertical: 10,
    flexDirection: 'row',
    paddingRight: 10
  },
  pickers: {
    flexDirection: 'row'
  }
})
