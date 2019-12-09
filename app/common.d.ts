export interface Payload<T = any> {
  [key: string]: T | Function | undefined
}
