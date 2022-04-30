import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { HiOutlineChevronDown } from 'react-icons/hi'
import { IoIosArrowDown } from 'react-icons/io'
import { Link, withRouter } from 'react-router-dom'
//eslint-disable-next-line
import { History } from 'history'
import { BiSearchAlt2 } from 'react-icons/bi'
import Popup from 'reactjs-popup'

import {
   OrganizationsContext,
   TaskManagementContext
} from '../../../Common/stores/index.context'

import OrganizationModel from '../../stores/models/OrganizationsModel'

import {
   OrganizationContainer,
   HomeIconContainer,
   OrganizationAndBoardsContainer,
   HeaderContainer,
   OrganizationIconImg,
   BoardsLogoImg,
   BoardsContainer,
   BoardsText,
   LogoImg,
   AppName,
   AppNameContainer,
   SearchContainer,
   StyledSearchInput,
   SearchIconContainer,
   LogoutText,
   SearchAndLogoutContainer,
   ProfileContainer,
   ProfileInitials,
   OrganizationsContainer,
   OrganizationSelectItem,
   OrganizationsListContainer,
   WorkspaceTextDecoration,
   OrganizationItemContainer,
   OrganizationsCloseIconContainer,
   OrganizationsListMainContainer,
   OrganizationsTriggerContainer,
   HomeIconImg,
   OrganizationsTriggerText
} from './styledComponents'

interface HeaderProps {
   history: History
}

const organizationsLabelText = 'Organization'
const workspaceLabelText = 'Workspace'
const boardsLabelText = 'Boards'
const appName = 'Task Manager'
const logoutBtnText = 'Log Out'

const Header = observer(
   (props: HeaderProps): JSX.Element => {
      const onLogOut = () => {
         const { history } = props
         localStorage.clear()
         history.push('/login')
      }
      const organizationsContextObj = useContext(OrganizationsContext)
      const taskManagementServiceObj = useContext(TaskManagementContext)
      const renderOrganizationListItem = (
         props: OrganizationModel
      ): JSX.Element => {
         const {
            setActiveOrganization,
            activeOrganizationId
         } = organizationsContextObj
         const setActiveOrg = (): void => {
            setActiveOrganization(props.id)
         }
         const { id, displayName } = props
         const isActive = id === activeOrganizationId

         return (
            <Link to={`/trello/${id}`} key={id}>
               <OrganizationItemContainer
                  onClick={setActiveOrg}
                  isActive={isActive}
               >
                  <OrganizationSelectItem key={id}>
                     {displayName}
                  </OrganizationSelectItem>
               </OrganizationItemContainer>
            </Link>
         )
      }

      const { organizationsList } = organizationsContextObj
      const { profileDetails } = taskManagementServiceObj
      return (
         <HeaderContainer>
            <OrganizationAndBoardsContainer>
               <Link to='/trello/'>
                  <HomeIconContainer>
                     <HomeIconImg src='https://res.cloudinary.com/deiiiaxpc/image/upload/v1649518479/task_management/home_adqoiv.png' />
                  </HomeIconContainer>
               </Link>
               <Popup
                  trigger={
                     <OrganizationsTriggerContainer>
                        <OrganizationsContainer>
                           <OrganizationsTriggerText>
                              {organizationsLabelText}
                           </OrganizationsTriggerText>
                           <HiOutlineChevronDown
                              size={20}
                              width={'24px'}
                              height={'24px'}
                           />
                        </OrganizationsContainer>
                        <OrganizationContainer>
                           <OrganizationIconImg src='https://res.cloudinary.com/deiiiaxpc/image/upload/v1648710767/Line_l9p8qw.png' />
                        </OrganizationContainer>
                     </OrganizationsTriggerContainer>
                  }
                  position='bottom left'
                  on='click'
                  closeOnDocumentClick
                  mouseLeaveDelay={300}
                  mouseEnterDelay={0}
                  arrow={false}
               >
                  {close => (
                     <OrganizationsListMainContainer>
                        <OrganizationsListContainer>
                           <OrganizationsCloseIconContainer>
                              <IoIosArrowDown
                                 onClick={close}
                                 cursor='pointer'
                              />
                           </OrganizationsCloseIconContainer>
                           <WorkspaceTextDecoration>
                              {workspaceLabelText}
                           </WorkspaceTextDecoration>
                           {Array.from(
                              organizationsList.values()
                           ).map(eachOrganization =>
                              renderOrganizationListItem(eachOrganization)
                           )}
                        </OrganizationsListContainer>
                     </OrganizationsListMainContainer>
                  )}
               </Popup>
               <BoardsContainer>
                  <BoardsLogoImg src='https://res.cloudinary.com/deiiiaxpc/image/upload/v1648731221/task_management/logologo_to5kyl.png' />
                  <BoardsText>{boardsLabelText}</BoardsText>
               </BoardsContainer>
               <SearchIconContainer>
                  <BiSearchAlt2 color='#ffffff' />
               </SearchIconContainer>
            </OrganizationAndBoardsContainer>

            <AppNameContainer>
               <LogoImg src='https://res.cloudinary.com/deiiiaxpc/image/upload/v1648725480/task_management/Group_7400_sbqt0h.png' />
               <AppName>{appName}</AppName>
            </AppNameContainer>
            <SearchAndLogoutContainer>
               <SearchContainer>
                  <StyledSearchInput type='search' placeholder='Search' />
                  <BiSearchAlt2 color='#ffffff' />
               </SearchContainer>
               <LogoutText onClick={onLogOut}>{logoutBtnText}</LogoutText>
               <ProfileContainer>
                  <ProfileInitials>{profileDetails.initials}</ProfileInitials>
               </ProfileContainer>
            </SearchAndLogoutContainer>
         </HeaderContainer>
      )
   }
)

export default withRouter(Header)
