import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { History } from 'history'
import { match } from 'react-router-dom'
import { MdPersonOutline } from 'react-icons/md'
import TaskManagementStore from '../../stores/TaskManagementStore'
import Header from '../Header'
import BoardCard from '../BoardCard'
import CreateBoard from '../CreateNewBoardModal'
import Loading from '../LoadingPage'
import OrganizationsStore from '../../stores/OrganizationsStore'
import getOrganizationsHOC from '../HOC'
import {
   NO_BOARDS_IN_ORG_TEXT,
   YOUR_BOARDS_TEXT
} from '../../constants/TaskManagementConstants'

import {
   BoardsContainer,
   OrganizationPageContainer,
   WorkspaceBoardsMainContainer,
   WorkspaceBoardsContainer,
   WorkspaceBoardsText,
   WorkspaceBoardsTextContainer,
   WorkspaceHeading,
   WorkspaceHeadingContainer,
   WorkspaceInitial,
   WorkspaceInitialContainer,
   OrganizationsContainer
} from './styledComponents'

interface OrganizationProps {
   match: match<Params>
   history: History
}

interface Params {
   id: string
}
interface InjectedProps extends OrganizationProps {
   taskManagementStore: TaskManagementStore
   organizationsStore: OrganizationsStore
}
@inject('taskManagementStore', 'organizationsStore')
@observer
class Organization extends Component<OrganizationProps> {
   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   componentDidMount() {
      const { match } = this.props
      const { params } = match
      const { id } = params
      const {
         taskManagementStore,
         organizationsStore
      } = this.getInjectedProps()
      const { activeOrganizationId, setActiveOrganization } = organizationsStore
      console.log(organizationsStore)

      console.log(activeOrganizationId)
      const { getOrganizationBoards } = taskManagementStore
      setActiveOrganization(id)
      getOrganizationBoards(id)
   }

   renderLoading = () => (
      <OrganizationPageContainer>
         <Header />
         <Loading />
      </OrganizationPageContainer>
   )

   onAddNewBoard = () => {
      const { match } = this.props
      const { params } = match
      const { id } = params
      const { taskManagementStore } = this.getInjectedProps()

      const {
         addBoard,
         boardNameInputVal,
         setInputValueEmpty
      } = taskManagementStore
      addBoard(boardNameInputVal, id)
      setInputValueEmpty()
   }

   renderOrganizationBoards = () => {
      const { match } = this.props
      const { params } = match
      const { id } = params
      const { taskManagementStore } = this.getInjectedProps()
      const { organizationBoards } = taskManagementStore
      const organizationsText =
         organizationBoards.length === 0
            ? NO_BOARDS_IN_ORG_TEXT
            : YOUR_BOARDS_TEXT
      const myName = 'Narendra Kuruva'

      return (
         <OrganizationPageContainer>
            <Header />
            <OrganizationsContainer>
               <WorkspaceHeadingContainer>
                  <WorkspaceInitialContainer>
                     <WorkspaceInitial>{myName[0]}</WorkspaceInitial>
                  </WorkspaceInitialContainer>
                  <WorkspaceHeading>
                     {`${myName}'s Workspace`}{' '}
                  </WorkspaceHeading>
               </WorkspaceHeadingContainer>
               <WorkspaceBoardsMainContainer>
                  <WorkspaceBoardsContainer>
                     <WorkspaceBoardsTextContainer>
                        <MdPersonOutline color='#ffffff' size={25} />
                        <WorkspaceBoardsText>
                           {organizationsText}
                        </WorkspaceBoardsText>
                     </WorkspaceBoardsTextContainer>
                     <BoardsContainer>
                        {organizationBoards.map(eachBoard => (
                           <BoardCard
                              boardDetails={eachBoard}
                              key={eachBoard.id}
                           />
                        ))}
                        <CreateBoard idOrganization={id} />
                     </BoardsContainer>
                  </WorkspaceBoardsContainer>
               </WorkspaceBoardsMainContainer>
            </OrganizationsContainer>
         </OrganizationPageContainer>
      )
   }

   render() {
      const { taskManagementStore } = this.getInjectedProps()
      const { organizationBoardsApiStatus } = taskManagementStore
      console.log(organizationBoardsApiStatus)
      switch (organizationBoardsApiStatus) {
         case 200:
            return this.renderOrganizationBoards()
         case 400:
            return this.renderLoading()
         default:
            return this.renderLoading()
      }
   }
}

// export default getOrganizationsHOC(Organization)
export default Organization
