import styled from 'styled-components'

export const OrganizationPageContainer = styled.div`
   min-height: 100vh;
   position: relative;
   background: #0079bf;
`
export const OrganizationsContainer = styled.div`
   padding-left: 150px;
   padding-right: 150px;
   @media (max-width: 786px) {
      padding-left: 15px;
      padding-right: 15px;
   }
`
export const BoardsContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
`
export const WorkspaceHeadingContainer = styled.div`
   margin-top: 32px;
   margin-bottom: 127px;
   display: flex;
   align-items: center;
   justify-content: center;
   @media (max-width: 786px) {
      margin-bottom: 54px;
      justify-content: flex-start;
   }
`
export const WorkspaceInitialContainer = styled.div`
   background: linear-gradient(147.14deg, #ff8800 6.95%, #e63535 93.05%);
   border-radius: 4px;
   min-width: 56px;
   height: 56px;
   display: flex;
   align-items: center;
   justify-content: center;
   margin-right: 10px;
   @media (max-width: 786px) {
      margin-right: 5px;
   }
`

export const WorkspaceInitial = styled.p`
   font-family: 'Roboto';
   font-style: normal;
   font-weight: 600;
   font-size: 24px;
   line-height: 24px;
   color: #ffffff;
`
export const WorkspaceHeading = styled.h1`
   color: white;
   font-family: 'Inter';
   font-style: normal;
   font-weight: 600;
   font-size: 24px;
   line-height: 24px;
   @media (max-width: 786px) {
      font-size: 18px;
   }
`

export const WorkspaceBoardsText = styled.h2`
   font-family: 'Inter';
   font-style: normal;
   font-weight: 600;
   font-size: 24px;
   line-height: 24px;
   color: #ffffff;
`
export const WorkspaceBoardsTextContainer = styled.div`
   display: flex;
   align-items: center;
   margin-top: 32px;
   margin-bottom: 32px;
   @media (max-width: 786px) {
      justify-content: flex-start;
   }
`
