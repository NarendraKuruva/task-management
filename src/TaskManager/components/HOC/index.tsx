import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router'

import {
   OrganizationsContext,
   TaskManagementContext
} from '../../../Common/stores/index.context'

import Loading from '../LoadingPage'

import { StyledLoadingContainer } from './styledComponents'

const getOrganizationsHOC = OldComponent => {
   const UpdatedComponent = observer(() => {
      const organizationsContextObj = useContext(OrganizationsContext)
      const taskManagementServiceObj = useContext(TaskManagementContext)
      const { getMyProfileData } = taskManagementServiceObj
      const { organizationsList } = organizationsContextObj
      useEffect(() => {
         const { getMemberOrganizations } = organizationsContextObj
         getMemberOrganizations()
         getMyProfileData()
      }, [organizationsList])
      const renderLoading = () => (
         <StyledLoadingContainer>
            <Loading />
         </StyledLoadingContainer>
      )
      const { organizationsApiStatus } = organizationsContextObj
      switch (organizationsApiStatus) {
         case 200:
            return <OldComponent />

         default:
            return renderLoading()
      }
   })
   return withRouter(UpdatedComponent)
}
export default getOrganizationsHOC
