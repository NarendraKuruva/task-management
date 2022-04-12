import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { action, observable } from 'mobx'
import BoardsService from '../../services/BoardsService'
import BoardModel from '../models/BoardModel'
class BoardsStore {
   @observable boardsList!: Map<string, BoardModel>
   @observable boardsApiStatus!: number
   boardsService: BoardsService
   constructor(boardsService: BoardsService) {
      this.boardsList = new Map()
      this.boardsApiStatus = 0
      this.boardsService = boardsService
   }

   @action.bound
   getOrganizationBoards = (organizationId: string): Promise<any> => {
      this.boardsApiStatus = 0
      this.boardsList.clear()
      const OrganizationsBoardsPromiseObj = this.boardsService.getBoardsInOrganization(
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
            alert(error)
         })
   }

   @action.bound
   addBoard = (name: string, idOrganization: string): Promise<any> => {
      const AddBoardPromiseObj = this.boardsService.addBoard(
         name,
         idOrganization
      )

      return bindPromiseWithOnSuccess(AddBoardPromiseObj)
         .to(
            status => {
               // this.boardsApiStatus = status
            },
            response => {
               if (!response) return

               this.boardsList.set(response.id, new BoardModel(response))
            }
         )
         .catch(error => {
            alert(error)
         })
   }
}

export default BoardsStore
