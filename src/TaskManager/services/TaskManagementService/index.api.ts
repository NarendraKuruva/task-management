import { ApisauceInstance, create } from 'apisauce'
import { apiMethods } from '../../../Common/constants/APIConstants'
import { API_KEY } from '../../constants/TaskManagementConstants'
import TaskManagementService from '.'

class TaskManagementServiceApi implements TaskManagementService {
   networkCallWithFetch: any
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
   getMyOrganizations(): Promise<any> {
      const endpoint = `/members/me?key=${API_KEY}&token=${this.token}`
      return this.networkCallWithFetch(this.api, endpoint, {}, apiMethods.get)
   }
   getMemberOrganizationsData(): Promise<any> {
      const endpoint = `/members/6170edd83d0f3b3ebfa209e1/organizations/?key=${API_KEY}&token=${this.token}`
      return this.networkCallWithFetch(this.api, endpoint, {}, apiMethods.get)
   }
   getBoardsInOrganization(organizationId: string): Promise<any> {
      const endpoint = `/organizations/${organizationId}/boards?key=${API_KEY}&token=${this.token}`
      return this.networkCallWithFetch(this.api, endpoint, {}, apiMethods.get)
   }
   getBoardDetails(boardId: string) {
      const endpoint = `/boards/${boardId}/lists?key=${API_KEY}&token=${this.token}`
      return this.networkCallWithFetch(this.api, endpoint, {}, apiMethods.get)
   }

   addBoard(name: string, idOrganization: string) {
      const endpoint = `/boards?key=${API_KEY}&token=${this.token}&name=${name}`
      return this.networkCallWithFetch(
         this.api,
         endpoint,
         { name: name, idOrganization: idOrganization },
         apiMethods.post
      )
   }
   addOrganization(name: string) {
      const endpoint = `/organizations?key=${API_KEY}&token=${this.token}&displayName=${name}`
      return this.networkCallWithFetch(
         this.api,
         endpoint,
         { name: name },
         apiMethods.post
      )
   }
   addColumn(name: string, boardId: string) {
      const endpoint = `/boards/${boardId}/lists?key=${API_KEY}&token=${this.token}&name=${name}`
      return this.networkCallWithFetch(
         this.api,
         endpoint,
         { name: name },
         apiMethods.post
      )
   }
   addTask(name: string, columnId: string) {
      const endpoint = `/cards?key=${API_KEY}&token=${this.token}&name=${name}&idList=${columnId}`
      return this.networkCallWithFetch(
         this.api,
         endpoint,
         { name: name },
         apiMethods.post
      )
   }
   getTasksInList(listId: string) {
      const endpoint = `/lists/${listId}/cards/?key=${API_KEY}&token=${this.token}`
      return this.networkCallWithFetch(this.api, endpoint, {}, apiMethods.get)
   }
   updateColumnPosition(listId: string, index: number) {
      const endpoint = `/lists/${listId}/?key=${API_KEY}&token=${this.token}&pos=${index}`
      return this.networkCallWithFetch(
         this.api,
         endpoint,
         { pos: index },
         apiMethods.put
      )
   }
   updateTaskPosition(taskId: string, position: string) {
      const endpoint = `/cards/${taskId}/?key=${API_KEY}&token=${this.token}&pos=${position}`
      return this.networkCallWithFetch(
         this.api,
         endpoint,
         { pos: position },
         apiMethods.put
      )
   }

   updateTaskList(taskId: string, listId: string) {
      const endpoint = `/cards/${taskId}/?key=${API_KEY}&token=${this.token}&idList=${listId}`
      return this.networkCallWithFetch(
         this.api,
         endpoint,
         { idList: listId },
         apiMethods.put
      )
   }
}

export default TaskManagementServiceApi
