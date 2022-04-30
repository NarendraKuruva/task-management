import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

import TaskModel from '../../stores/models/TaskModel'

import { TaskItemContainer, TaskItemName } from './styledComponents'

interface TaskItemProps {
   taskDetails: TaskModel
   index: number
}

const TaskItem = (props: TaskItemProps): JSX.Element => {
   const { index, taskDetails } = props
   const { name, id } = taskDetails

   return (
      <Draggable key={id} draggableId={id} index={index}>
         {(provided, snapshot) => (
            <TaskItemContainer
               isDragging={snapshot.isDragging}
               ref={provided.innerRef}
               {...provided.draggableProps}
               {...provided.dragHandleProps}
            >
               <TaskItemName>{name}</TaskItemName>
            </TaskItemContainer>
         )}
      </Draggable>
   )
}

export default TaskItem
