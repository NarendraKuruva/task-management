import { ApisauceInstance, create } from 'apisauce'

import { apiMethods } from '../../../Common/constants/APIConstants'

import { API_KEY } from '../../constants/TaskManagementConstants'

import OrganizationsService from '.'

class OrganizationsServiceApi implements OrganizationsService {
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
   addOrganization = (name: string): Promise<any> => {
      const endpoint = `/organizations?key=${API_KEY}&token=${this.token}&displayName=${name}`
      return this.networkCallWithFetch(
         this.api,
         endpoint,
         { name: name },
         apiMethods.post
      )
   }

   getMemberOrganizationsData = (): Promise<any> => {
      const endpoint = `/members/6170edd83d0f3b3ebfa209e1/organizations/?key=${API_KEY}&token=${this.token}`
      return this.networkCallWithFetch(this.api, endpoint, {}, apiMethods.get)
   }
}

export default OrganizationsServiceApi
