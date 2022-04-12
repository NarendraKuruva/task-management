import React from 'react'
import { resolveWithTimeout } from '../../../Common/utils/TestUtils'
import addOrganisationObj from '../../fixtures/organizationsFixtures/addOrganization.json'
import memberOrganizationsObj from '../../fixtures/organizationsFixtures/memberOrganizations.json'
import OrganizationsService from '.'
class OrganizationsServiceFixture implements OrganizationsService {
   addOrganization(name: string): Promise<any> {
      return resolveWithTimeout(addOrganisationObj)
   }
   getMemberOrganizationsData(): Promise<any> {
      return resolveWithTimeout(memberOrganizationsObj)
   }
}

export default OrganizationsServiceFixture
