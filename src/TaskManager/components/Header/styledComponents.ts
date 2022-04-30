import styled from 'styled-components'

export const HeaderContainer = styled.div`
   height: 90px;
   background: #0067a3;
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding-left: 48px;
   padding-right: 48px;
   @media (max-width: 786px) {
      height: 56px;
      padding-left: 15px;
      padding-right: 15px;
   }
`
export const OrganizationAndBoardsContainer = styled.div`
   display: flex;
   cursor: pointer;
`

export const HomeIconContainer = styled.div`
   -webkit-tap-highlight-color: red;
   :focus {
      outline: 0;
      box-shadow: none;
   }
   margin-right: 12px;
   width: 41px;
   height: 41px;
   left: 48px;
   top: 25px;
   background: #4e97c2;
   border-radius: 4px;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   @media (max-width: 786px) {
      margin-right: 8px;
      width: 24px;
      height: 24px;
   }
`
export const HomeIconImg = styled.img`
   width: 24px;
   @media (max-width: 786px) {
      width: 13px;
      height: 13.33px;
   }
`
export const OrganizationContainer = styled.div`
   width: 24px;
   height: 24px;
   border-radius: 4px;

   background: #4e97c2;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   margin-right: 8px;
   @media (min-width: 786px) {
      display: none;
   }
`
export const OrganizationIconImg = styled.img`
   color: #ffffff;
`

export const OrganizationsTriggerContainer = styled.div`
   display: flex;
`
export const OrganizationsContainer = styled.div`
   color: #ffffff;
   padding: 9px 16px 9px 16px;
   width: 160px;
   background: #4e97c2;
   border-radius: 4px;
   margin-right: 12px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   @media (max-width: 786px) {
      display: none;
   }
`
export const OrganizationsTriggerText = styled.p`
   font-family: 'HK Grotesk';
   font-style: normal;
   font-weight: 600;
   font-size: 16px;
   line-height: 24px;
`
export const OrganizationItemContainer = styled.div`
   cursor: pointer;
   width: 288px;
   height: 40px;
   left: 16px;
   top: 64px;
   border: 1px solid #eeeeee;
   box-sizing: border-box;
   border-radius: 4px;
   display: flex;
   align-items: center;
   margin-bottom: 10px;
   background: ${props => (props.isActive ? '#E0EFF7' : '#ffffff')};
   border-left: 39px solid #0079bf;
`
export const OrganizationItemIndicator = styled.div`
   width: 
   height: 40px;
   left: 16px;
   top: 64px;
   background: #0079bf;
   border-radius: 4px 0px 0px 4px;
`
export const OrganizationSelectItem = styled.li`
   list-style-type: none;
   font-family: 'Inter';
   font-style: normal;
   font-weight: 600;
   font-size: 16px;
   line-height: 24px;
   color: #475569;
   padding-left: 15px;
`
export const OrganizationsListMainContainer = styled.div``

export const OrganizationsListContainer = styled.div`
   height: auto;
   background: #ffffff;
   border: 1px solid #cbd2d9;
   box-sizing: border-box;
   box-shadow: 0px 4px 16px rgba(123, 135, 148, 0.16);
   border-radius: 4px;
   padding: 15px;
   display: flex;
   flex-direction: column;
   @media (max-width: 786px) {
      border-bottom-right-radius: 0px;
      border-bottom-left-radius: 0px;
      box-shadow: none;
   }
`
export const PoputTriggerContainer = styled.div`
   display: flex;
`

export const OrganizationsCloseIconContainer = styled.div`
   align-self: flex-end;
`
export const WorkspaceTextDecoration = styled.p`
   font-family: 'Inter';
   font-style: normal;
   font-weight: 700;
   font-size: 12px;
   line-height: 16px;
   letter-spacing: 0.4px;
   text-transform: uppercase;
   color: #7b8794;
   margin-bottom: 10px;
`
export const BoardsContainer = styled.div`
   width: 136px;
   height: 41px;
   left: 273px;
   top: 26px;
   background: #4e97c2;
   border-radius: 4px;
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 8px 16px;
   @media (max-width: 786px) {
      justify-content: center;
      width: 24px;
      height: 24px;
      left: 72px;
      top: 16px;
      padding: 0px;
   }
`
export const BoardsLogoImg = styled.img`
   width: 24px;
   height: 24px;
   left: 289px;
   top: 34px;
   @media (max-width: 786px) {
      width: 16px;
      height: 16px;
      left: 76px;
      top: 20px;
   }
`
export const BoardsText = styled.p`
   font-family: 'Inter';
   font-style: normal;
   font-weight: 500;
   font-size: 20px;
   line-height: 24px;
   color: #ffffff;
   @media (max-width: 786px) {
      display: none;
   }
`
export const AppNameContainer = styled.div`
   display: flex;
   align-items: center;
`
export const LogoImg = styled.img`
   width: 24px;
   height: 24px;
   left: 628px;
   top: 33px;
   margin-right: 8px;
   @media (max-width: 786px) {
      width: 16px;
      height: 16px;
      left: 141px;
      top: 21px;
   }
`
export const AppName = styled.p`
   width: 152px;
   height: 42px;
   left: 660px;
   top: 24px;
   font-family: 'Pacifico';
   font-style: normal;
   font-weight: 400;
   font-size: 24px;
   line-height: 42px;
   display: flex;
   align-items: center;
   text-align: center;
   color: #4e97c2;
   @media (max-width: 786px) {
      width: 89px;
      height: 25px;
      left: 161px;
      top: 16px;
      font-size: 14px;
      line-height: 25px;
   }
`
export const SearchAndLogoutContainer = styled.div`
   display: flex;
   align-items: center;
`
export const SearchContainer = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 8px 16px;
   width: 264px;
   height: 40px;
   left: 0px;
   top: 0px;
   background: #4e97c2;
   border-radius: 4px;
   margin-right: 12px;
   @media (max-width: 786px) {
      display: none;
   }
`
export const StyledSearchInput = styled.input`
   background: transparent;
   ::placeholder,
   ::-webkit-input-placeholder {
      color: #ffffff;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      opacity: 0.8;
      margin: 0px 4px;
   }
`
export const SearchIconContainer = styled(HomeIconContainer)`
   margin-left: 8px;
   @media (min-width: 786px) {
      display: none;
   }
`

export const LogoutText = styled.p`
   font-family: 'Inter';
   font-style: normal;
   font-weight: 500;
   font-size: 18px;
   line-height: 24px;
   color: #ffffff;
   margin-right: 12px;
   cursor: pointer;
   @media (max-width: 786px) {
      left: 73.06%;
      right: 12.22%;
      top: 2.5%;
      bottom: 93.75%;
      font-size: 14px;
   }
`

export const ProfileContainer = styled.div`
   width: 41px;
   height: 41px;
   display: flex;
   align-items: center;
   justify-content: center;
   background: #bae3ff;
   border-radius: 100px;
   @media (max-width: 786px) {
      width: 24px;
      height: 24px;
      left: 320px;
      top: 16px;
   }
`

export const ProfileInitials = styled.p`
   font-family: 'HK Grotesk';
   font-style: normal;
   font-weight: 600;
   font-size: 16px;
   line-height: 24px;
   color: #0967d2;
   @media (max-width: 786px) {
      width: 18px;
      height: 24px;
      left: 323px;
      top: 16px;
      font-size: 12px;
   }
`
