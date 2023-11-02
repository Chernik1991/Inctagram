export type BaseResponseType<D = {}> = {
  extensions: {
    key: string
    message: string | Message[]
  }[]
  data: D
  resultCode: number
}
export type Message = {
  message: string
  field: string
}
