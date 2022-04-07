class BoardModel {
   id!: string
   name!: string
   idOrganization!: string
   url!: string

   constructor(data) {
      this.id = data.id
      this.name = data.name
      this.idOrganization = data.idOrganization
      this.url = data.url
   }
}
export default BoardModel
