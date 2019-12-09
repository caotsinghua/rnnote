import React, { ReactComponentElement, ReactElement } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { NavigationDrawerProp } from 'react-navigation-drawer'
import { Header, IconProps, HeaderIcon, SearchBar } from 'react-native-elements'
import routes from '../../config/routes'
import { name as appName } from '../../../app.json'
import { TextProps, Platform, TouchableNativeFeedback, TouchableHighlight } from 'react-native'
import { withNavigation } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient'

export interface HeaderProps {
  leftType?: 'menu' | 'back'
  leftComponent?: ReactElement
  title?: string
  navigation: NavigationStackProp & NavigationDrawerProp
}

type HeaderLeftComponent =
  | (HeaderIcon & { onPress?: any; Component?: any; [key: string]: any })
  | ReactElement

const AppHeader: React.FC<HeaderProps> = ({
  navigation,
  title,
  leftType = 'menu',
  leftComponent
}) => {
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
    ellipsizeMode: 'tail',
    style: {
      color: '#fff'
    }
  }

  let headerLeft: HeaderLeftComponent = leftComponent ? leftComponent : {}
  if (!leftComponent) {
    switch (leftType) {
      case 'menu': {
        headerLeft = {
          icon: 'menu',
          onPress: () => {
            navigation.openDrawer()
          },
          color: '#fff',
          background: TouchableNativeFeedback.Ripple('#fff', false),
          Component: TouchableNativeFeedback
        }
        break
      }
      case 'back': {
        headerLeft = {
          icon: 'arrow-back',
          onPress: () => {
            navigation.goBack()
          },
          color: '#fff'
        }
        break
      }
    }
  }

  return (
    <Header
      placement="left"
      leftComponent={headerLeft}
      centerComponent={centerComponent}
      ViewComponent={LinearGradient}
      linearGradientProps={{
        colors: ['#6b52ae', '#2089dc'],
        start: { x: 0, y: 0.5 },
        end: { x: 1, y: 0.5 }
      }}
    ></Header>
  )
}

export default withNavigation(React.memo(AppHeader))
