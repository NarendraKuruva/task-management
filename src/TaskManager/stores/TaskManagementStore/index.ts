import React from 'react'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { action, observable } from 'mobx'

import TaskManagementService from '../../services/TaskManagementService'

import BoardModel from '../models/BoardModel'
import ColumnModel from '../models/ColumnModel'
import ProfileModel from '../models/ProfileModel'

class TaskManagementStore {
   organizationBoards!: BoardModel[]
   organizationBoardsApiStatus!: number
   boardColumns!: ColumnModel[]
   @observable tasksApiStatus!: number
   @observable organizationsApiStatus!: number
   @observable taskManagementService: TaskManagementService
   profileDetails!: ProfileModel
   constructor(taskManagementService: TaskManagementService) {
      this.profileDetails
      this.organizationBoards = []
      this.organizationBoardsApiStatus = 0
      this.taskManagementService = taskManagementService
      this.organizationsApiStatus = 0
      this.boardColumns = []
      this.tasksApiStatus = 0
   }

   @action.bound
   getMyProfileData(): Promise<any> {
      const organizationsPromiseObj = this.taskManagementService.getMyOrganizations()
      return bindPromiseWithOnSuccess(organizationsPromiseObj)
         .to(
            status => {
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
}

export default TaskManagementStore
