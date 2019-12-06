import React, { useCallback } from 'react'
import { SafeAreaView, ScrollView, withNavigation } from 'react-navigation'
import styles from './style'
import { View, Alert, StyleSheet } from 'react-native'
import { Avatar, ListItem, Icon, Text } from 'react-native-elements'
import routes from '../../config/routes'
import { DrawerContentComponentProps } from 'react-navigation-drawer'

const DrawerContent: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  const handleListItemPress = useCallback((routeName: string) => {
    return () => {
      //   Alert.alert('跳转' + routeName)
      navigation.navigate(routeName)
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userBar}>
        <Avatar rounded icon={{ name: 'user', type: 'font-awesome' }} size="medium"></Avatar>
        <View style={styles.userInfo}>
          <Text>用户名</Text>
        </View>
      </View>
      <ScrollView>
        {routes
          .filter(r => r.inDrawer)
          .map((route, idx) => {
            return (
              <ListItem
                key={idx}
                title={route.name}
                leftIcon={{ name: route.icon }}
                bottomDivider
                onPress={handleListItemPress(route.routeName)}
                // style={StyleSheet.flatten([route.routeName===navigation.state.])}
              ></ListItem>
            )
          })}
      </ScrollView>
      <ListItem title="同步" leftIcon={<Icon name="sync" />} />
    </SafeAreaView>
  )
}

export default React.memo(DrawerContent)
