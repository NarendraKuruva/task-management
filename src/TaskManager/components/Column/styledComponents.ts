import styled from 'styled-components'
import TextareaAutosize from 'react-textarea-autosize'

export const ColumnMainContainer = styled.div`
   // display: flex;
   // flex-direction: column;
`

export const ColumnContainer = styled.div`
   min-width: 254px;
   min-height: 100px;
   padding: 10px;
   background: #ebecf0;
   border-radius: 4px;
   margin-right: 10px;
   display: flex;
   flex-direction: column;
   max-height: 85vh;
`

export const ColumnNameAndActionsContainer = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   color: #475569;
`
export const ColumnName = styled.p`
   font-family: 'Inter';
   font-style: normal;
   font-weight: 500;
   font-size: 16px;
   line-height: 24px;
   color: #475569;
`

export const ActionsPopupTrigger = styled.p`
   font-size: 20px;
   font-weight: bold;
   cursor: pointer;
`
export const TasksListContainer = styled.div`
   overflow-y: auto;
   flex-grow: 1;
`

export const AddTaskTextContainer = styled.div`
   cursor: pointer;
   font-family: 'Inter';
   font-style: normal;
   font-weight: 400;
   font-size: 14px;
   line-height: 24px;
   display: flex;
   align-items: center;
   color: #475569;
   margin-top: 10px;
   :hover {
      background: #cbd5e1;
   }
`
export const AddTaskBtn = styled.button``

export const AddTaskPopupContainer = styled.div`
   background: #ebecf0;
   width: 254px;
   padding: 10px;
   margin-top: 60px;
   display: flex;
   flex-direction: column;
   border-bottom-left-radius: 4px;
   border-bottom-right-radius: 4px;
`

export const PopupTaskTitleInput = styled(TextareaAutosize)`
   width: 230px;
   min-height: 50px;
   border-radius: 4px;
   padding: 6px;
`
export const AddTaskPopupBtn = styled.button`
   background: #1d4ed8;
   border-radius: 4px;
   padding: 8px 16px;
   height: 32px;
   width: 95px;
   font-family: Inter;
   font-size: 14px;
   font-weight: 600;
   line-height: 16px;
   letter-spacing: 0px;
   text-align: center;
   font-family: 'Inter';
   font-style: normal;
   font-weight: 600;
   font-size: 14px;
   line-height: 16px;
   color: #ffffff;
`
export const AddTaskAndCloseBtnsContainer = styled.div`
   display: flex;
   align-items: center;
   margin-top: 10px;
`
