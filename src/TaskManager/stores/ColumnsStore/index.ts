import { action, observable } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import ColumnsService from '../../services/ColumnsService'

import ColumnModel from '../models/ColumnModel'
import TaskModel from '../models/TaskModel'

class ColumnsStore {
   @observable columnsList!: Map<string, ColumnModel>
   @observable columnIdsList!: string[]
   columnsService!: ColumnsService
   @observable columnsListApiStatus!: number
   @observable tasksApiStatus!: number
   constructor(columnsService: ColumnsService) {
      this.columnsList = new Map()
      this.columnIdsList = []
      this.columnsService = columnsService
      this.columnsListApiStatus = 0
      this.tasksApiStatus = 0
   }

   @action.bound
   getBoardColumns(boardId: string): Promise<any> {
      this.columnsList.clear()
      const boardDetailsPromiseObj = this.columnsService.getBoardDetails(
         boardId
      )
      return bindPromiseWithOnSuccess(boardDetailsPromiseObj)
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

   @action.bound
   updateColumnPosition(listId: string, position): void {
      this.columnsService.updateColumnPosition(listId, position)
   }

   @action.bound
   updateColumnOrder(columnsList: Map<string, ColumnModel>): void {
      this.columnsList = columnsList
   }

   @action.bound
   getTasksInList(id: string): Promise<any> | undefined {
      const listCardsPromiseObj = this.columnsService.getTasksInList(id)
      const givenColumn = this.columnsList.get(id)
      if (givenColumn !== undefined) {
         givenColumn.tasksListApiStatus = 0
         givenColumn.tasksMap.clear()
         return bindPromiseWithOnSuccess(listCardsPromiseObj)
            .to(
               status => {
                  givenColumn.tasksListApiStatus = status
               },
               response => {
                  if (!response) return
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

   @action.bound
   updateTasksInList(
      listId: string,
      updatedList: Map<string, TaskModel>
   ): void {
      const listToUpdate = this.columnsList.get(listId)
      if (listToUpdate === undefined) {
         return
      }
      listToUpdate.tasksMap = updatedList
   }

   @action.bound
   updateTaskPosition(taskId: string, position: string): void {
      this.columnsService.updateTaskPosition(taskId, position)
   }

   @action.bound
   updateTaskList(taskId: string, listId: string): void {
      this.columnsService.updateTaskList(taskId, listId)
   }

   @action.bound
   addTask(name: string, columnId: string): Promise<any> | undefined {
      const addTaskPromiseObj = this.columnsService.addTask(name, columnId)

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
   @action.bound
   addColumn(name: string, boardId: string): Promise<any> {
      const addColumnPromiseObj = this.columnsService.addColumn(name, boardId)

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
