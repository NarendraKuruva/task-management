import React from 'react'
import addBoardObj from '../../fixtures/boardsFixtures/addBoard.json'
import organizationBoardsObj from '../../fixtures/boardsFixtures/boardsInOrganization.json'
import { resolveWithTimeout } from '../../../Common/utils/TestUtils'
import BoardsService from '.'

class BoardsServiceFixture implements BoardsService {
   addBoard(name: string, idOrganization: string): Promise<any> {
      return resolveWithTimeout(addBoardObj)
   }

   getBoardsInOrganization(organizationId: string): Promise<any> {
      return resolveWithTimeout(organizationBoardsObj)
   }
}

export default BoardsServiceFixture
