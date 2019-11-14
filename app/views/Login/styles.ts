import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff'
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    marginBottom: 20
  },
  logoText: {
    fontSize: 26,
    fontWeight: 'bold'
  },
  loginForm: {
    alignSelf: 'stretch',
    marginHorizontal: 30,
    marginBottom: 20
  },
  loginButton: {
    width: 70,
    height: 70,
    borderRadius: 70,
    marginTop: 25
  },
  inputContainer: { borderBottomWidth: 0, backgroundColor: '#eee', borderRadius: 50 },
  input: {
    marginLeft: 10
  },
  InputWrap: {
    marginBottom: 10
  },
  bottomArea: {
    width: 200,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  otherButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  line: {
    width: 1,
    backgroundColor: '#ccc',
    alignSelf: 'stretch'
  }
})
