import styled from 'styled-components'

export const HomePageContainer = styled.div`
   min-height: 100vh;
   position: relative;
   background: #0079bf;
`

export const OrganizationsListContainer = styled.div`
   display: flex;
   @media (max-width: 786px) {
      justify-content: center;
   }

   flex-wrap: wrap;
`
export const OrganizationsHeadingContainer = styled.div`
   display: flex;
   align-items: center;
   @media (max-width: 786px) {
      justify-content: center;
   }
`
export const OrganizationsHeading = styled.h1`
   color: white;
   font-family: 'Inter';
   font-style: normal;
   font-weight: 600;
   font-size: 24px;
   line-height: 24px;
   align-self: flex-start;
   margin-top: 32px;
   margin-bottom: 32px;
   margin-left: 10px;
`

export const OrganizationsListAndHeadingContainer = styled.div``
export const OrganizationsListMainContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   padding-left: 30px;
   padding-right: 30px;
   @media (max-width: 786px) {
      padding-left: 15px;
      padding-right: 15px;
   }
`
