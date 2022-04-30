interface OrganizationsService {
   addOrganization(name: string): Promise<any>
   getMemberOrganizationsData(): Promise<any>
}

export default OrganizationsService
