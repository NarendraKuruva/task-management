import TaskManagementStore from '../../TaskManager/stores/TaskManagementStore'
import OrganizationsStore from '../../TaskManager/stores/OrganizationsStore'
import { networkCallWithFetch } from '../utils/APIUtils'
import TaskManagementServiceApi from '../../TaskManager/services/TaskManagementService/index.api'
import CounterStore from './CounterStore'

const taskManagementService = new TaskManagementServiceApi(networkCallWithFetch)
const counterStore = new CounterStore()
const taskManagementStore = new TaskManagementStore(taskManagementService)
const organizationsStore = new OrganizationsStore(taskManagementService)

export default {
   counterStore,
   taskManagementStore,
   organizationsStore
}
