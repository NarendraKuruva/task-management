import React, { useContext, useState } from 'react'
import { inject, observer } from 'mobx-react'
import { BsPlus } from 'react-icons/bs'
import Popup from 'reactjs-popup'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { IoCloseSharp } from 'react-icons/io5'
import { FiMoreHorizontal } from 'react-icons/fi'

import { ColumnsContext } from '../../../Common/stores/index.context'

import ColumnModel from '../../stores/models/ColumnModel'
import ColumnsStore from '../../stores/ColumnsStore'

import TaskItem from '../Task'
import {
   ActionsPopupTrigger,
   AddTaskAndCloseBtnsContainer,
   AddTaskBtn,
   AddTaskPopupBtn,
   AddTaskPopupContainer,
   AddTaskPopupMainContainer,
   AddTaskTextContainer,
   ColumnActionsContainer,
   ColumnContainer,
   ColumnMainContainer,
   ColumnName,
   ColumnNameAndActionsContainer,
   DeleteBtn,
   HideBtn,
   PopupTaskTitleInput,
   TasksListContainer
} from './styledComponents'

interface ColumnProps {
   columnDetails: ColumnModel
   index: number
}

const hideBtnText = 'Hide'
const deleteBtnText = 'Delete'
const addTaskTriggerText = 'Add a task'
const addTaskBtnText = 'Add Task'

const Column = observer(
   (props: ColumnProps): JSX.Element => {
      const [taskNameInputVal, changeTaskNameInputVal] = useState('')
      const columnContextObj = useContext(ColumnsContext)

      const [addTaskModelState, updateAddTaskModelState] = useState(false)
      const handleAddTaskModalState = (): void => {
         updateAddTaskModelState(!addTaskModelState)
      }

      const handleAddTaskClose = (): void => {
         changeTaskNameInputVal('')
         updateAddTaskModelState(false)
      }

      const handleAddTask = (): void => {
         const { addTask } = columnContextObj
         const { columnDetails } = props
         const { id } = columnDetails
         addTask(taskNameInputVal, id)
         changeTaskNameInputVal('')
         handleAddTaskModalState()
      }

      // const renderTasksList = () => {
      //    return
      // }

      const { columnDetails, index } = props
      const { id, columnName, tasksMap } = columnDetails
      const { columnsList } = columnContextObj
      const thisCol = columnsList.get(id)
      if (thisCol !== undefined) {
         const tasksInList = Array.from(tasksMap.values())

         return (
            <ColumnMainContainer>
               <Draggable key={id} draggableId={id} index={index}>
                  {provided => (
                     <ColumnContainer
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                     >
                        <ColumnNameAndActionsContainer>
                           <ColumnName>{columnName}</ColumnName>
                           <Popup
                              trigger={
                                 <ActionsPopupTrigger>
                                    <FiMoreHorizontal
                                       size={30}
                                       color={'#231F20;'}
                                    />
                                 </ActionsPopupTrigger>
                              }
                              position='right top'
                              on='click'
                              closeOnDocumentClick
                              mouseLeaveDelay={300}
                              mouseEnterDelay={0}
                              contentStyle={{
                                 padding: '0px',
                                 border: 'none'
                              }}
                              arrow={false}
                           >
                              <ColumnActionsContainer>
                                 <HideBtn>{hideBtnText}</HideBtn>
                                 <DeleteBtn>{deleteBtnText}</DeleteBtn>
                              </ColumnActionsContainer>
                           </Popup>
                        </ColumnNameAndActionsContainer>
                        <Droppable droppableId={id} type='task'>
                           {provided => (
                              <TasksListContainer
                                 ref={provided.innerRef}
                                 {...provided.droppableProps}
                              >
                                 {tasksInList.map((eachTask, index) => (
                                    <TaskItem
                                       taskDetails={eachTask}
                                       key={eachTask.id}
                                       index={index}
                                    />
                                 ))}
                                 {provided.placeholder}
                              </TasksListContainer>
                           )}
                        </Droppable>
                        <AddTaskPopupMainContainer>
                           <Popup
                              trigger={
                                 <AddTaskTextContainer>
                                    <BsPlus size={30} />
                                    <AddTaskBtn>
                                       {addTaskTriggerText}
                                    </AddTaskBtn>
                                 </AddTaskTextContainer>
                              }
                              open={addTaskModelState}
                              onOpen={handleAddTaskModalState}
                              onClose={handleAddTaskClose}
                              position='center center'
                              closeOnDocumentClick
                              arrow={false}
                           >
                              <AddTaskPopupContainer>
                                 <PopupTaskTitleInput
                                    onChange={event =>
                                       changeTaskNameInputVal(
                                          event.target.value
                                       )
                                    }
                                    value={taskNameInputVal}
                                 />
                                 <AddTaskAndCloseBtnsContainer>
                                    <AddTaskPopupBtn onClick={handleAddTask}>
                                       {addTaskBtnText}
                                    </AddTaskPopupBtn>
                                    <IoCloseSharp
                                       color='#64748B'
                                       size={26}
                                       onClick={handleAddTaskModalState}
                                       cursor={'pointer'}
                                    />
                                 </AddTaskAndCloseBtnsContainer>
                              </AddTaskPopupContainer>
                           </Popup>
                        </AddTaskPopupMainContainer>
                     </ColumnContainer>
                  )}
               </Draggable>
            </ColumnMainContainer>
         )
      }
      return <></>
   }
)

export default Column
