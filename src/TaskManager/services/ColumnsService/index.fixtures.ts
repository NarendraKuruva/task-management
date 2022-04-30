import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import addColumnObj from '../../fixtures/columnsFixtures/addColumn.json'
import addTaskObj from '../../fixtures/columnsFixtures/addTask.json'
import boardColumnsObj from '../../fixtures/columnsFixtures/boardColumns.json'
import tasksInListObj from '../../fixtures/columnsFixtures/tasksInList.json'
import updateColPosObj from '../../fixtures/columnsFixtures/updateColumnPosition.json'
import updateTaskListObj from '../../fixtures/columnsFixtures/updateTaskList.json'
import updateTaskPositionObj from '../../fixtures/columnsFixtures/updateTaskPosition.json'
import ColumnsService from '.'

class ColumnServiceFixture implements ColumnsService {
   getBoardDetails(boardId: string): Promise<any> {
      return resolveWithTimeout(boardColumnsObj)
   }

   updateColumnPosition(listId: string, index: number): Promise<any> {
      return resolveWithTimeout(updateColPosObj)
   }

   getTasksInList(listId: string): Promise<any> {
      return resolveWithTimeout(tasksInListObj)
   }

   addColumn(name: string, boardId: string): Promise<any> {
      return resolveWithTimeout(addColumnObj)
   }

   addTask(name: string, columnId: string): Promise<any> {
      return resolveWithTimeout(addTaskObj)
   }

   updateTaskList(taskId: string, listId: string): Promise<any> {
      return resolveWithTimeout(updateTaskListObj)
   }

   updateTaskPosition(taskId: string, position: string): Promise<any> {
      return resolveWithTimeout(updateTaskPositionObj)
   }
}

export default ColumnServiceFixture
