interface BoardsService {
   addBoard(name: string, idOrganization: string): Promise<any>
   getBoardsInOrganization(organizationId: string): Promise<any>
}
export default BoardsService
