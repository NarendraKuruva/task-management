import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { History } from 'history'
import { inject, observer } from 'mobx-react'
import { match } from 'react-router-dom'
import { BsPlus } from 'react-icons/bs'
import { IoCloseSharp } from 'react-icons/io5'
import Popup from 'reactjs-popup'
import TaskManagementStore from '../../stores/TaskManagementStore'
import Header from '../Header'
import Loading from '../LoadingPage'
import Column from '../Column'
import {
   AddColumnBtn,
   AddColumnBtnAndCloseContainer,
   AddColumnContainer,
   AddColumnNameInput,
   AddColumnText,
   AddListPopupContainer,
   AddListPopupMainContainer,
   BoardDetailedViewMainContainer,
   ColumnsContainer,
   ColumnsListContainer
} from './styledComponents'
interface BoardProps {
   match: match<Params>
   history: History
}

interface Params {
   id: string
}
interface InjectedProps extends BoardProps {
   taskManagementStore: TaskManagementStore
}

const BoardDetailedView = inject('taskManagementStore')(
   observer((props: BoardProps) => {
      const getInjectedProps = (): InjectedProps => props as InjectedProps
      const [columnNameInputVal, changecolumnNameInputVal] = useState('')
      const { taskManagementStore } = getInjectedProps()

      useEffect(() => {
         const { taskManagementStore } = getInjectedProps()
         const { getBoardDetails } = taskManagementStore

         const { match } = props
         const { params } = match
         const { id } = params
         console.log('board-detailed-view', id)
         getBoardDetails(id)
      })
      const addNewColumn = () => {
         const { match } = props
         const { params } = match
         const { id } = params
         const { taskManagementStore } = getInjectedProps()
         const { addColumn, getBoardDetails } = taskManagementStore
         addColumn(columnNameInputVal, id)
         changecolumnNameInputVal('')
         getBoardDetails(id)
      }

      // const onDragEnd = onDragEnd.bind(this)

      const findIndexInGiven = (list, val) => {
         const index = list.findIndex(each => each.id === val)
         return index
      }
      const reorder = (list, startIndex, endIndex) => {
         const result = Array.from(list)
         const [removed] = result.splice(startIndex, 1)
         result.splice(endIndex, 0, removed)

         return result
      }
      const onDragEnd = result => {
         // console.log(result)
         const { taskManagementStore } = getInjectedProps()
         if (result.type === 'task') {
            const {
               boardColumns,
               updateTasksInList,
               updateTaskPosition,
               updateTaskList
            } = taskManagementStore
            const { destination, source, draggableId } = result
            if (!destination) {
               return
            }
            if (
               destination.droppableId === source.droppableId &&
               destination.index === source.index
            ) {
               return
            }

            const startColumnIndex = findIndexInGiven(
               boardColumns,
               source.droppableId
            )
            const destinationColumnIndex = findIndexInGiven(
               boardColumns,
               destination.droppableId
            )

            const startColumn = boardColumns[startColumnIndex]
            const destinationColumn = boardColumns[destinationColumnIndex]

            const startColTasksList = startColumn.tasksInList
            const destinationColTasks = destinationColumn.tasksInList
            const movedTaskIndex = findIndexInGiven(
               startColTasksList,
               draggableId
            )

            if (startColumn === destinationColumn) {
               const newTasksList = Array.from(startColumn.tasksInList)
               newTasksList.splice(source.index, 1)
               newTasksList.splice(
                  destination.index,
                  0,
                  startColTasksList[movedTaskIndex]
               )
               updateTasksInList(
                  boardColumns[startColumnIndex].id,
                  newTasksList
               )

               const items = reorder(
                  startColTasksList,
                  source.index,
                  destination.index
               )

               let finalPos
               if (destination.index === 0) {
                  finalPos = 'top'
               } else if (destination.index === items.length - 1) {
                  finalPos = 'bottom'
               } else {
                  // @ts-expect-error:testing purpose
                  const firstPosition = items[destination.index + 1].pos
                  // @ts-expect-error:testing purpose
                  const secondPosition = items[destination.index - 1].pos
                  finalPos = (firstPosition + secondPosition) / 2
               }
               updateTaskPosition(draggableId, finalPos)
            } else {
               const newStartTasksList = Array.from(startColTasksList)
               newStartTasksList.splice(source.index, 1)

               const newDestinationColTasks = Array.from(destinationColTasks)
               newDestinationColTasks.splice(
                  destination.index,
                  0,
                  startColTasksList[movedTaskIndex]
               )

               updateTasksInList(
                  boardColumns[startColumnIndex].id,
                  newStartTasksList
               )
               updateTasksInList(
                  boardColumns[destinationColumnIndex].id,
                  newDestinationColTasks
               )

               const items = newDestinationColTasks

               let finalPos
               if (destination.index === 0) {
                  finalPos = 'top'
               } else if (destination.index === items.length - 1) {
                  finalPos = 'bottom'
               } else {
                  const firstPosition = items[destination.index + 1].pos

                  const secondPosition = items[destination.index - 1].pos

                  finalPos = (firstPosition + secondPosition) / 2
               }

               updateTaskList(draggableId, destination.droppableId)

               updateTaskPosition(draggableId, finalPos)
            }
         }
         if (result.type === 'column') {
            const {
               boardColumns,
               updateColumnOrder,
               updateColumnPosition
            } = taskManagementStore
            const { source, destination, draggableId } = result
            const items = reorder(boardColumns, source.index, destination.index)
            updateColumnOrder(items)

            let finalPosition
            if (destination.index === 0) {
               finalPosition = 'top'
            } else if (destination.index === items.length - 1) {
               finalPosition = 'bottom'
            } else {
               // @ts-expect-error:testing purpose
               const firstPosition = items[destination.index + 1].pos
               // @ts-expect-error:testing purpose
               const secondPosition = items[destination.index - 1].pos
               finalPosition = (firstPosition + secondPosition) / 2
            }
            updateColumnPosition(draggableId, finalPosition)
         }
      }

      const renderLoading = () => (
         <BoardDetailedViewMainContainer>
            <Header />
            <Loading />
         </BoardDetailedViewMainContainer>
      )
      // df
      const renderBoardDetailedView = () => {
         const { taskManagementStore } = getInjectedProps()
         const { boardColumns } = taskManagementStore
         return (
            <BoardDetailedViewMainContainer>
               <Header />
               <DragDropContext onDragEnd={onDragEnd}>
                  <ColumnsContainer>
                     <Droppable
                        droppableId={'droppableId'}
                        type='column'
                        direction='horizontal'
                     >
                        {provided => (
                           <ColumnsListContainer
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                           >
                              {boardColumns.map((eachCol, index) => (
                                 <Column
                                    columnDetails={eachCol}
                                    key={eachCol.id}
                                    index={index}
                                 />
                              ))}
                              {provided.placeholder}
                           </ColumnsListContainer>
                        )}
                     </Droppable>
                     <AddListPopupMainContainer>
                        <Popup
                           trigger={
                              <AddColumnContainer>
                                 <BsPlus size={25} />
                                 <AddColumnText>Add another list</AddColumnText>
                              </AddColumnContainer>
                           }
                           position='center center'
                           on='click'
                           closeOnDocumentClick
                           mouseLeaveDelay={300}
                           mouseEnterDelay={0}
                           arrow={false}
                        >
                           {close => (
                              <AddListPopupContainer>
                                 <AddColumnNameInput
                                    value={columnNameInputVal}
                                    onChange={event =>
                                       changecolumnNameInputVal(
                                          event.target.value
                                       )
                                    }
                                 />
                                 <AddColumnBtnAndCloseContainer>
                                    <AddColumnBtn
                                       onClick={addNewColumn}
                                       type='button'
                                    >
                                       Add List
                                    </AddColumnBtn>
                                    <IoCloseSharp
                                       color='#64748B'
                                       size={26}
                                       onClick={close}
                                       cursor={'pointer'}
                                    />
                                 </AddColumnBtnAndCloseContainer>
                              </AddListPopupContainer>
                           )}
                        </Popup>
                     </AddListPopupMainContainer>
                  </ColumnsContainer>
               </DragDropContext>
            </BoardDetailedViewMainContainer>
         )
      }

      // const { taskManagementStore } = getInjectedProps()
      const { tasksApiStatus } = taskManagementStore
      switch (tasksApiStatus) {
         case 200:
            return renderBoardDetailedView()
         case 400:
            return renderLoading()
         default:
            return renderBoardDetailedView()
      }
   })
)
export default BoardDetailedView
