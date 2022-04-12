import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { observer } from 'mobx-react'
import { BsPlus } from 'react-icons/bs'
import { IoCloseSharp } from 'react-icons/io5'
import Popup from 'reactjs-popup'

import { ColumnsContext } from '../../../Common/stores/index.context'

import Header from '../Header'
import Loading from '../LoadingPage'
import Column from '../Column'
import getOrganizationsHOC from '../HOC'

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

interface BoardDetailsParams {
   id: string
}
interface DragEndResultTypes {
   draggableId: string
   type: string
   source: {
      index: number
      droppableId: string
   }
   reason: string
   mode: string
   destination: {
      droppableId: string
      index: number
   }
   combine: null
}

const addAnotherListContainerText = 'Add another list'
const addListBtnText = 'Add List'

const BoardDetailedView = observer(
   (): JSX.Element => {
      const [columnNameInputVal, changecolumnNameInputVal] = useState('')
      const [addColumnModalState, updateAddColumnModalState] = useState(false)
      const columnContextObj = useContext(ColumnsContext)
      const { id } = useParams<BoardDetailsParams>()

      useEffect((): void => {
         const { getBoardColumns } = columnContextObj
         getBoardColumns(id)
      }, [])

      const handleAddColumnModalState = (): void => {
         updateAddColumnModalState(!addColumnModalState)
      }

      const handleCloseAddColModal = (): void => {
         updateAddColumnModalState(false)
         changecolumnNameInputVal('')
      }

      const addNewColumn = (): void => {
         const { addColumn } = columnContextObj
         addColumn(columnNameInputVal, id)
         changecolumnNameInputVal('')
         handleAddColumnModalState()
      }

      const reorder = (list, startIndex, endIndex) => {
         const result = list
         const [removed] = result.splice(startIndex, 1)
         result.splice(endIndex, 0, removed)

         return result
      }

      const onDragEnd = (result: DragEndResultTypes): void => {
         console.log(result)
         if (!result.destination || !result.source) {
            return
         }
         if (result.type === 'task') {
            const {
               columnsList,
               updateTasksInList,
               updateTaskPosition,
               updateTaskList
            } = columnContextObj
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

            const startColumn = columnsList.get(source.droppableId)
            const destinationColumn = columnsList.get(destination.droppableId)
            if (startColumn === undefined || destinationColumn === undefined) {
               return
            }
            const startColTasksMap = startColumn.tasksMap
            const startColTasksList = Array.from(startColTasksMap.values())
            const destinationColTasksMap = destinationColumn.tasksMap
            const destinationColTasks = Array.from(
               destinationColTasksMap.values()
            )
            const movedTask = startColTasksMap.get(draggableId)
            if (movedTask === undefined) {
               return
            }
            if (startColumn === destinationColumn) {
               const newTasksList = Array.from(startColumn.tasksMap.values())
               newTasksList.splice(source.index, 1)
               newTasksList.splice(destination.index, 0, movedTask)

               const updatedTasksMap = new Map()
               newTasksList.map(eachTask =>
                  updatedTasksMap.set(eachTask.id, eachTask)
               )

               updateTasksInList(startColumn.id, updatedTasksMap)

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
                  const firstPosition = items[destination.index + 1].pos
                  const secondPosition = items[destination.index - 1].pos
                  finalPos = (firstPosition + secondPosition) / 2
               }
               updateTaskPosition(draggableId, finalPos)
            } else {
               const newStartTasksList = Array.from(startColTasksList)
               newStartTasksList.splice(source.index, 1)
               const updatedStartTasksMap = new Map()
               newStartTasksList.map(eachTask =>
                  updatedStartTasksMap.set(eachTask.id, eachTask)
               )
               const newDestinationColTasks = Array.from(destinationColTasks)
               newDestinationColTasks.splice(destination.index, 0, movedTask)
               const updatedDestinationColTasksMap = new Map()

               newDestinationColTasks.map(eachTask =>
                  updatedDestinationColTasksMap.set(eachTask.id, eachTask)
               )

               updateTasksInList(startColumn.id, updatedStartTasksMap)
               updateTasksInList(
                  destinationColumn.id,
                  updatedDestinationColTasksMap
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
               columnsList,
               updateColumnOrder,
               updateColumnPosition
            } = columnContextObj

            const { source, destination, draggableId } = result
            const columnsArray = Array.from(columnsList.values())
            const items = reorder(columnsArray, source.index, destination.index)
            const updatedColsMap = new Map()
            for (const each of items) {
               updatedColsMap.set(each.id, each)
            }
            updateColumnOrder(updatedColsMap)
            let finalPosition!: string | number
            if (destination.index === 0) {
               finalPosition = 'top'
            } else if (destination.index === items.length - 1) {
               finalPosition = 'bottom'
            } else {
               const firstPosition = items[destination.index + 1].pos
               const secondPosition = items[destination.index - 1].pos
               finalPosition = (firstPosition + secondPosition) / 2
            }
            updateColumnPosition(draggableId, finalPosition)
         }
      }

      const renderLoading = (): JSX.Element => (
         <BoardDetailedViewMainContainer>
            <Header />
            <Loading />
         </BoardDetailedViewMainContainer>
      )

      const renderBoardDetailedView = (): JSX.Element => {
         const { columnsList } = columnContextObj
         const columnsListArray = Array.from(columnsList.values())
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
                              {columnsListArray.map((eachCol, index) => (
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
                                 <AddColumnText>
                                    {addAnotherListContainerText}
                                 </AddColumnText>
                              </AddColumnContainer>
                           }
                           position='center center'
                           on='click'
                           open={addColumnModalState}
                           onOpen={handleAddColumnModalState}
                           onClose={handleCloseAddColModal}
                           closeOnDocumentClick
                           mouseLeaveDelay={300}
                           mouseEnterDelay={0}
                           arrow={false}
                        >
                           <AddListPopupContainer>
                              <AddColumnNameInput
                                 value={columnNameInputVal}
                                 onChange={event =>
                                    changecolumnNameInputVal(event.target.value)
                                 }
                              />
                              <AddColumnBtnAndCloseContainer>
                                 <AddColumnBtn
                                    onClick={addNewColumn}
                                    type='button'
                                 >
                                    {addListBtnText}
                                 </AddColumnBtn>
                                 <IoCloseSharp
                                    color='#64748B'
                                    size={26}
                                    onClick={handleAddColumnModalState}
                                    cursor={'pointer'}
                                 />
                              </AddColumnBtnAndCloseContainer>
                           </AddListPopupContainer>
                        </Popup>
                     </AddListPopupMainContainer>
                  </ColumnsContainer>
               </DragDropContext>
            </BoardDetailedViewMainContainer>
         )
      }

      const { columnsListApiStatus } = columnContextObj
      switch (columnsListApiStatus) {
         case 200:
            return renderBoardDetailedView()
         case 400:
            return renderLoading()
         default:
            return renderLoading()
      }
   }
)
export default getOrganizationsHOC(BoardDetailedView)
