import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { action, observable } from 'mobx'
import TaskManagementService from '../../services/TaskManagementService'
import BoardModel from '../models/BoardModel'
class BoardsStore {
   @observable boardsList!: Map<string, BoardModel>
   @observable boardsApiStatus!: number
   taskManagementService: TaskManagementService
   constructor(taskManagementService: TaskManagementService) {
      this.boardsList = new Map()
      this.boardsApiStatus = 0
      this.taskManagementService = taskManagementService
   }

   @action.bound getOrganizationBoards(organizationId: string) {
      this.boardsApiStatus = 0
      this.boardsList.clear()
      const OrganizationsBoardsPromiseObj = this.taskManagementService.getBoardsInOrganization(
         organizationId
      )
      return bindPromiseWithOnSuccess(OrganizationsBoardsPromiseObj)
         .to(
            status => {
               this.boardsApiStatus = status
            },
            response => {
               if (!response) return
               response.map(eachBoard =>
                  this.boardsList.set(eachBoard.id, new BoardModel(eachBoard))
               )
            }
         )
         .catch(error => {
            console.log(error)
         })
   }
   @action.bound addBoard(name: string, idOrganization: string) {
      const AddBoardPromiseObj = this.taskManagementService.addBoard(
         name,
         idOrganization
      )
      console.log(AddBoardPromiseObj)
      return bindPromiseWithOnSuccess(AddBoardPromiseObj)
         .to(
            status => {
               this.boardsApiStatus = status
            },
            response => {
               if (!response) return

               this.boardsList.set(response.id, new BoardModel(response))
            }
         )
         .catch(error => {
            console.log(error)
         })
   }
}
export default BoardsStore
