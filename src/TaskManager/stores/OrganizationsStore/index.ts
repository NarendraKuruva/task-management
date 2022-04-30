import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { action, observable } from 'mobx'
import OrganizationsService from '../../services/OrganizationsService'
import OrganizationModel from '../models/OrganizationsModel'

class OrganizationsStore {
   @observable organizationsList!: Map<string, OrganizationModel>
   organizationsService!: OrganizationsService
   @observable organizationsApiStatus!: number
   activeOrganizationId!: string
   @observable organizationBoardsApiStatus!: number
   constructor(organizationsService: OrganizationsService) {
      this.organizationsList = new Map()
      this.organizationsService = organizationsService
      this.organizationsApiStatus = 0
      this.activeOrganizationId = ''
      this.organizationBoardsApiStatus = 0
   }

   @action.bound
   getMemberOrganizations(): Promise<any> {
      this.organizationsApiStatus = 0
      const AllOrganizationsPromiseObj = this.organizationsService.getMemberOrganizationsData()
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

   @action.bound
   setActiveOrganization(organization): void {
      this.activeOrganizationId = organization
   }

   @action.bound addOrganization(name: string): Promise<any> {
      const newOrganizationResponse = this.organizationsService.addOrganization(
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
