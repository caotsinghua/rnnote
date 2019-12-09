import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: Platform.select({
      ios: 14,
      android: 16
    })
  },
  text: {
    flex: 1,
    color: '#555'
  }
})
