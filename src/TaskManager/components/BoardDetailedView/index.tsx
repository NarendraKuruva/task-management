import React, { Component } from 'react'
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
@inject('taskManagementStore')
@observer
class BoardDetailedView extends Component<BoardProps> {
   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   componentDidMount() {
      // console.log('board-detailed-view')
      const { taskManagementStore } = this.getInjectedProps()
      const { getBoardDetails } = taskManagementStore

      const { match } = this.props
      const { params } = match
      const { id } = params
      getBoardDetails(id)
   }
   addNewColumn = () => {
      const { match } = this.props
      const { params } = match
      const { id } = params
      const { taskManagementStore } = this.getInjectedProps()
      const {
         columnNameInputVal,
         addColumn,
         getBoardDetails,
         setInputValueEmpty
      } = taskManagementStore
      addColumn(columnNameInputVal, id)
      setInputValueEmpty()
      getBoardDetails(id)
   }
   constructor(props) {
      super(props)
      this.onDragEnd = this.onDragEnd.bind(this)
   }
   findIndexInGiven = (list, val) => {
      const index = list.findIndex(each => each.id === val)
      return index
   }
   reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list)
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)

      return result
   }
   onDragEnd = result => {
      // console.log(result)
      const { taskManagementStore } = this.getInjectedProps()
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

         const startColumnIndex = this.findIndexInGiven(
            boardColumns,
            source.droppableId
         )
         const destinationColumnIndex = this.findIndexInGiven(
            boardColumns,
            destination.droppableId
         )

         const startColumn = boardColumns[startColumnIndex]
         const destinationColumn = boardColumns[destinationColumnIndex]

         const startColTasksList = startColumn.tasksInList
         const destinationColTasks = destinationColumn.tasksInList
         const movedTaskIndex = this.findIndexInGiven(
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
            updateTasksInList(boardColumns[startColumnIndex].id, newTasksList)

            const items = this.reorder(
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
         const items = this.reorder(
            boardColumns,
            source.index,
            destination.index
         )
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

   renderLoading = () => (
      <BoardDetailedViewMainContainer>
         <Header />
         <Loading />
      </BoardDetailedViewMainContainer>
   )

   renderBoardDetailedView = () => {
      const { taskManagementStore } = this.getInjectedProps()
      const {
         boardColumns,
         columnNameInputVal,
         onChangeColumnNameInput
      } = taskManagementStore
      return (
         <BoardDetailedViewMainContainer>
            <Header />
            <DragDropContext onDragEnd={this.onDragEnd}>
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
                                 onChange={onChangeColumnNameInput}
                              />
                              <AddColumnBtnAndCloseContainer>
                                 <AddColumnBtn
                                    onClick={this.addNewColumn}
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

   render() {
      const { taskManagementStore } = this.getInjectedProps()
      const { tasksApiStatus } = taskManagementStore
      switch (tasksApiStatus) {
         case 200:
            return this.renderBoardDetailedView()
         case 400:
            return this.renderLoading()
         default:
            return this.renderLoading()
      }
   }
}
export default BoardDetailedView
