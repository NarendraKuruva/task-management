import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { action, observable } from 'mobx'
import TaskManagementService from '../../services/TaskManagementService'
import OrganizationModel from '../models/OrganizationsModel'

class OrganizationsStore {
   @observable organizationsList!: Map<string, OrganizationModel>
   taskManagementService!: TaskManagementService
   @observable organizationsApiStatus!: number
   activeOrganizationId!: string
   @observable organizationBoardsApiStatus!: number
   constructor(taskManagementService) {
      this.organizationsList = new Map()
      this.taskManagementService = taskManagementService
      this.organizationsApiStatus = 0
      this.activeOrganizationId = ''
      this.organizationBoardsApiStatus = 0
   }

   @action.bound getMemberOrganizations() {
      this.organizationsApiStatus = 0
      const AllOrganizationsPromiseObj = this.taskManagementService.getMemberOrganizationsData()
      return bindPromiseWithOnSuccess(AllOrganizationsPromiseObj)
         .to(
            status => {
               this.organizationsApiStatus = status
            },
            response => {
               if (!response) return
               response.map(eachOrganization =>
                  this.organizationsList.set(
                     eachOrganization.id,
                     new OrganizationModel(eachOrganization)
                  )
               )
            }
         )
         .catch(error => {
            alert(error)
         })
   }

   @action.bound setActiveOrganization(organization) {
      this.activeOrganizationId = organization
   }

   @action.bound getOrganizationBoards(
      organizationId: string,
      onSuccessCallMethod
   ) {
      this.organizationBoardsApiStatus = 0
      const OrganizationsBoardsPromiseObj = this.taskManagementService.getBoardsInOrganization(
         organizationId
      )

      return bindPromiseWithOnSuccess(OrganizationsBoardsPromiseObj)
         .to(
            status => {
               this.organizationBoardsApiStatus = status
            },
            response => {
               if (!response) return

               const updatedBoardsList = response.map(eachBoard => eachBoard.id)
               this.organizationsList[
                  organizationId
               ].boardsList = updatedBoardsList
               onSuccessCallMethod()
            }
         )
         .catch(error => {
            alert(error)
         })
   }
   @action.bound addOrganization(name: string) {
      const newOrganizationResponse = this.taskManagementService.addOrganization(
         name
      )
      return bindPromiseWithOnSuccess(newOrganizationResponse)
         .to(
            status => {
               console.log()
            },
            response => {
               if (!response) return
               this.organizationsList.set(
                  response.id,
                  new OrganizationModel(response)
               )
            }
         )
         .catch(error => {
            alert(error)
         })
   }
}
export default OrganizationsStore

// `{
//    "id": "624ec409abfe2536c1787f71",
//    "name": "addorganizationtesting",
//    "displayName": "Add Organization Testing",
//    "desc": "",
//    "descData": {
//        "emoji": {}
//    },
//    "url": "https://trello.com/addorganizationtesting",
//    "website": null,
//    "teamType": null,
//    "logoHash": null,
//    "logoUrl": null,
//    "products": [],
//    "powerUps": [],
//    "idMemberCreator": "6170edd83d0f3b3ebfa209e1",
//    "limits": {}
// }`
