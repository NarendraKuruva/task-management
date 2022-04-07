import { observable } from 'mobx'

class TaskModel {
   id!: string

   closed!: boolean
   idBoard!: string
   @observable idList!: string
   idShort!: number
   name!: string
   @observable pos!: number
   shortLink!: string
   shortUrl!: string
   subscribed!: boolean
   url!: string
   constructor(data) {
      this.id = data.id
      this.closed = data.closed
      this.idBoard = data.idBoard
      this.idList = data.idList
      this.idShort = data.idShort
      this.name = data.name
      this.pos = data.pos
      this.shortLink = data.shortLink
      this.shortUrl = data.shortUrl
      this.subscribed = data.subscribed
      this.url = data.url
   }
}

export default TaskModel
