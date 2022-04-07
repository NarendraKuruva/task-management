import { action, observable } from 'mobx'
import TaskManagementService from '../../services/TaskManagementService'
import ColumnModel from '../models/ColumnModel'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import TaskModel from '../models/TaskModel'

class ColumnsStore {
   @observable columnsList!: Map<string, ColumnModel>
   taskManagementService!: TaskManagementService
   @observable tasksApiStatus!: number
   constructor(taskManagementService) {
      this.columnsList = new Map()
      this.taskManagementService = taskManagementService
   }

   @action.bound addColumn(name: string, boardId: string) {
      this.taskManagementService.addColumn(name, boardId)
   }
   @action.bound updateColumnPosition(listId, index) {
      this.taskManagementService.updateColumnPosition(listId, index)
   }
   @action.bound updateColumnOrder(boardColumns) {
      this.columnsList = boardColumns
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
               // return tasksInGivenList
            }
         )
         .catch(error => {
            console.log(error)
         })
   }
}
export default ColumnsStore
