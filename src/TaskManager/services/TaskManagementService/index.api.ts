import { ApisauceInstance, create } from 'apisauce'
import { apiMethods } from '../../../Common/constants/APIConstants'
import { API_KEY } from '../../constants/TaskManagementConstants'
import TaskManagementService from '.'

class TaskManagementServiceApi implements TaskManagementService {
   networkCallWithFetch: (
      api: any,
      url: string,
      requestObject: Record<string, any>,
      type?: any
   ) => Promise<any>
   api: ApisauceInstance
   AppBaseUrl: string
   token!: string
   constructor(networkCallWithFetch) {
      this.networkCallWithFetch = networkCallWithFetch
      this.api = create({ baseURL: 'https://trello.com/1' })
      this.AppBaseUrl = this.api.getBaseURL()
      const LocalToken = localStorage.getItem('pa_token') || ''
      this.token = LocalToken
   }

   getMyOrganizations = (): Promise<any> => {
      const endpoint = `/members/me?key=${API_KEY}&token=${this.token}`
      return this.networkCallWithFetch(this.api, endpoint, {}, apiMethods.get)
   }
   getMemberOrganizationsData = (): Promise<any> => {
      const endpoint = `/members/6170edd83d0f3b3ebfa209e1/organizations/?key=${API_KEY}&token=${this.token}`
      return this.networkCallWithFetch(this.api, endpoint, {}, apiMethods.get)
   }
}

export default TaskManagementServiceApi
