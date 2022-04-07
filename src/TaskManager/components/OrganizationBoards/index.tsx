import React, { useEffect } from 'react'
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
   boardsStore: BoardsStore
}

const Organization = inject(
   'taskManagementStore',
   'organizationsStore',
   'boardsStore'
)(
   observer((props: OrganizationProps) => {
      const getInjectedProps = (): InjectedProps => props as InjectedProps
      const { boardsStore } = getInjectedProps()
      const { boardsList } = boardsStore

      useEffect(() => {
         const { match } = props
         const { params } = match
         const { id } = params
         const { organizationsStore, boardsStore } = getInjectedProps()
         const { setActiveOrganization } = organizationsStore
         const { getOrganizationBoards } = boardsStore
         getOrganizationBoards(id)
         setActiveOrganization(id)
      }, [boardsList])

      const renderLoading = () => (
         <OrganizationPageContainer>
            <Header />
            <Loading />
         </OrganizationPageContainer>
      )

      const renderOrganizationBoards = () => {
         const { match } = props
         const { params } = match
         const { id } = params
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
      console.log(boardsApiStatus)
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

export default Organization
