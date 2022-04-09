import React, { Component, useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import { BsBriefcase } from 'react-icons/bs'
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

const Home = inject('organizationsStore')(
   observer(props => {
      const getInjectedProps = (): InjectedProps => props as InjectedProps

      const renderLoadingPage = () => (
         <HomePageContainer>
            <Header />
            <Loading />
         </HomePageContainer>
      )

      useEffect(() => {
         const { organizationsStore } = getInjectedProps()
         const { setActiveOrganization } = organizationsStore
         setActiveOrganization('')
      })

      const renderOrganizationsPage = () => {
         const { organizationsStore } = getInjectedProps()
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

      const { organizationsStore } = getInjectedProps()
      const { organizationsApiStatus } = organizationsStore

      switch (organizationsApiStatus) {
         case 200:
            return renderOrganizationsPage()
         case 400:
            return renderLoadingPage()
         default:
            return renderLoadingPage()
      }
   })
)

export default getOrganizationsHOC(Home)
