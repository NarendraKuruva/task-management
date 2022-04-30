import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react'
import { BsBriefcase } from 'react-icons/bs'

import { OrganizationsContext } from '../../../Common/stores/index.context'

import {
   NO_WORKSPACES_TEXT,
   YOUR_WORKSPACES_TEXT
} from '../../constants/TaskManagementConstants'

import AddOrganizationModal from '../CreateOrganizationModal'
import Header from '../Header'
import Loading from '../LoadingPage'
import getOrganizationsHOC from '../HOC'
import OrganizationCard from '../OrganizationCard'

import {
   HomePageContainer,
   OrganizationsHeading,
   OrganizationsHeadingContainer,
   OrganizationsListAndHeadingContainer,
   OrganizationsListContainer,
   OrganizationsListMainContainer
} from './styledComponents'

const Home = observer(() => {
   const organizationsContextObj = useContext(OrganizationsContext)

   const renderLoadingPage = (): JSX.Element => (
      <HomePageContainer>
         <Header />
         <Loading />
      </HomePageContainer>
   )

   useEffect(() => {
      const { setActiveOrganization } = organizationsContextObj
      setActiveOrganization('')
   })

   const renderOrganizationsPage = (): JSX.Element => {
      const { organizationsList } = organizationsContextObj
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

   const { organizationsApiStatus } = organizationsContextObj

   switch (organizationsApiStatus) {
      case 200:
         return renderOrganizationsPage()
      case 400:
         return renderLoadingPage()
      default:
         return renderLoadingPage()
   }
})

export default getOrganizationsHOC(Home)
