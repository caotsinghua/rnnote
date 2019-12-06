export interface Payload<T = any> {
  callback?: Function
  [key: string]: T | Function | undefined
}
