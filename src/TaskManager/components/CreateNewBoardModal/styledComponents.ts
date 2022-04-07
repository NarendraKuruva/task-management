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
      width: 116px;
      height: 20px;
      left: 528px;
      top: 448px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
      text-align: center;
      color: #f4f4f4;
   }
`
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
   margin-top: 30px;
   @media (max-width: 786px) {
      margin-bottom: 5px;
      margin-top: 10px;
   }
`
export const CreateBoardModalContainer = styled.div`
   position: absolute;
   left: 0%;
   right: 0%;
   top: 0%;
   bottom: 0%;
   background: #ffffff;
   box-shadow: 0px 8px 40px;
   border-radius: 4px;
   width: 50vw;
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
   box-shadow: 0px 8px 40px;
   border-radius: 4px;
   padding: 30px;
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

export const CloseBtn = styled.button`
   align-self: flex-end;
`

export const AddBoardContainer = styled.div`
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
   margin: 5px;
   :hover {
      background: #2fa9f1;
      color: #ffffff;
   }
   @media (max-width: 380px) {
      width: 90vw;
   }
`
