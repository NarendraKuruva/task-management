import React, { useContext, useState } from 'react'
import Popup from 'reactjs-popup'
import { observer } from 'mobx-react'
import { BsPlus } from 'react-icons/bs'

import {
   OrganizationsContext,
   TaskManagementContext
} from '../../../Common/stores/index.context'

import CloseIcon from '../../Icons/CloseIcon'

import {
   AddOrganizationContainer,
   AddOrganizationTriggerText,
   BoardNameInput,
   CloseIconContainer,
   CreateBoardBtn,
   CreateBoardBtnContainer,
   ModalContainer,
   ModalMainContainer,
   WorkspaceName
} from './styledComponents'

const createOrganizationTriggerText = 'Create new organization'
const createOrganizationBtnText = 'Create Organization'
const createOrganizationInputPlaceholder = 'Add organization title'

const AddOrganizationModal = observer(
   (): JSX.Element => {
      const [organizationNameInputVal, changeOrganizationInput] = useState('')
      const organizationsContextObj = useContext(OrganizationsContext)
      const taskManagementServiceObj = useContext(TaskManagementContext)
      const [
         addOrganizationModalState,
         changeAddOrganizationModalState
      ] = useState(false)

      const openAddOrgModal = (): void => {
         changeAddOrganizationModalState(true)
      }

      const closeAddOrgModal = (): void => {
         changeAddOrganizationModalState(false)
      }

      const onAddNewOrganization = (): void => {
         const { addOrganization } = organizationsContextObj
         addOrganization(organizationNameInputVal)
         changeOrganizationInput('')
         closeAddOrgModal()
      }
      const { profileDetails } = taskManagementServiceObj
      const name = profileDetails.fullName
      const workspaceName = `${name}'s Workspaces`

      return (
         <Popup
            trigger={
               <AddOrganizationContainer>
                  <BsPlus size={30} color='#475569' />
                  <AddOrganizationTriggerText>
                     {createOrganizationTriggerText}
                  </AddOrganizationTriggerText>
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
                  <CloseIconContainer>
                     <CloseIcon
                        color={'#64748b'}
                        onClick={closeAddOrgModal}
                        cursor={'pointer'}
                     />
                  </CloseIconContainer>
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
   }
)

export default AddOrganizationModal
