import styled from 'styled-components'

export const BoardNameInput = styled.input`
   background: #a7b1bf;
   color: #f4f4f4;
   border-radius: 4px;
   font-family: 'Inter';
   font-style: normal;
   font-weight: 700;
   font-size: 16px;
   line-height: 20px;
   padding: 10px;
   width: 80%;
   ::placeholder,
   ::-webkit-input-placeholder {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
      color: #f4f4f4;
   }
`
export const CreateBoardBtnContainer = styled.div``
export const CreateBoardBtn = styled.button`
   display: flex;
   flex-direction: row;
   align-items: flex-start;
   padding: 12px 24px;
   position: static;
   background: #1d4ed8;
   border-radius: 4px;
   font-family: 'Inter';
   font-style: normal;
   font-weight: 600;
   font-size: 14px;
   line-height: 16px;
   color: #ffffff;
   margin-top: 32px;
   @media (max-width: 786px) {
      margin-top: 24px;
   }
`
export const ModalMainContainer = styled.div`
   @media (max-width: 786px) {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      width: 100vw;
   }
`
export const ModalContainer = styled.div`
   background: #ffffff;
   box-shadow: 0px 8px 40px rgba(0, 33, 89, 0.16);
   border-radius: 4px;
   padding: 24px 24px 48px 48px;
   display: flex;
   flex-direction: column;
   width: 514px;
   height: 245px;
   left: 463px;
   top: 390px;
   @media (max-width: 786px) {
      width: 100vw;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
      padding: 15px;
      height: auto;
   }
`

export const AddOrganizationContainer = styled.div`
   cursor: pointer;
   display: flex;
   align-items: center;
   justify-content: center;
   width: 341px;
   height: 157px;
   left: 507px;
   top: 365px;
   border-radius: 4px;
   background: #ffffff;
   :hover {
      background: #2fa9f1;
      color: #ffffff;
   }
   @media (max-width: 380px) {
      width: 90vw;
   }
`
export const AddOrganizationTriggerText = styled.p`
   font-family: 'Inter';
   font-style: normal;
   font-weight: 500;
   font-size: 18px;
   line-height: 24px;
   color: #475569;
`
export const WorkspaceName = styled.h2`
   font-family: 'Inter';
   font-style: normal;
   font-weight: 600;
   font-size: 16px;
   line-height: 24px;
   color: #475569;
   padding-top: 8px;
`
export const CloseIconContainer = styled.div`
   align-self: flex-end;
   padding: 6px;
`
