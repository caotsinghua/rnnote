import React from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { NavigationDrawerProp } from 'react-navigation-drawer'
import { Header, IconProps, HeaderIcon } from 'react-native-elements'
import routes from '../../config/routes'
import { name as appName } from '../../../app.json'
import { TextProps, Platform, TouchableNativeFeedback } from 'react-native'
import { withNavigation } from 'react-navigation'
export interface HeaderProps {
  leftType?: 'menu' | 'back'
  title?: string
  navigation: NavigationStackProp & NavigationDrawerProp
}

const AppHeader: React.FC<HeaderProps> = ({ navigation, title, leftType = 'menu' }) => {
  const {
    state: { routeName }
  } = navigation

  if (title === undefined) {
    const findRoute = routes.find(route => route.routeName === routeName)
    title = (findRoute && findRoute.name) || appName
  }
  const centerComponent: TextProps & { text: string } = {
    text: title,
    numberOfLines: 1,
    ellipsizeMode: 'tail'
  }

  let leftComponent: HeaderIcon & { onPress?: any; Component?: any; [key: string]: any } = {}
  switch (leftType) {
    case 'menu': {
      leftComponent = {
        icon: 'menu',
        onPress: () => {
          navigation.openDrawer()
        }
      }
      break
    }
    case 'back': {
      leftComponent = {
        icon: 'arrow-back',
        onPress: () => {
          navigation.goBack()
        }
      }
      break
    }
  }

  return (
    <Header
      placement="center"
      leftComponent={leftComponent}
      centerComponent={centerComponent}
    ></Header>
  )
}

export default withNavigation(React.memo(AppHeader))
