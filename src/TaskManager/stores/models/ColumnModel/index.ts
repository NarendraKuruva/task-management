import { observable } from 'mobx'
import { networkCallWithFetch } from '../../../../Common/utils/APIUtils'
import TaskManagementService from '../../../services/TaskManagementService'
import TaskManagementServiceApi from '../../../services/TaskManagementService/index.api'
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
   tasksMap!: Map<string, TaskModel>
   constructor(data) {
      this.id = data.id
      this.columnName = data.name
      this.closed = false
      this.idBoard = data.idBoard
      this.pos = data.pos
      this.subscribed = data.subscribed
      this.tasksInList = []
      this.tasksMap = new Map()
   }
}
export default ColumnModel
