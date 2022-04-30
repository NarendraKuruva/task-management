import { ApisauceInstance, create } from 'apisauce'

import { apiMethods } from '../../../Common/constants/APIConstants'

import { API_KEY } from '../../constants/TaskManagementConstants'

import ColumnsService from '.'

class ColumnsServiceApi implements ColumnsService {
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
   getBoardDetails = (boardId: string): Promise<any> => {
      const endpoint = `/boards/${boardId}/lists?key=${API_KEY}&token=${this.token}`
      return this.networkCallWithFetch(this.api, endpoint, {}, apiMethods.get)
   }
   updateColumnPosition = (listId: string, index: number): Promise<any> => {
      const endpoint = `/lists/${listId}/?key=${API_KEY}&token=${this.token}&pos=${index}`
      return this.networkCallWithFetch(
         this.api,
         endpoint,
         { pos: index },
         apiMethods.put
      )
   }

   addColumn = (name: string, boardId: string): Promise<any> => {
      const endpoint = `/boards/${boardId}/lists?key=${API_KEY}&token=${this.token}&name=${name}`
      return this.networkCallWithFetch(
         this.api,
         endpoint,
         { name: name },
         apiMethods.post
      )
   }

   getTasksInList = (listId: string): Promise<any> => {
      const endpoint = `/lists/${listId}/cards/?key=${API_KEY}&token=${this.token}`
      return this.networkCallWithFetch(this.api, endpoint, {}, apiMethods.get)
   }
   updateTaskPosition = (taskId: string, position: string): Promise<any> => {
      const endpoint = `/cards/${taskId}/?key=${API_KEY}&token=${this.token}&pos=${position}`
      return this.networkCallWithFetch(
         this.api,
         endpoint,
         { pos: position },
         apiMethods.put
      )
   }
   updateTaskList = (taskId: string, listId: string): Promise<any> => {
      const endpoint = `/cards/${taskId}/?key=${API_KEY}&token=${this.token}&idList=${listId}`
      return this.networkCallWithFetch(
         this.api,
         endpoint,
         { idList: listId },
         apiMethods.put
      )
   }
   addTask = (name: string, columnId: string): Promise<any> => {
      const endpoint = `/cards?key=${API_KEY}&token=${this.token}&name=${name}&idList=${columnId}`
      return this.networkCallWithFetch(
         this.api,
         endpoint,
         { name: name },
         apiMethods.post
      )
   }
}

export default ColumnsServiceApi
