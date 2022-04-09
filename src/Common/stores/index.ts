import TaskManagementStore from '../../TaskManager/stores/TaskManagementStore'
import OrganizationsStore from '../../TaskManager/stores/OrganizationsStore'
import { networkCallWithFetch } from '../utils/APIUtils'
import TaskManagementServiceApi from '../../TaskManager/services/TaskManagementService/index.api'
import BoardsStore from '../../TaskManager/stores/BoardsStore'
import ColumnsStore from '../../TaskManager/stores/ColumnsStore'
import CounterStore from './CounterStore'

const taskManagementService = new TaskManagementServiceApi(networkCallWithFetch)
const counterStore = new CounterStore()
const taskManagementStore = new TaskManagementStore(taskManagementService)
const organizationsStore = new OrganizationsStore(taskManagementService)
const boardsStore = new BoardsStore(taskManagementService)
const columnsStore = new ColumnsStore(taskManagementService)
export default {
   counterStore,
   taskManagementStore,
   organizationsStore,
   boardsStore,
   columnsStore
}
