import { inject, observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { withRouter } from 'react-router'
import OrganizationsStore from '../../stores/OrganizationsStore'
import Header from '../Header'
import Loading from '../LoadingPage'
import { StyledLoadingContainer } from './styledComponents'

interface InjectedProps {
   organizationsStore: OrganizationsStore
}

const getOrganizationsHOC = OldComponent => {
   const UpdatedComponent = inject('organizationsStore')(
      observer(props => {
         const getInjectedProps = (): InjectedProps => props as InjectedProps
         console.log('hoc calling')
         const { organizationsStore } = getInjectedProps()
         const { organizationsList } = organizationsStore
         useEffect(() => {
            const { organizationsStore } = getInjectedProps()
            const { getMemberOrganizations } = organizationsStore
            getMemberOrganizations()
         }, [organizationsList])
         const renderLoading = () => (
            <StyledLoadingContainer>
               <Header />
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
