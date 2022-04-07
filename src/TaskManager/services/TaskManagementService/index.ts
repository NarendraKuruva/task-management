interface TaskManagementService {
   getMemberOrganizationsData(): Promise<any>
   getMyOrganizations(): Promise<any>
   getBoardsInOrganization(organizationId: string): Promise<any>
   getBoardDetails(boardId: string): Promise<any>
   addBoard(name: string, idOrganization: string): Promise<any>
   addOrganization(name: string): Promise<any>
   addColumn(name: string, boardId: string): Promise<any>
   addTask(name: string, columnId: string): Promise<any>
   getTasksInList(listId: string): Promise<any>
   updateColumnPosition(listId: string, index: number): Promise<any>
   updateTaskPosition(taskId: string, position: string): Promise<any>
   updateTaskList(taskId: string, listId: string): Promise<any>
}

export default TaskManagementService
