import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import { BsPlus } from 'react-icons/bs'
import Popup from 'reactjs-popup'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { IoCloseSharp } from 'react-icons/io5'
import ColumnModel from '../../stores/models/ColumnModel'
import TaskManagementStore from '../../stores/TaskManagementStore'
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
   taskManagementStore: TaskManagementStore
}

const Column = inject('taskManagementStore')(
   observer((props: ColumnProps) => {
      const getInjectedProps = (): InjectedProps => props as InjectedProps

      const handleAddTask = () => {
         const { taskManagementStore } = getInjectedProps()
         const { addTask } = taskManagementStore
         const { columnDetails } = props
         const { id } = columnDetails
         addTask(taskNameInputVal, id)
         changeTaskNameInputVal('')
      }

      const getListStyle = () => ({
         display: 'flex',
         'flex-direction': 'column',
         'flex-grow': 1
      })

      const { columnDetails, index } = props
      const { id, columnName, tasksInList } = columnDetails
      const [taskNameInputVal, changeTaskNameInputVal] = useState('')

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
                              style={getListStyle()}
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
                           position='center center'
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
                                       onClick={close}
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
   })
)

export default Column
