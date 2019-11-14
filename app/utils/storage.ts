import AsyncStorage from '@react-native-community/async-storage'

class Storage {
  static set(key: string, value: any) {
    return AsyncStorage.setItem(key, JSON.stringify(value))
  }
  static async get(key: string, defaultValue = null) {
    try {
      const str = await AsyncStorage.getItem(key)
      if (str) {
        const json = JSON.parse(str)
        return json
      } else {
        return defaultValue
      }
    } catch (e) {
      console.error(e)
      return defaultValue
    }
  }
  static remove(key: string) {
    return AsyncStorage.removeItem(key)
  }
  //   更新值/object.assign
  static merge(key: string, value: any) {
    return AsyncStorage.mergeItem(key, value)
  }
  static clear() {
    return AsyncStorage.clear()
  }
  static getAllKeys() {
    return AsyncStorage.getAllKeys()
  }
  //   批量获取
  static async multiGet(keys: string[]) {
    try {
      const kvs = await AsyncStorage.multiGet(keys)
      if (kvs) {
        let res: any = {}
        for (let i = 0; i < kvs.length; i++) {
          let [k, v] = kvs[i]
          if (v) {
            try {
              res[k] = JSON.parse(v)
            } catch (e) {
              console.log(`multiget 时parse出错,key:${k}`)
              console.error(e)
              res[k] = null
            }
          } else {
            res[k] = null
          }
        }
        return res
      } else {
        return null
      }
    } catch (e) {
      console.error(e)
      return null
    }
  }
}

export default Storage
