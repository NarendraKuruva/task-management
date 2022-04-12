import { ApisauceInstance, create } from 'apisauce'
import { apiMethods } from '../../../Common/constants/APIConstants'
import { API_KEY } from '../../constants/TaskManagementConstants'
import BoardsService from '.'

class BoardsServiceApi implements BoardsService {
   networkCallWithFetch: (
      api: any,
      url: string,
      requestObject: Record<string, any>,
      type?: any
   ) => Promise<any>
   api: ApisauceInstance
   AppBaseUrl!: string
   token!: string
   constructor(networkCallWithFetch) {
      this.networkCallWithFetch = networkCallWithFetch
      this.api = create({ baseURL: 'https://trello.com/1' })
      this.AppBaseUrl = this.api.getBaseURL()
      const LocalToken = localStorage.getItem('pa_token') || ''
      this.token = LocalToken
   }

   getBoardsInOrganization = (organizationId: string): Promise<any> => {
      const endpoint = `/organizations/${organizationId}/boards?key=${API_KEY}&token=${this.token}`
      return this.networkCallWithFetch(this.api, endpoint, {}, apiMethods.get)
   }

   addBoard = (name: string, idOrganization: string): Promise<any> => {
      const endpoint = `/boards?key=${API_KEY}&token=${this.token}&name=${name}`
      return this.networkCallWithFetch(
         this.api,
         endpoint,
         { name: name, idOrganization: idOrganization },
         apiMethods.post
      )
   }
}

export default BoardsServiceApi
