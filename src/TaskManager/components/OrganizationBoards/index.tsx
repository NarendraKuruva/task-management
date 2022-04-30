import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'
import { MdPersonOutline } from 'react-icons/md'

import {
   BoardsContext,
   OrganizationsContext,
   TaskManagementContext
} from '../../../Common/stores/index.context'

import {
   NO_BOARDS_IN_ORG_TEXT,
   YOUR_BOARDS_TEXT
} from '../../constants/TaskManagementConstants'

import getOrganizationsHOC from '../HOC'
import Header from '../Header'
import BoardCard from '../BoardCard'
import CreateBoard from '../CreateNewBoardModal'
import Loading from '../LoadingPage'

import {
   BoardsContainer,
   OrganizationPageContainer,
   WorkspaceBoardsText,
   WorkspaceBoardsTextContainer,
   WorkspaceHeading,
   WorkspaceHeadingContainer,
   WorkspaceInitial,
   WorkspaceInitialContainer,
   OrganizationsContainer
} from './styledComponents'

interface OrganizationParams {
   id: string
}

const Organization = observer(
   (): JSX.Element => {
      const { id } = useParams<OrganizationParams>()
      const organizationsContextObj = useContext(OrganizationsContext)
      const taskManagementServiceObj = useContext(TaskManagementContext)
      const boardsContextObj = useContext(BoardsContext)
      useEffect((): void => {
         const { setActiveOrganization } = organizationsContextObj
         const { getOrganizationBoards } = boardsContextObj
         getOrganizationBoards(id)

         setActiveOrganization(id)
      }, [])

      const renderLoading = (): JSX.Element => (
         <OrganizationPageContainer>
            <Header />
            <Loading />
         </OrganizationPageContainer>
      )

      const renderOrganizationBoards = (): JSX.Element => {
         const { boardsList } = boardsContextObj
         const boardsArray = Array.from(boardsList.values())
         const organizationsText =
            boardsArray.length === 0 ? NO_BOARDS_IN_ORG_TEXT : YOUR_BOARDS_TEXT

         const { profileDetails } = taskManagementServiceObj
         const myName = profileDetails.fullName
         const workspaceHeadingText = `${myName}'s Workspace`
         return (
            <OrganizationPageContainer>
               <Header />
               <OrganizationsContainer>
                  <WorkspaceHeadingContainer>
                     <WorkspaceInitialContainer>
                        <WorkspaceInitial>{myName[0]}</WorkspaceInitial>
                     </WorkspaceInitialContainer>
                     <WorkspaceHeading>{workspaceHeadingText}</WorkspaceHeading>
                  </WorkspaceHeadingContainer>
                  <WorkspaceBoardsTextContainer>
                     <MdPersonOutline color='#ffffff' size={25} />
                     <WorkspaceBoardsText>
                        {organizationsText}
                     </WorkspaceBoardsText>
                  </WorkspaceBoardsTextContainer>
                  <BoardsContainer>
                     {boardsArray.map(eachBoard => (
                        <BoardCard
                           boardDetails={eachBoard}
                           key={eachBoard.id}
                        />
                     ))}
                     <CreateBoard idOrganization={id} />
                  </BoardsContainer>
               </OrganizationsContainer>
            </OrganizationPageContainer>
         )
      }

      const { boardsApiStatus } = boardsContextObj
      switch (boardsApiStatus) {
         case 200:
            return renderOrganizationBoards()
         case 400:
            return renderLoading()
         default:
            return renderLoading()
      }
   }
)

export default getOrganizationsHOC(Organization)
