import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { useParams } from 'react-router-dom'
import { MdPersonOutline } from 'react-icons/md'
import Header from '../Header'
import BoardCard from '../BoardCard'
import CreateBoard from '../CreateNewBoardModal'
import Loading from '../LoadingPage'
import OrganizationsStore from '../../stores/OrganizationsStore'
import getOrganizationsHOC from '../HOC'
import BoardsStore from '../../stores/BoardsStore'
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

interface OrganizationParams {
   id: string
}
interface InjectedProps {
   organizationsStore: OrganizationsStore
   boardsStore: BoardsStore
}

const Organization = inject(
   'organizationsStore',
   'boardsStore'
)(
   observer(props => {
      const getInjectedProps = (): InjectedProps => props as InjectedProps
      const { boardsStore } = getInjectedProps()
      const { boardsList } = boardsStore
      const { id } = useParams<OrganizationParams>()
      useEffect(() => {
         const { organizationsStore, boardsStore } = getInjectedProps()
         const { setActiveOrganization } = organizationsStore
         const { getOrganizationBoards } = boardsStore
         getOrganizationBoards(id)
         setActiveOrganization(id)
      }, [])

      const renderLoading = () => (
         <OrganizationPageContainer>
            <Header />
            <Loading />
         </OrganizationPageContainer>
      )

      const renderOrganizationBoards = () => {
         const { boardsStore } = getInjectedProps()
         const { boardsList } = boardsStore
         const boardsArray = Array.from(boardsList.values())
         const organizationsText =
            boardsArray.length === 0 ? NO_BOARDS_IN_ORG_TEXT : YOUR_BOARDS_TEXT
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
                           {boardsArray.map(eachBoard => (
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

      const { boardsApiStatus } = boardsStore
      switch (boardsApiStatus) {
         case 200:
            return renderOrganizationBoards()
         case 400:
            return renderLoading()
         default:
            return renderLoading()
      }
   })
)

export default getOrganizationsHOC(Organization)
