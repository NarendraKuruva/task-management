import styled from 'styled-components'
import tw from 'twin.macro'

export const BoardDetailedViewMainContainer = styled.div`
   ${tw`min-h-full bg-[#0079bf]`};
`

export const ColumnsContainer = styled.div`
   ${tw`min-w-full pr-12 pl-12 pt-6 flex flex-row overflow-auto h-[90vh] bg-[#0079bf]`};
`
export const ColumnsListContainer = styled.div`
   ${tw`flex`};
`
export const AddListPopupMainContainer = styled.div``
export const AddColumnContainer = styled.div`
   ${tw`cursor-pointer rounded text-white p-2.5 mr-2.5 flex items-center bg-[#2c90d0] w-[254px]`};
`
export const AddColumnText = styled.p`
   font-family: 'Inter';
   ${tw`not-italic font-normal text-sm text-white`};
`

export const AddListPopupContainer = styled.div`
   ${tw`py-2 px-4 rounded mt-[60px] bg-[#ebecf0] w-[254px]`}
`
export const AddColumnNameInput = styled.input`
   ${tw`border border-solid box-border rounded px-2.5 py-1.5 border-[ #0967d2] w-[222px]`};
`
export const AddColumnBtnAndCloseContainer = styled.div`
   ${tw`flex items-center mt-3.5`}
`
export const AddColumnBtn = styled.button`
   ${tw`px-4 py-2 rounded not-italic font-semibold text-sm text-center text-white bg-[#1d4ed8] mr-2.5`}
   font-family: 'Inter';
`
