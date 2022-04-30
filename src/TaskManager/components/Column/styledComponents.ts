import styled from 'styled-components'
import TextareaAutosize from 'react-textarea-autosize'
import tw from 'twin.macro'

export const ColumnMainContainer = styled.div``

export const ColumnContainer = styled.div`
   ${tw`min-w-[254px] min-h-[100px] px-2.5 py-2 bg-[#ebecf0] rounded mr-2 flex flex-col flex-grow`};
`

export const ColumnNameAndActionsContainer = styled.div`
   ${tw`flex justify-between text-base items-center text-[#475569]`}
`
export const ColumnName = styled.p`
   font-family: 'Inter';
   ${tw`not-italic font-medium text-base text-[#475569]`};
`

export const ColumnActionsContainer = styled.div``

export const HideBtn = styled.button``
export const DeleteBtn = styled.button``

export const ActionsPopupTrigger = styled.p`
   ${tw`font-bold text-xl cursor-pointer`};
`
export const TasksListContainer = styled.div`
   ${tw`flex flex-col flex-grow-[1]`};
`
export const AddTaskPopupMainContainer = styled.div``

export const AddTaskTextContainer = styled.div`
   ${tw`cursor-pointer not-italic font-normal text-sm flex items-center text-[#475569] mt-2.5 hover:bg-[#cbd5e1] hover:rounded `}
   font-family: 'Inter';
`
export const AddTaskBtn = styled.button``

export const AddTaskPopupContainer = styled.div`
   ${tw`bg-[#ebecf0] w-[254px] p-2.5 mt-[60px] flex flex-col rounded-b`};
`

export const PopupTaskTitleInput = styled(TextareaAutosize)`
   ${tw`w-[230px] min-h-[50px] rounded p-1.5`};
`
export const AddTaskPopupBtn = styled.button`
   ${tw`bg-[#1d4ed8] rounded py-2 px-4 h-[32px] w-[95px]  text-sm font-semibold not-italic text-white text-center`}

   font-family: Inter;
   letter-spacing: 0px;
   font-family: 'Inter';
`
export const AddTaskAndCloseBtnsContainer = styled.div`
   ${tw`flex items-center mt-2.5`};
`
