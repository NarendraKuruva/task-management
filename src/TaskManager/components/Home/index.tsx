import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { BsBriefcase } from 'react-icons/bs'
import DevTools from 'mobx-react-devtools'
import AddOrganizationModal from '../CreateOrganizationModal'
import Header from '../Header'
import Loading from '../LoadingPage'
import getOrganizationsHOC from '../HOC'
import OrganizationCard from '../OrganizationCard'
import OrganizationsStore from '../../stores/OrganizationsStore'
import {
   NO_WORKSPACES_TEXT,
   YOUR_WORKSPACES_TEXT
} from '../../constants/TaskManagementConstants'
import {
   HomePageContainer,
   OrganizationsHeading,
   OrganizationsHeadingContainer,
   OrganizationsListAndHeadingContainer,
   OrganizationsListContainer,
   OrganizationsListMainContainer
} from './styledComponents'

interface InjectedProps {
   organizationsStore: OrganizationsStore
}

@inject('organizationsStore')
@observer
class Home extends Component {
   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   renderLoadingPage = () => (
      <HomePageContainer>
         <Header />
         <Loading />
      </HomePageContainer>
   )

   componentDidMount() {
      const { organizationsStore } = this.getInjectedProps()
      const { setActiveOrganization } = organizationsStore
      setActiveOrganization('')
   }

   renderOrganizationsPage = () => {
      const { organizationsStore } = this.getInjectedProps()
      const { organizationsList } = organizationsStore
      const yourOrganizationsText =
         organizationsList.size === 0
            ? NO_WORKSPACES_TEXT
            : YOUR_WORKSPACES_TEXT
      return (
         <HomePageContainer>
            <Header />
            <OrganizationsListMainContainer>
               <OrganizationsListAndHeadingContainer>
                  <OrganizationsHeadingContainer>
                     <BsBriefcase color='#ffffff' size={28} />
                     <OrganizationsHeading>
                        {yourOrganizationsText}
                     </OrganizationsHeading>
                  </OrganizationsHeadingContainer>
                  <OrganizationsListContainer>
                     {Array.from(organizationsList.values()).map(
                        eachOrganization => (
                           <OrganizationCard
                              organizationDetails={eachOrganization}
                              key={eachOrganization.id}
                           />
                        )
                     )}
                     <AddOrganizationModal />
                  </OrganizationsListContainer>
               </OrganizationsListAndHeadingContainer>
            </OrganizationsListMainContainer>
         </HomePageContainer>
      )
   }

   render() {
      const { organizationsStore } = this.getInjectedProps()
      const { organizationsApiStatus } = organizationsStore

      switch (organizationsApiStatus) {
         case 200:
            return this.renderOrganizationsPage()
         case 400:
            return this.renderLoadingPage()
         default:
            return this.renderLoadingPage()
      }
   }
}

export default getOrganizationsHOC(Home)
