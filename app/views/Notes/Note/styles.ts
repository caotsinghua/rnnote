import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  headerLeft: {
    flexDirection: 'row'
  },
  headerIcon: {
    marginLeft: 20
  },
  bookSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginHorizontal: 10
  },
  bookNameButtonContainer: {
    flex: 1
  },
  bookNameButton: {
    justifyContent: 'flex-start'
  },
  contentContainer: {
    flex: 1
  },
  contentInputContainer: {
    borderBottomWidth: 0
  }
})
