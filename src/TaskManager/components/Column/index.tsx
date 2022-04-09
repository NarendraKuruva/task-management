import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import { BsPlus } from 'react-icons/bs'
import Popup from 'reactjs-popup'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { IoCloseSharp } from 'react-icons/io5'
import ColumnModel from '../../stores/models/ColumnModel'
import ColumnsStore from '../../stores/ColumnsStore'
import TaskItem from '../Task'
import {
   ActionsPopupTrigger,
   AddTaskAndCloseBtnsContainer,
   AddTaskBtn,
   AddTaskPopupBtn,
   AddTaskPopupContainer,
   AddTaskTextContainer,
   ColumnContainer,
   ColumnMainContainer,
   ColumnName,
   ColumnNameAndActionsContainer,
   PopupTaskTitleInput,
   TasksListContainer
} from './styledComponents'

interface ColumnProps {
   columnDetails: ColumnModel
   index: number
}

interface InjectedProps extends ColumnProps {
   columnsStore: ColumnsStore
}

const Column = inject('columnsStore')(
   observer((props: ColumnProps) => {
      const getInjectedProps = (): InjectedProps => props as InjectedProps
      const [taskNameInputVal, changeTaskNameInputVal] = useState('')

      const handleAddTask = () => {
         const { columnsStore } = getInjectedProps()
         const { addTask } = columnsStore
         const { columnDetails } = props
         const { id } = columnDetails
         addTask(taskNameInputVal, id)
         changeTaskNameInputVal('')
         handleModalState()
      }

      // const renderTasksList = () => {
      //    return
      // }

      const [modelState, updateState] = useState(false)
      const handleModalState = () => {
         updateState(!modelState)
         console.log(modelState)
      }

      const { columnDetails, index } = props
      const { id, columnName, tasksMap } = columnDetails
      const { columnsStore } = getInjectedProps()
      const { columnsList } = columnsStore
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
                                 <ActionsPopupTrigger>...</ActionsPopupTrigger>
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
                              <div>
                                 <p>Hide</p>
                                 <p>Delete</p>
                              </div>
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
                        <div>
                           <Popup
                              trigger={
                                 <AddTaskTextContainer>
                                    <BsPlus size={30} />

                                    <AddTaskBtn>Add a task</AddTaskBtn>
                                 </AddTaskTextContainer>
                              }
                              open={modelState}
                              onOpen={handleModalState}
                              // position='center center'
                              closeOnDocumentClick
                              arrow={false}
                           >
                              {close => (
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
                                          Add Task
                                       </AddTaskPopupBtn>
                                       <IoCloseSharp
                                          color='#64748B'
                                          size={26}
                                          onClick={handleModalState}
                                          cursor={'pointer'}
                                       />
                                    </AddTaskAndCloseBtnsContainer>
                                 </AddTaskPopupContainer>
                              )}
                           </Popup>
                        </div>
                     </ColumnContainer>
                  )}
               </Draggable>
            </ColumnMainContainer>
         )
      } else {
         return <></>
      }
   })
)

export default Column
