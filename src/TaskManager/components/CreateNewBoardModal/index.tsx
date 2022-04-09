import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import { inject, observer } from 'mobx-react'
import { GrFormClose } from 'react-icons/gr'
import { BsPlus } from 'react-icons/bs'
import BoardsStore from '../../stores/BoardsStore'
import {
   AddBoardContainer,
   BoardNameInput,
   CloseBtn,
   CreateBoardBtn,
   ModalContainer,
   ModalMainContainer
} from './styledComponents'

interface CreateBoardModalProps {
   idOrganization: string
}
interface InjectedProps extends CreateBoardModalProps {
   boardsStore: BoardsStore
}

const CreateBoard = inject('boardsStore')(
   observer((props: CreateBoardModalProps) => {
      const getInjectedProps = (): InjectedProps => props as InjectedProps

      const [boardNameInputVal, changeboardNameInputVal] = useState('')

      const onAddNewBoard = () => {
         const { boardsStore } = getInjectedProps()
         const { idOrganization } = props
         const { addBoard } = boardsStore
         addBoard(boardNameInputVal, idOrganization)
         changeboardNameInputVal('')
         handleModalState()
      }

      const [modelState, updateState] = useState(false)
      const handleModalState = () => {
         updateState(!modelState)
         close()
      }

      return (
         <Popup
            trigger={
               <AddBoardContainer onClick={handleModalState}>
                  <BsPlus size={30} />
                  <p>Create New Board</p>
               </AddBoardContainer>
            }
            modal={true}
            open={modelState}
         >
            {close => (
               <ModalMainContainer>
                  <ModalContainer>
                     <CloseBtn onClick={close}>
                        <GrFormClose color='#64748B' size={24} />
                     </CloseBtn>
                     <BoardNameInput
                        placeholder='Add board title'
                        onChange={event =>
                           changeboardNameInputVal(event.target.value)
                        }
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
            )}
         </Popup>
      )
   })
)

export default CreateBoard
