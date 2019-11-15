- rn 0.61.4
- react-native-elements
- react-navigation ...
- redux, saga

### 这个 demo 需要什么界面

[x] 登陆
[] 注册
[] 笔记本列表(添加查询),
[] 笔记列表(添加查询)，
[] 新建/编辑/预览笔记界面
[] 账户资料
[] 设置

### 功能点
1. 登陆，注册，退出登陆；asyncStorage存储登陆态，不登陆无法使用
2. 笔记本和笔记的增删改查
3. 账户资料修改（头像，昵称，密码）
4. 设置里如主题修改，暂时没必要

### 状态管理
redux和saga的模式可以借鉴dva的做法。
目前结构如下
```
- store
  - modules
    - index
    - module1...
  - index
  - rootSagas

//每个module
export const namespace='moduleName'
export function moduleReducer()
export const effects={}
```
每个module导出reducer和effects和模块名，在rootSagas得到所有effect，并设saga的action.type为 moduleName/effectName，进行监听。
应该改成这样
```
{
    state:{},
    reducers:{
        add(state,payload){

        }
    },
    effects:{
        *f({put,call},payload){

        }
    }
}
```
