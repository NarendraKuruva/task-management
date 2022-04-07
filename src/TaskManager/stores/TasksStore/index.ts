import { action, observable } from 'mobx'
import TaskManagementService from '../../services/TaskManagementService'
import TaskModel from '../models/TaskModel'

class TasksStore {
   @observable tasksList!: TaskModel[]
   taskManagementService: TaskManagementService
   @observable taskNameInputVal!: string
   constructor(taskManagementService) {
      this.taskManagementService = taskManagementService
      this.tasksList = []
      this.taskNameInputVal = ''
   }

   @action.bound onChangeTaskNameInputVal = event => {
      this.taskNameInputVal = event.target.value
   }
}
export default TasksStore
