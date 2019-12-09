import React, { useState, useRef, useCallback, Dispatch } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  Alert,
  KeyboardAvoidingView,
  TouchableNativeFeedback
} from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'
import styles from './styles'
import { Button, Input, Avatar } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux'
import { UserState } from 'app/store/modules/user'
import Toast from 'react-native-root-toast'
interface LoginProps {
  navigation: NavigationStackProp
  user: UserState
  onLogin: (payload: any, cb: Function) => void
}
const Login: React.FC<LoginProps> = ({ navigation, user, onLogin }) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [userNameError, setUsernameError] = useState('')
  const [pwdError, setPwdError] = useState('')
  const [loading, setLoading] = useState(false)
  const refUsername = useRef(null)
  const refPwd = useRef(null)

  const validateField = (field: string) => {
    switch (field) {
      case 'userName': {
        setUsernameError(userName.length > 0 ? '' : '请输入用户名')
        if (!userName) {
          ;(refUsername.current as any).shake()
          return false
        }
        return true
      }
      case 'password': {
        setPwdError(password.length > 0 ? '' : '请输入密码')
        if (!password) {
          ;(refPwd.current as any).shake()
          return false
        }
        return true
      }
      default:
        return true
    }
  }

  const handleSubmit = () => {
    if (loading) return
    const valid = ['userName', 'password'].every(k => validateField(k))
    if (valid) {
      // 提交登陆
      setLoading(true)
      onLogin(
        {
          userName,
          password
        },
        (res: any) => {
          setLoading(false)
          console.log('res', res)
          if (res) {
            if (res.success) {
              Toast.show('登陆成功')
              navigation.navigate('Home')
            } else {
              Toast.show('登陆失败')
            }
          }
        }
      )
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>RNNote</Text>
        </View>
        <View style={styles.loginForm}>
          <Input
            ref={refUsername}
            leftIcon={
              <Avatar
                overlayContainerStyle={{ backgroundColor: '#ccc' }}
                rounded
                icon={{ name: 'ios-contact', type: 'ionicon', size: 30 }}
              />
            }
            placeholder="用户名"
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.input}
            containerStyle={styles.InputWrap}
            errorMessage={userNameError}
            onChangeText={setUserName}
            onSubmitEditing={() => {
              ;(refPwd.current as any).focus()
            }}
          />
          <Input
            ref={refPwd}
            leftIcon={
              <Avatar
                overlayContainerStyle={{ backgroundColor: '#ccc' }}
                rounded
                icon={{ name: 'ios-eye-off', type: 'ionicon', size: 30 }}
              />
            }
            placeholder="密码"
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.input}
            secureTextEntry
            onChangeText={setPassword}
            errorMessage={pwdError}
          />
        </View>
        <Button
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['blue', 'cyan'],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0.5 }
          }}
          icon={{ name: 'arrow-forward', color: '#fff', size: 25 }}
          buttonStyle={styles.loginButton}
          background={TouchableNativeFeedback.Ripple('#ccc', true)}
          onPress={handleSubmit}
          loading={loading}
        ></Button>
      </View>
      <View style={styles.bottomArea}>
        <View style={styles.otherButtons}>
          <TouchableHighlight
            onPress={() => {
              Alert.alert('无此功能')
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>忘记密码</Text>
          </TouchableHighlight>
          <View style={styles.line}></View>
          <TouchableHighlight>
            <Text style={{ fontWeight: 'bold' }}>用户注册</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<{ type: string; payload: any; cb: Function }>) => {
  return {
    onLogin: (payload: any, cb: Function) => dispatch({ type: 'user/login', payload, cb })
  }
}
const mapStateToProps = (state: { user: UserState }) => {
  const { user } = state
  return {
    user
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Login))
