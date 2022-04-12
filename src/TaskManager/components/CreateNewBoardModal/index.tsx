import React, { useContext, useState } from 'react'
import Popup from 'reactjs-popup'
import { observer } from 'mobx-react'
import { BsPlus } from 'react-icons/bs'

import {
   BoardsContext,
   TaskManagementContext
} from '../../../Common/stores/index.context'

import CloseIcon from '../../Icons/CloseIcon'

import {
   AddBoardContainer,
   AddBoardTriggerText,
   BoardNameInput,
   CloseIconContainer,
   CreateBoardBtn,
   CreateBoardBtnContainer,
   ModalContainer,
   ModalMainContainer,
   WorkspacesLabelText
} from './styledComponents'

interface CreateBoardModalProps {
   idOrganization: string
}

const createNewBoardTriggerText = 'Create new board'
const createBoardBtnText = 'Create Board'

const CreateBoard = observer(
   (props: CreateBoardModalProps): JSX.Element => {
      const boardsContextObj = useContext(BoardsContext)
      const taskManagementContextObj = useContext(TaskManagementContext)
      const [boardNameInputVal, changeboardNameInputVal] = useState('')
      const [addBoardModalState, updateAddBoardModalState] = useState(false)

      const closeAddBoardModal = (): void => {
         updateAddBoardModalState(false)
      }

      const openAddBoardModal = (): void => {
         updateAddBoardModalState(true)
      }

      const onAddNewBoard = (): void => {
         const { idOrganization } = props
         const { addBoard } = boardsContextObj
         addBoard(boardNameInputVal, idOrganization)
         changeboardNameInputVal('')
         closeAddBoardModal()
      }

      const { profileDetails } = taskManagementContextObj
      return (
         <Popup
            trigger={
               <AddBoardContainer onClick={openAddBoardModal}>
                  <BsPlus size={30} color='#475569' />
                  <AddBoardTriggerText>
                     {createNewBoardTriggerText}
                  </AddBoardTriggerText>
               </AddBoardContainer>
            }
            modal={true}
            open={addBoardModalState}
            onOpen={openAddBoardModal}
            onClose={closeAddBoardModal}
         >
            <ModalMainContainer>
               <ModalContainer>
                  <CloseIconContainer>
                     <CloseIcon
                        color={'#64748b'}
                        onClick={closeAddBoardModal}
                        cursor={'pointer'}
                     />
                  </CloseIconContainer>
                  <BoardNameInput
                     placeholder='Add board title'
                     onChange={event =>
                        changeboardNameInputVal(event.target.value)
                     }
                     value={boardNameInputVal}
                  />
                  <WorkspacesLabelText>{`${profileDetails.fullName}'s Workspace`}</WorkspacesLabelText>
                  <CreateBoardBtnContainer>
                     <CreateBoardBtn onClick={onAddNewBoard}>
                        {createBoardBtnText}
                     </CreateBoardBtn>
                  </CreateBoardBtnContainer>
               </ModalContainer>
            </ModalMainContainer>
         </Popup>
      )
   }
)

export default CreateBoard
