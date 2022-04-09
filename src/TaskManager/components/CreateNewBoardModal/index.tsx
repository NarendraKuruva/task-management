import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import { inject, observer } from 'mobx-react'
import { GrFormClose } from 'react-icons/gr'
import { BsPlus } from 'react-icons/bs'
import BoardsStore from '../../stores/BoardsStore'
import TaskManagementStore from '../../stores/TaskManagementStore'
import {
   AddBoardContainer,
   AddBoardTriggerText,
   BoardNameInput,
   CloseBtn,
   CreateBoardBtn,
   CreateBoardBtnContainer,
   ModalContainer,
   ModalMainContainer,
   WorkspacesLabelText
} from './styledComponents'

interface CreateBoardModalProps {
   idOrganization: string
}
interface InjectedProps extends CreateBoardModalProps {
   boardsStore: BoardsStore
   taskManagementStore: TaskManagementStore
}

const createNewBoardTriggerText = 'Create New Board'
const createBoardBtnText = 'Create Board'

const CreateBoard = inject(
   'boardsStore',
   'taskManagementStore'
)(
   observer((props: CreateBoardModalProps) => {
      const getInjectedProps = (): InjectedProps => props as InjectedProps

      const [boardNameInputVal, changeboardNameInputVal] = useState('')
      const [addBoardModalState, updateAddBoardModalState] = useState(false)

      const onAddNewBoard = () => {
         const { boardsStore } = getInjectedProps()
         const { idOrganization } = props
         const { addBoard } = boardsStore
         addBoard(boardNameInputVal, idOrganization)
         changeboardNameInputVal('')
         closeAddBoardModal()
      }

      const closeAddBoardModal = () => {
         updateAddBoardModalState(false)
      }

      const openAddBoardModal = () => {
         updateAddBoardModalState(true)
      }

      const { taskManagementStore } = getInjectedProps()
      const { profileDetails } = taskManagementStore
      return (
         <Popup
            trigger={
               <AddBoardContainer onClick={openAddBoardModal}>
                  <BsPlus size={30} />
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
                  <CloseBtn onClick={closeAddBoardModal}>
                     <GrFormClose color='#64748B' size={24} />
                  </CloseBtn>
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
   })
)

export default CreateBoard
