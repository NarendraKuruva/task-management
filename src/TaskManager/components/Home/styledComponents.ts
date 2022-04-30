import styled from 'styled-components'

export const HomePageContainer = styled.div`
   min-height: 100vh;
   background: #0079bf;
`

export const OrganizationsListContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
`
export const OrganizationsHeadingContainer = styled.div`
   display: flex;
   align-items: center;
   margin-top: 123px;
   margin-bottom: 32px;
`
export const OrganizationsHeading = styled.h1`
   color: white;
   font-family: 'Inter';
   font-style: normal;
   font-weight: 600;
   font-size: 24px;
   line-height: 24px;
   align-self: flex-start;

   margin-left: 10px;
`

export const OrganizationsListAndHeadingContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   padding-left: 16px;
   padding-right: 16px;
`
export const OrganizationsListMainContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   padding-left: 150px;
   padding-right: 150px;
   @media (max-width: 786px) {
      padding-left: 1px;
      padding-right: 16px;
   }
`
