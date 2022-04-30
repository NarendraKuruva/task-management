import TaskManagementStore from '../../TaskManager/stores/TaskManagementStore'
import OrganizationsStore from '../../TaskManager/stores/OrganizationsStore'
import { networkCallWithFetch } from '../utils/APIUtils'
import TaskManagementServiceApi from '../../TaskManager/services/TaskManagementService/index.api'
import ColumnsServiceApi from '../../TaskManager/services/ColumnsService/index.api'
import BoardsServiceApi from '../../TaskManager/services/BoardsService/index.api'
import OrganizationsServiceApi from '../../TaskManager/services/OrganizationsService/index.api'
import BoardsStore from '../../TaskManager/stores/BoardsStore'
import ColumnsStore from '../../TaskManager/stores/ColumnsStore'
import CounterStore from './CounterStore'

const organizationsService = new OrganizationsServiceApi(networkCallWithFetch)
const boardsService = new BoardsServiceApi(networkCallWithFetch)
const columnsService = new ColumnsServiceApi(networkCallWithFetch)
const taskManagementService = new TaskManagementServiceApi(networkCallWithFetch)
const counterStore = new CounterStore()
const taskManagementStore = new TaskManagementStore(taskManagementService)
const organizationsStore = new OrganizationsStore(organizationsService)
const boardsStore = new BoardsStore(boardsService)
const columnsStore = new ColumnsStore(columnsService)
export default {
   counterStore,
   taskManagementStore,
   organizationsStore,
   boardsStore,
   columnsStore
}
