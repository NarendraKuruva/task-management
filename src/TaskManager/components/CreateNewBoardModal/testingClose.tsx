import React, { useState } from 'react'
import { BsPlus } from 'react-icons/bs'
import { GrFormClose } from 'react-icons/gr'
import Popup from 'reactjs-popup'
import {
   AddBoardContainer,
   BoardNameInput,
   CloseBtn,
   CreateBoardBtn,
   ModalContainer,
   ModalMainContainer
} from './styledComponents'

interface PopupProps {
   props: {
      onChangeBoardInput: any
      boardNameInputVal: string
      onAddNewBoard: any
   }
}

const ControlledPopup = (props: PopupProps) => {
   const [open, setOpen] = useState(false)
   const closeModal = () => setOpen(false)

   const { onChangeBoardInput, boardNameInputVal, onAddNewBoard } = props.props
   return (
      <div>
         {/* <button
            type='button'
            className='button'
            onClick={() => setOpen(o => !o)}
         >
            Controlled Popup
         </button>
         <Popup
            open={open}
            closeOnDocumentClick
            onClose={closeModal}
            trigger={
               <AddBoardContainer onClick={() => setOpen(o => !o)}>
                  <BsPlus size={30} />
                  <p>Create New Board</p>
               </AddBoardContainer>
            }
            modal
         >
            <ModalMainContainer>
               <ModalContainer>
                  <CloseBtn onClick={closeModal}>
                     <GrFormClose color='#64748B' size={24} />
                  </CloseBtn>
                  <BoardNameInput
                     placeholder='Add board title'
                     onChange={onChangeBoardInput}
                     value={boardNameInputVal}
                  />
                  <h2>{`Narendra's Workspace`}</h2>
                  <div>
                     <CreateBoardBtn onClick={onAddNewBoard}>
                        Create Board
                     </CreateBoardBtn>
                  </div>
               </ModalContainer>
            </ModalMainContainer>
         </Popup> */}
      </div>
   )
}

export default ControlledPopup
