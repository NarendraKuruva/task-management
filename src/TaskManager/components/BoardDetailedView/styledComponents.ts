import styled from 'styled-components'

export const BoardDetailedViewMainContainer = styled.div`
   background: #0079bf;
   min-height: 100vh;
`

export const ColumnsContainer = styled.div`
   display: flex;
   flex-direction: row;
   padding-top: 20px;
   padding-left: 38px;
   min-width: 100vw;
   height: 90vh;
   background: #0079bf;
   overflow: auto;
`
export const ColumnsListContainer = styled.div`
   display: flex;
`
export const AddListPopupMainContainer = styled.div``
export const AddColumnContainer = styled.div`
   cursor: pointer;
   // margin-top: 20px;
   background: #2c90d0;
   border-radius: 4px;
   color: #ffffff;
   width: 254px;
   padding: 10px;
   margin-right: 10px;
   display: flex;
   align-items: center;
`
export const AddColumnText = styled.p`
   font-family: 'Inter';
   font-style: normal;
   font-weight: 400;
   font-size: 14px;
   color: #ffffff;
`

export const AddListPopupContainer = styled.div`
   margin-top: 60px;
   width: 254px;
   padding: 10px;
   background: #ebecf0;
   border-radius: 4px;
`
export const AddColumnNameInput = styled.input`
   border: 1px solid #0967d2;
   box-sizing: border-box;
   border-radius: 4px;
   width: 222px;
   padding-left: 10px;
   padding-right: 10px;
   padding-bottom: 5px;
   padding-top: 5px;
`
export const AddColumnBtnAndCloseContainer = styled.div`
   display: flex;
   align-items: center;
   margin-top: 15px;
`
export const AddColumnBtn = styled.button`
   padding: 8px 16px;
   background: #1d4ed8;
   border-radius: 4px;
   font-family: 'Inter';
   font-style: normal;
   font-weight: 600;
   font-size: 14px;
   line-height: 16px;
   text-align: center;
   color: #ffffff;
`
