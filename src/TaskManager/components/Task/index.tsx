import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import TaskModel from '../../stores/models/TaskModel'
import { TaskItemContainer } from './styledComponents'

interface TaskItemProps {
   taskDetails: TaskModel
   index: number
}

const TaskItem = (props: TaskItemProps) => {
   const { index, taskDetails } = props
   const { name, id } = taskDetails

   return (
      <Draggable key={id} draggableId={id} index={index}>
         {provided => (
            <TaskItemContainer
               ref={provided.innerRef}
               {...provided.draggableProps}
               {...provided.dragHandleProps}
            >
               <p>{name}</p>
            </TaskItemContainer>
         )}
      </Draggable>
   )
}

export default TaskItem
