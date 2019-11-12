export interface MyRoute {
  name: string
  routeName: string
  icon?: string
  inDrawer: boolean // 是否在抽屉里
}
// 主要是侧边栏的菜单
const routes: MyRoute[] = [
  {
    name: '所有笔记',
    routeName: 'Home',
    icon: 'note',
    inDrawer: true
  },
  {
    name: '笔记本',
    routeName: 'Books',
    icon: 'book',
    inDrawer: true
  },
  {
    name: '账户',
    routeName: 'Account',
    icon: 'account-box',
    inDrawer: true
  },
  {
    name: '设置',
    routeName: 'Settings',
    icon: 'settings',
    inDrawer: true
  },
  {
    name: '登陆',
    routeName: 'Login',
    inDrawer: false
  },
  {
    name: '注册',
    routeName: 'Register',
    inDrawer: false
  }
]

export default routes
