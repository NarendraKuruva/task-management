import React from 'react'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { action, observable } from 'mobx'
import TaskManagementService from '../../services/TaskManagementService'
import OrganizationModel from '../models/OrganizationsModel'
import BoardModel from '../models/BoardModel'
import ColumnModel from '../models/ColumnModel'
import TaskModel from '../models/TaskModel'
import ProfileModel from '../models/ProfileModel'

class TaskManagementStore {
   organizationBoards!: BoardModel[]
   organizationBoardsApiStatus!: number
   boardColumns!: ColumnModel[]
   @observable tasksApiStatus!: number
   @observable organizationsApiStatus!: number
   @observable taskManagementService: TaskManagementService
   profileDetails!: ProfileModel
   constructor(taskManagementService) {
      this.profileDetails
      this.organizationBoards = []
      this.organizationBoardsApiStatus = 0
      this.taskManagementService = taskManagementService
      this.organizationsApiStatus = 0
      this.boardColumns = []
      this.tasksApiStatus = 0
   }

   @action.bound getMyProfileData = () => {
      const organizationsPromiseObj = this.taskManagementService.getMyOrganizations()
      return bindPromiseWithOnSuccess(organizationsPromiseObj)
         .to(
            status => {
               // this.organizationsApiStatus = status
               console.log()
            },
            response => {
               if (!response) return
               this.profileDetails = new ProfileModel(response)
            }
         )
         .catch(error => {
            alert(error)
         })
   }

   @action.bound addTask(name: string, columnId: string) {
      this.taskManagementService.addTask(name, columnId)
   }
}

export default TaskManagementStore
