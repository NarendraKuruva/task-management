import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import { inject, observer } from 'mobx-react'
import { GrFormClose } from 'react-icons/gr'
import { BsPlus } from 'react-icons/bs'
import TaskManagementStore from '../../stores/TaskManagementStore'
import OrganizationsStore from '../../stores/OrganizationsStore'
import {
   AddOrganizationContainer,
   BoardNameInput,
   CloseBtn,
   CreateBoardBtn,
   CreateBoardBtnContainer,
   ModalContainer,
   ModalMainContainer,
   WorkspaceName
} from './styledComponents'

interface InjectedProps {
   organizationsStore: OrganizationsStore
   taskManagementStore: TaskManagementStore
}

const createOrganizationTriggerText = 'Create New Organization'
const createOrganizationBtnText = 'Create Organization'
const createOrganizationInputPlaceholder = 'Add organization title'

const AddOrganizationModal = inject(
   'organizationsStore',
   'taskManagementStore'
)(
   observer(props => {
      const [organizationNameInputVal, changeOrganizationInput] = useState('')
      const getInjectedProps = (): InjectedProps => props as InjectedProps
      const [
         addOrganizationModalState,
         changeAddOrganizationModalState
      ] = useState(false)

      const openAddOrgModal = () => {
         changeAddOrganizationModalState(true)
      }

      const closeAddOrgModal = () => {
         changeAddOrganizationModalState(false)
      }

      const onAddNewOrganization = () => {
         const { organizationsStore } = getInjectedProps()
         const { addOrganization } = organizationsStore
         addOrganization(organizationNameInputVal)
         changeOrganizationInput('')
         closeAddOrgModal()
      }
      const { taskManagementStore } = getInjectedProps()
      const { profileDetails } = taskManagementStore
      const name = profileDetails.fullName
      const workspaceName = `${name}'s Workspaces`

      return (
         <Popup
            trigger={
               <AddOrganizationContainer>
                  <BsPlus size={30} /> <p>{createOrganizationTriggerText}</p>
               </AddOrganizationContainer>
            }
            position='top right'
            modal
            onOpen={openAddOrgModal}
            onClose={closeAddOrgModal}
            open={addOrganizationModalState}
         >
            <ModalMainContainer>
               <ModalContainer>
                  <CloseBtn onClick={closeAddOrgModal}>
                     <GrFormClose color='#64748B' size={24} />
                  </CloseBtn>
                  <BoardNameInput
                     placeholder={createOrganizationInputPlaceholder}
                     onChange={event =>
                        changeOrganizationInput(event.target.value)
                     }
                     value={organizationNameInputVal}
                  />
                  <WorkspaceName>{workspaceName}</WorkspaceName>
                  <CreateBoardBtnContainer>
                     <CreateBoardBtn onClick={onAddNewOrganization}>
                        {createOrganizationBtnText}
                     </CreateBoardBtn>
                  </CreateBoardBtnContainer>
               </ModalContainer>
            </ModalMainContainer>
         </Popup>
      )
   })
)

export default AddOrganizationModal
