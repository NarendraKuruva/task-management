import React from 'react'
import { inject, observer } from 'mobx-react'
import { FiHome } from 'react-icons/fi'
import { Link, withRouter } from 'react-router-dom'
import { History } from 'history'
import { BiSearchAlt2 } from 'react-icons/bi'
import { IoChevronDown, IoCloseSharp } from 'react-icons/io5'
import Popup from 'reactjs-popup'
import OrganizationModel from '../../stores/models/OrganizationsModel'
import TaskManagementStore from '../../stores/TaskManagementStore'
import OrganizationsStore from '../../stores/OrganizationsStore'
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
   OrganizationItemIndicator,
   OrganizationsCloseIconContainer,
   OrganizationsListMainContainer,
   OrganizationsTriggerContainer
} from './styledComponents'

interface HeaderProps {
   history: History
}

interface InjectedProps extends HeaderProps {
   organizationsStore: OrganizationsStore
   taskManagementStore: TaskManagementStore
}

const organizationsLabelText = 'Organizations'
const workspaceLabelText = 'Workspace'
const boardsLabelText = 'Boards'
const appName = 'Task Manager'
const logoutBtnText = 'Log Out'

const Header = inject(
   'organizationsStore',
   'taskManagementStore'
)(
   observer(
      (props: HeaderProps): JSX.Element => {
         const getInjectedProps = (): InjectedProps => props as InjectedProps

         const onLogOut = () => {
            const { history } = props
            localStorage.clear()
            history.push('/login')
         }

         const renderOrganizationListItem = (props: OrganizationModel) => {
            const { organizationsStore } = getInjectedProps()
            const {
               setActiveOrganization,
               activeOrganizationId
            } = organizationsStore
            const setActiveOrg = () => {
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
                     {/* <OrganizationItemIndicator></OrganizationItemIndicator> */}
                     <OrganizationSelectItem key={id}>
                        {displayName}
                     </OrganizationSelectItem>
                  </OrganizationItemContainer>
               </Link>
            )
         }

         const { organizationsStore, taskManagementStore } = getInjectedProps()
         const { organizationsList } = organizationsStore
         const { profileDetails } = taskManagementStore
         return (
            <HeaderContainer>
               <OrganizationAndBoardsContainer>
                  <Link to='/trello/'>
                     <HomeIconContainer>
                        <FiHome color='#ffffff' />
                     </HomeIconContainer>
                  </Link>

                  <Popup
                     trigger={
                        <OrganizationsTriggerContainer>
                           <OrganizationsContainer>
                              <p>{organizationsLabelText}</p>
                              <IoChevronDown />
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
                                 <IoCloseSharp
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
                     <ProfileInitials>
                        {profileDetails.initials}
                     </ProfileInitials>
                     {/* <ProfileInitials>NK</ProfileInitials> */}
                  </ProfileContainer>
               </SearchAndLogoutContainer>
            </HeaderContainer>
         )
      }
   )
)

export default withRouter(Header)
