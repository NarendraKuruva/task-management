class ProfileModel {
   id!: string
   aaId!: string
   activityBlocked!: boolean
   avatarHash!: string
   avatarUrl!: string
   bio!: string
   bioData!: string | null
   confirmed!: boolean
   fullName!: string
   idEnterprise!: string | null
   initials!: string
   memberType!: string
   url!: string
   username!: string
   status!: string
   credentialsRemovedCount!: number
   email!: string
   idBoards!: string[]
   idOrganizations!: string[]
   constructor(data) {
      this.id = data.id
      this.aaId = data.aaId
      this.activityBlocked = data.activityBlocked
      this.avatarHash = data.avatarHash
      this.avatarUrl = data.avatarUrl
      this.bio = data.bio
      this.bioData = data.bioData
      this.confirmed = data.confirmed
      this.fullName = data.fullName
      this.idEnterprise = data.idEnterprise
      this.initials = data.initials
      this.memberType = data.memberType
      this.url = data.url
      this.username = data.username
      this.status = data.status
      this.credentialsRemovedCount = data.credentialsRemovedCount
      this.email = data.email
      this.idBoards = data.idBoards
      this.idOrganizations = data.idOrganizations
   }
}
export default ProfileModel
