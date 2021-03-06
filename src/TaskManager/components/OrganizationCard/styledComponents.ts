import styled from 'styled-components'

export const OrganizationCardContainer = styled.div`
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
   margin-right: 16px;
   margin-bottom: 16px;
   @media (max-width: 380px) {
      width: 90vw;
   }
`
export const OrganizationName = styled.p`
   font-family: 'Inter';
   font-style: normal;
   font-weight: 500;
   font-size: 18px;
   line-height: 24px;
   color: #0079bf;
`
