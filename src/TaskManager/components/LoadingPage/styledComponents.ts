import styled from 'styled-components'

export const LoadingMainContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   height: 90vh;
`

export const LoadingContainer = styled.div`
   background: linear-gradient(#0079bf 0 0) padding-box,
      linear-gradient(90.09deg, #039eff, #3998dc, #407ac8) border-box;
   padding: 10px;
   padding-left: 15px;
   padding-top: 70px;
   padding-bottom: 70px;
   border: 10px solid transparent;
   border-radius: 100px;
   display: flex;
   align-items: flex-end;
   width: 210px;
   height: 207px;
`

export const LoadingText = styled.h1`
   font-family: 'Inter';
   font-style: normal;
   font-weight: 600;
   font-size: 32px;
   line-height: 39px;
   letter-spacing: 0.025em;
   color: #ffffff;
`
