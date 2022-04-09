import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { inject, observer } from 'mobx-react'
import { BsPlus } from 'react-icons/bs'
import { IoCloseSharp } from 'react-icons/io5'
import Popup from 'reactjs-popup'
import ColumnsStore from '../../stores/ColumnsStore'
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

interface InjectedProps {
   columnsStore: ColumnsStore
}

interface BoardDetailsParams {
   id: string
}

const BoardDetailedView = inject('columnsStore')(
   observer(props => {
      const getInjectedProps = (): InjectedProps => props as InjectedProps
      const [columnNameInputVal, changecolumnNameInputVal] = useState('')
      const { columnsStore } = getInjectedProps()
      const { columnIdsList } = columnsStore
      console.log(useParams(), 'useParams')
      const { id } = useParams<BoardDetailsParams>()
      console.log(id)
      useEffect(() => {
         const { columnsStore } = getInjectedProps()
         const { getBoardColumns } = columnsStore
         getBoardColumns(id)
      }, [])

      const addNewColumn = () => {
         const { columnsStore } = getInjectedProps()
         const { addColumn } = columnsStore
         addColumn(columnNameInputVal, id)
         changecolumnNameInputVal('')
      }

      const reorder = (list, startIndex, endIndex) => {
         const result = list
         const [removed] = result.splice(startIndex, 1)
         result.splice(endIndex, 0, removed)

         return result
      }

      const onDragEnd = result => {
         // console.log(result)
         const { columnsStore } = getInjectedProps()
         if (result.type === 'task') {
            const {
               columnsList,
               updateTasksInList,
               updateTaskPosition,
               updateTaskList
            } = columnsStore
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
            // console.log(destinationColumn, startColumn)
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
            // console.log(movedTask)
            if (startColumn === destinationColumn) {
               // console.log('column-did not change')
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
            } = columnsStore

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

      const renderLoading = () => (
         <BoardDetailedViewMainContainer>
            <Header />
            <Loading />
         </BoardDetailedViewMainContainer>
      )

      const renderBoardDetailedView = () => {
         const { columnsStore } = getInjectedProps()
         const { columnsList } = columnsStore
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

      const { columnsListApiStatus } = columnsStore
      switch (columnsListApiStatus) {
         case 200:
            return renderBoardDetailedView()
         case 400:
            return renderLoading()
         default:
            return renderLoading()
      }
   })
)
export default getOrganizationsHOC(BoardDetailedView)
