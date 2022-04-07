import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { FiHome } from 'react-icons/fi'

import { Link, withRouter } from 'react-router-dom'
import { History, LocationState } from 'history'
import { BiSearchAlt2 } from 'react-icons/bi'
import { IoChevronDown, IoCloseSharp } from 'react-icons/io5'
import Popup from 'reactjs-popup'
import TaskManagementStore from '../../stores/TaskManagementStore'
import OrganizationModel from '../../stores/models/OrganizationsModel'
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
   history: History<LocationState>
}

interface InjectedProps extends HeaderProps {
   taskManagementStore: TaskManagementStore
   organizationsStore: OrganizationsStore
}
@inject('taskManagementStore', 'organizationsStore')
@observer
class UpdatedHeader extends Component<HeaderProps> {
   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   onLogOut = () => {
      const { history } = this.props
      localStorage.clear()
      history.push('/login')
   }
   renderOrganizationListItem = (props: OrganizationModel) => {
      console.log(props, 'details')
      const { organizationsStore } = this.getInjectedProps()
      const { setActiveOrganization, activeOrganizationId } = organizationsStore
      const setActiveOrg = () => {
         setActiveOrganization(props.id)
      }
      const { id, name } = props
      const isActive = id === activeOrganizationId

      return (
         <Link to={`/trello/${id}`} key={id}>
            <OrganizationItemContainer
               onClick={setActiveOrg}
               isActive={isActive}
            >
               <OrganizationItemIndicator></OrganizationItemIndicator>
               <OrganizationSelectItem key={id}>{name}</OrganizationSelectItem>
            </OrganizationItemContainer>
         </Link>
      )
   }

   render() {
      const { organizationsStore } = this.getInjectedProps()
      const { organizationsList } = organizationsStore
      console.log(organizationsList, 'organizationsListInHeader')
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
                           <p>Organizations</p>
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
                  //   contentStyle={{ padding: '0px', border: 'none' }}
                  arrow={false}
               >
                  {close => (
                     <OrganizationsListMainContainer>
                        <OrganizationsListContainer>
                           <OrganizationsCloseIconContainer>
                              <IoCloseSharp onClick={close} cursor='pointer' />
                           </OrganizationsCloseIconContainer>
                           <WorkspaceTextDecoration>
                              Workspace
                           </WorkspaceTextDecoration>
                           {Array.from(
                              organizationsList.values()
                           ).map(eachOrganization =>
                              this.renderOrganizationListItem(eachOrganization)
                           )}
                        </OrganizationsListContainer>
                     </OrganizationsListMainContainer>
                  )}
               </Popup>
               <BoardsContainer>
                  <BoardsLogoImg src='https://res.cloudinary.com/deiiiaxpc/image/upload/v1648731221/task_management/logologo_to5kyl.png' />
                  <BoardsText>Boards</BoardsText>
               </BoardsContainer>
               <SearchIconContainer>
                  <BiSearchAlt2 color='#ffffff' />
               </SearchIconContainer>
            </OrganizationAndBoardsContainer>

            <AppNameContainer>
               <LogoImg src='https://res.cloudinary.com/deiiiaxpc/image/upload/v1648725480/task_management/Group_7400_sbqt0h.png' />
               <AppName>Task Manager</AppName>
            </AppNameContainer>
            <SearchAndLogoutContainer>
               <SearchContainer>
                  <StyledSearchInput type='search' placeholder='Search' />
                  <BiSearchAlt2 color='#ffffff' />
               </SearchContainer>
               <LogoutText onClick={this.onLogOut}>Log Out</LogoutText>
               <ProfileContainer>
                  <ProfileInitials>NK</ProfileInitials>
               </ProfileContainer>
            </SearchAndLogoutContainer>
         </HeaderContainer>
      )
   }
}
export default UpdatedHeader
