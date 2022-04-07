import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import { inject, observer } from 'mobx-react'
import { GrFormClose } from 'react-icons/gr'
import { BsPlus } from 'react-icons/bs'
import OrganizationsStore from '../../stores/OrganizationsStore'
import {
   AddOrganizationContainer,
   BoardNameInput,
   CloseBtn,
   CreateBoardBtn,
   ModalContainer,
   ModalMainContainer
} from './styledComponents'

interface InjectedProps {
   organizationsStore: OrganizationsStore
}

const AddOrganizationModal = inject('organizationsStore')(
   observer(props => {
      const [organizationNameInputVal, changeOrganizationInput] = useState('')
      const getInjectedProps = (): InjectedProps => props as InjectedProps

      const onAddNewOrganization = () => {
         const { organizationsStore } = getInjectedProps()
         const { addOrganization } = organizationsStore
         addOrganization(organizationNameInputVal)
         changeOrganizationInput('')
      }

      return (
         <Popup
            trigger={
               <AddOrganizationContainer>
                  <BsPlus size={30} /> <p>Create New Organization</p>
               </AddOrganizationContainer>
            }
            position='top right'
            modal
         >
            {close => (
               <ModalMainContainer>
                  <ModalContainer>
                     <CloseBtn onClick={close}>
                        <GrFormClose color='#64748B' size={24} />
                     </CloseBtn>
                     <BoardNameInput
                        placeholder='Add organization title'
                        onChange={event =>
                           changeOrganizationInput(event.target.value)
                        }
                        value={organizationNameInputVal}
                     />
                     <h2>{`Narendra's Workspace`}</h2>
                     <div>
                        <CreateBoardBtn onClick={onAddNewOrganization}>
                           Create Organization
                        </CreateBoardBtn>
                     </div>
                  </ModalContainer>
               </ModalMainContainer>
            )}
         </Popup>
      )
   })
)

export default AddOrganizationModal
