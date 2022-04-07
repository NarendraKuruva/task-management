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
   @observable organizations!: OrganizationModel[]
   @observable activeOrganization!: string
   @observable organizationBoards!: BoardModel[]
   @observable organizationBoardsApiStatus!: number
   @observable boardColumns!: ColumnModel[]
   @observable tasksApiStatus!: number
   @observable organizationsApiStatus!: number
   @observable taskManagementService: TaskManagementService
   @observable boardNameInputVal!: string
   @observable organizationInputVal!: string
   @observable columnNameInputVal!: string
   @observable taskNameInputVal!: string
   profileDetails!: ProfileModel
   constructor(taskManagementService) {
      this.profileDetails
      this.organizations = []
      this.activeOrganization = ''
      this.organizationBoards = []
      this.organizationBoardsApiStatus = 0
      this.taskManagementService = taskManagementService
      this.organizationsApiStatus = 0
      this.boardColumns = []
      this.boardNameInputVal = ''
      this.organizationInputVal = ''
      this.columnNameInputVal = ''
      this.taskNameInputVal = ''
      this.tasksApiStatus = 0
   }
   @action.bound onChangeOrganizationInput = event => {
      this.organizationInputVal = event.target.value
   }
   @action.bound onChangeBoardInput = event => {
      this.boardNameInputVal = event.target.value
   }
   @action.bound setInputValueEmpty = () => {
      this.boardNameInputVal = ''
      this.organizationInputVal = ''
      this.columnNameInputVal = ''
      this.taskNameInputVal = ''
   }
   @action.bound onChangeColumnNameInput = event => {
      this.columnNameInputVal = event.target.value
   }
   @action.bound onChangeTaskNameInputVal = event => {
      this.taskNameInputVal = event.target.value
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
               const UpdatedOrganizations = response.map(
                  eachOrganization => new OrganizationModel(eachOrganization)
               )
               this.organizations = UpdatedOrganizations
            }
         )
         .catch(error => {
            console.log(error)
         })
   }

   @action.bound setActiveOrganization(organization) {
      this.activeOrganization = organization
   }

   @action.bound getMyProfileData = () => {
      const organizationsPromiseObj = this.taskManagementService.getMyOrganizations()
      return bindPromiseWithOnSuccess(organizationsPromiseObj)
         .to(
            status => {
               // this.organizationsApiStatus = status
               console.log(status)
            },
            response => {
               console.log(response)
               if (!response) return
               console.log(response)
               this.profileDetails = new ProfileModel(response)
               console.log(this.profileDetails)
               // const updatedOrgs = response.idOrganizations.map(
               //    eachOrganization => new OrganizationModel(eachOrganization)
               // )
               // this.organizations = updatedOrgs
            }
         )
         .catch(error => {
            console.log(error)
         })
   }

   @action.bound getOrganizationBoards(organizationId: string) {
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
               const updatedBoards = response.map(
                  eachBoard => new BoardModel(eachBoard)
               )
               this.organizationBoards = updatedBoards
            }
         )
         .catch(error => {
            console.log(error)
         })
   }
   @action.bound getTasksInList(id: string) {
      this.tasksApiStatus = 0
      const ListCardsPromiseObj = this.taskManagementService.getTasksInList(id)
      return bindPromiseWithOnSuccess(ListCardsPromiseObj)
         .to(
            status => {
               this.tasksApiStatus = status
            },
            response => {
               if (!response) return
               const tasksInGivenList = response.map(
                  eachTask => new TaskModel(eachTask)
               )
               const colIndex = this.boardColumns.findIndex(
                  each => each.id === id
               )
               const column = this.boardColumns[colIndex]
               column.tasksInList = tasksInGivenList
               {
                  for (const each of column.tasksInList) {
                     column.tasksMap.set(each.id, each)
                  }
               }
               return tasksInGivenList
            }
         )
         .catch(error => {
            console.log(error)
         })
   }
   @action.bound updateTasksInList(listId: string, updatedList) {
      for (const eachCol of this.boardColumns) {
         if (eachCol.id === listId) {
            eachCol.tasksInList = updatedList
         }
      }
   }
   @action.bound getBoardDetails(boardId: string) {
      const BoardDetailsPromiseObj = this.taskManagementService.getBoardDetails(
         boardId
      )
      return bindPromiseWithOnSuccess(BoardDetailsPromiseObj)
         .to(
            status => {
               // this.organizationsApiStatus = status
               console.log(status)
            },
            response => {
               if (!response) return
               const updatedBoardColumns = response.map(
                  eachColumn => new ColumnModel(eachColumn)
               )
               this.boardColumns = updatedBoardColumns
               {
                  for (const each of updatedBoardColumns) {
                     this.getTasksInList(each.id)
                  }
               }
            }
         )
         .catch(error => {
            console.log(error)
         })
   }
   @action.bound updateColumnOrder(boardColumns) {
      this.boardColumns = boardColumns
   }
   @action.bound addBoard(name: string, idOrganization: string) {
      this.taskManagementService.addBoard(name, idOrganization)
   }
   @action.bound addOrganization(name: string) {
      this.taskManagementService.addOrganization(name)
   }
   @action.bound addColumn(name: string, boardId: string) {
      this.taskManagementService.addColumn(name, boardId)
   }
   @action.bound addTask(name: string, columnId: string) {
      this.taskManagementService.addTask(name, columnId)
   }
   @action.bound updateColumnPosition(listId, index) {
      this.taskManagementService.updateColumnPosition(listId, index)
   }
   @action.bound updateTaskPosition(taskId: string, position: string) {
      this.taskManagementService.updateTaskPosition(taskId, position)
   }
   @action.bound updateTaskList(taskId: string, listId: string) {
      this.taskManagementService.updateTaskList(taskId, listId)
   }
}

export default TaskManagementStore
