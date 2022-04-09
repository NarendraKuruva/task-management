import { observable } from 'mobx'
import TaskManagementService from '../../../services/TaskManagementService'
import TaskModel from '../TaskModel'

class ColumnModel {
   id!: string
   columnName!: string
   service!: TaskManagementService
   closed!: boolean
   idBoard!: string
   pos!: number
   subscribed!: boolean
   @observable tasksInList!: TaskModel[]
   @observable tasksMap!: Map<string, TaskModel>
   @observable tasksListApiStatus!: number
   constructor(data) {
      this.id = data.id
      this.columnName = data.name
      this.closed = false
      this.idBoard = data.idBoard
      this.pos = data.pos
      this.subscribed = data.subscribed
      this.tasksInList = []
      this.tasksMap = new Map()
      this.tasksListApiStatus = 0
   }
}
export default ColumnModel
