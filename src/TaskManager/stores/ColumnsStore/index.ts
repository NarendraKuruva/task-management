import { action, observable } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import TaskManagementService from '../../services/TaskManagementService'
import ColumnModel from '../models/ColumnModel'
import TaskModel from '../models/TaskModel'

class ColumnsStore {
   @observable columnsList!: Map<string, ColumnModel>
   @observable columnIdsList!: string[]
   taskManagementService!: TaskManagementService
   @observable columnsListApiStatus!: number
   @observable tasksApiStatus!: number
   constructor(taskManagementService) {
      this.columnsList = new Map()
      this.columnIdsList = []
      this.taskManagementService = taskManagementService
      this.columnsListApiStatus = 0
      this.tasksApiStatus = 0
   }

   @action.bound getBoardColumns(boardId: string) {
      this.columnsList.clear()
      // this.columnIdsList = []
      const BoardDetailsPromiseObj = this.taskManagementService.getBoardDetails(
         boardId
      )
      return bindPromiseWithOnSuccess(BoardDetailsPromiseObj)
         .to(
            status => {
               this.columnsListApiStatus = status
            },
            response => {
               if (!response) return
               response.map(eachColumn => {
                  this.columnsList.set(
                     eachColumn.id,
                     new ColumnModel(eachColumn)
                  )
                  this.columnIdsList.push(eachColumn.id)
               })
               const columnsArray = Array.from(this.columnsList.values())
               columnsArray.map(each => this.getTasksInList(each.id))
            }
         )
         .catch(error => {
            alert(error)
         })
   }

   @action.bound updateColumnPosition(listId, position) {
      this.taskManagementService.updateColumnPosition(listId, position)
   }
   @action.bound updateColumnOrder(columnsList) {
      this.columnsList = columnsList
   }
   @action.bound getTasksInList(id: string) {
      const ListCardsPromiseObj = this.taskManagementService.getTasksInList(id)

      const givenColumn = this.columnsList.get(id)
      if (givenColumn !== undefined) {
         givenColumn.tasksListApiStatus = 0
         givenColumn.tasksMap.clear()
         return bindPromiseWithOnSuccess(ListCardsPromiseObj)
            .to(
               status => {
                  givenColumn.tasksListApiStatus = status
               },
               response => {
                  if (!response) return
                  const a = new Map()
                  response.map(eachTask =>
                     givenColumn.tasksMap.set(
                        eachTask.id,
                        new TaskModel(eachTask)
                     )
                  )
               }
            )
            .catch(error => {
               alert(error)
            })
      }
   }

   @action.bound updateTasksInList(listId: string, updatedList) {
      const listToUpdate = this.columnsList.get(listId)
      if (listToUpdate === undefined) {
         return
      }
      listToUpdate.tasksMap = updatedList
   }
   @action.bound updateTaskPosition(taskId: string, position: string) {
      this.taskManagementService.updateTaskPosition(taskId, position)
   }
   @action.bound updateTaskList(taskId: string, listId: string) {
      this.taskManagementService.updateTaskList(taskId, listId)
   }

   @action.bound addTask(name: string, columnId: string) {
      const addTaskPromiseObj = this.taskManagementService.addTask(
         name,
         columnId
      )
      const columnToAddTask = this.columnsList.get(columnId)
      if (columnToAddTask === undefined) {
         return
      }
      return bindPromiseWithOnSuccess(addTaskPromiseObj)
         .to(
            status => {
               columnToAddTask.tasksListApiStatus = status
            },
            response => {
               if (!response) return
               columnToAddTask.tasksMap.set(
                  response.id,
                  new TaskModel(response)
               )
            }
         )
         .catch(error => {
            alert(error)
         })
   }
   @action.bound addColumn(name: string, boardId: string) {
      const addColumnPromiseObj = this.taskManagementService.addColumn(
         name,
         boardId
      )
      return bindPromiseWithOnSuccess(addColumnPromiseObj)
         .to(
            status => {
               // this.columnsListApiStatus = status
            },
            response => {
               if (!response) return
               this.columnsList.set(response.id, new ColumnModel(response))
               this.columnIdsList.push(response.id)
            }
         )
         .catch(error => {
            alert(error)
         })
   }
}
export default ColumnsStore
