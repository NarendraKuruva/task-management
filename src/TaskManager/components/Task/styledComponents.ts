import styled from 'styled-components'

export const TaskItemContainer = styled.div`
   background: #ffffff;
   box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.12);
   border-radius: 4px;
   padding: 10px;
   cursor: pointer;
   width: 230px;
   margin-top: 10px;
   :hover {
      background: #e3e3e4;
   }
`
export const TaskItemName = styled.p`
   font-family: 'Inter';
   font-style: normal;
   font-weight: 500;
   font-size: 14px;
   line-height: 24px;
   display: flex;
   align-items: center;
   color: #475569;
`
