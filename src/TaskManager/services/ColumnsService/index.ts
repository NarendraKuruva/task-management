interface ColumnsService {
   getBoardDetails(boardId: string): Promise<any>
   updateColumnPosition(listId: string, index: number): Promise<any>
   getTasksInList(listId: string): Promise<any>
   addColumn(name: string, boardId: string): Promise<any>
   addTask(name: string, columnId: string): Promise<any>
   updateTaskList(taskId: string, listId: string): Promise<any>
   updateTaskPosition(taskId: string, position: string): Promise<any>
}
export default ColumnsService
