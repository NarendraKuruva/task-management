import { action, observable } from 'mobx'
import TaskManagementService from '../../services/TaskManagementService'
import TaskModel from '../models/TaskModel'

class TasksStore {
   @observable tasksList!: TaskModel[]
   taskManagementService: TaskManagementService
   constructor(taskManagementService) {
      this.taskManagementService = taskManagementService
      this.tasksList = []
   }
}
export default TasksStore
