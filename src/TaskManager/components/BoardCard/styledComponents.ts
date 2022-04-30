import styled from 'styled-components'

export const BoardCardContainer = styled.div`
   background: #ffffff;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   width: 341px;
   height: 157px;
   left: 507px;
   top: 365px;
   border-radius: 4px;
   margin-right: 15px;
   margin-bottom: 15px;
   padding: 10px;
   text-align: center;
   color: #0079bf;
   @media (max-width: 380px) {
      width: 90vw;
   }
`
export const BoardName = styled.p`
   top: 432px;
   font-family: 'Inter';
   font-style: normal;
   font-weight: 500;
   font-size: 18px;
   line-height: 24px;
`
