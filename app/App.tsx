/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { lazy, Suspense } from 'react'
import Loading from './components/Loading'
import { Text, Dimensions } from 'react-native'

import { createDrawerNavigator } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { ThemeProvider } from 'react-native-elements'
import DrawerContent from './components/DrawerContent'
import AuthLoading from './views/AuthLoading'
import theme from './config/theme'
const usingHermes = typeof HermesInternal === 'object' && HermesInternal !== null

const AccountLazy = lazy(() => import('./views/Account'))
const BooksLazy = lazy(() => import('./views/Books'))
const HomeLazy = lazy(() => import('./views/Home'))
const LoginLazy = lazy(() => import('./views/Login'))
const RegisterLazy = lazy(() => import('./views/Register'))
const SettingsLazy = lazy(() => import('./views/Settings'))

const SuspenceHoc = (WrappedComponent: React.LazyExoticComponent<React.ComponentType<any>>) => (
  props: any
) => (
  <Suspense fallback={<Loading />}>
    <WrappedComponent {...props} />
  </Suspense>
)

const Account = SuspenceHoc(AccountLazy)
const Books = SuspenceHoc(BooksLazy)
const Home = SuspenceHoc(HomeLazy)
const Settings = SuspenceHoc(SettingsLazy)
const Login = SuspenceHoc(LoginLazy)
const Register = SuspenceHoc(RegisterLazy)

const WINDOW_WIDTH = Dimensions.get('window').width
const drawerWidth = Math.min(WINDOW_WIDTH * 0.8, 300)

const DrawerStack = createDrawerNavigator(
  {
    Home: Home,
    Books,
    Settings,
    Account
  },
  {
    initialRouteName: 'Home',
    // drawerWidth
    contentComponent: DrawerContent, //侧边栏列表内容，暂时空置
    drawerType: 'slide'
  }
)
/**
 * 主界面路由栈
 */
const HomeStack = createStackNavigator(
  {
    DrawerStack
  },
  {
    initialRouteName: 'DrawerStack',
    headerMode: 'none'
  }
)
// 登陆注册
const AuthStack = createStackNavigator(
  {
    Login,
    Register
  },
  {
    headerMode: 'none'
  }
)
console.log('【initapp】初始化路由')
const AppSwitchStack = createSwitchNavigator(
  {
    Home: HomeStack,
    Auth: AuthStack,
    AuthLoading // 中转登陆状态，也许可用首屏替代
  },
  {
    initialRouteName: 'AuthLoading'
  }
)
const AppContainer = createAppContainer(AppSwitchStack)
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer />
    </ThemeProvider>
  )
}

export default App
