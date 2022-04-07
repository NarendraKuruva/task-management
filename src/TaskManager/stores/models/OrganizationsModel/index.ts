import { observable } from 'mobx'

class OrganizationModel {
   id!: string
   name!: string
   displayName!: string
   @observable boardsList?: string[]
   url!: string
   idMemberCreator!: string
   constructor(data) {
      this.id = data.id
      this.name = data.name
      this.displayName = data.displayName
      this.boardsList = data.idBoards
      this.url = data.url
      this.idMemberCreator = data.idMemberCreator
   }
}

export default OrganizationModel
