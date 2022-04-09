import { inject, observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { withRouter } from 'react-router'
import OrganizationsStore from '../../stores/OrganizationsStore'
import TaskManagementStore from '../../stores/TaskManagementStore'
import Header from '../Header'
import Loading from '../LoadingPage'
import { StyledLoadingContainer } from './styledComponents'

interface InjectedProps {
   organizationsStore: OrganizationsStore
   taskManagementStore: TaskManagementStore
}

const getOrganizationsHOC = OldComponent => {
   const UpdatedComponent = inject(
      'organizationsStore',
      'taskManagementStore'
   )(
      observer(props => {
         const getInjectedProps = (): InjectedProps => props as InjectedProps
         console.log('hoc calling')
         const { organizationsStore, taskManagementStore } = getInjectedProps()
         const { getMyProfileData } = taskManagementStore
         const { organizationsList } = organizationsStore
         useEffect(() => {
            const { organizationsStore } = getInjectedProps()
            const { getMemberOrganizations } = organizationsStore
            getMemberOrganizations()
            getMyProfileData()
         }, [organizationsList])
         const renderLoading = () => (
            <StyledLoadingContainer>
               {/* <Header /> */}
               <Loading />
            </StyledLoadingContainer>
         )
         const { organizationsApiStatus } = organizationsStore
         switch (organizationsApiStatus) {
            case 200:
               return <OldComponent />

            default:
               return renderLoading()
         }
      })
   )
   return withRouter(UpdatedComponent)
}
export default getOrganizationsHOC
