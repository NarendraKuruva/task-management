import styled from 'styled-components'

export const LoginFormContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   align-items: center;
   background-color: #0067a3;
   width: 100%;
   height: 100vh;
`

export const TitleContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
`

export const LoginWebsiteTitleLogo = styled.img`
   width: 32px;
   height: 32px;
   margin-right: 8px;
   @media screen and (min-width: 768px) {
      width: 48px;
      height: 48px;
   }
`

export const Title = styled.h1`
   color: #ffffff;
   font-family: 'Pacifico';
   font-size: 24px;
   @media screen and (min-width: 768px) {
      font-size: 48px;
   }
`
export const FormContainer = styled.form`
   display: flex;
   flex-direction: column;
   align-items: center;
   background-color: #ffffff;
   width: 90%;
   border-radius: 8px;
   padding: 28px;
   max-width: 613px;

   @media screen and (min-width: 768px) {
      padding: 48px;
      flex-shrink: 0;
      box-shadow: 0px 8px 40px rgba(7, 7, 7, 0.08);
   }
`

export const LoginWebsiteLogoDesktopImage = styled.img`
   width: 100%;
`

export const FormDescription = styled.p`
   font-family: 'Roboto';
   font-size: 14px;
   font-weight: 500;

   @media screen and (min-width: 768px) {
      font-size: 24px;
   }
`
export const LoginButton = styled.button`
   color: #ffffff;
   background-color: #1976ad;
   font-family: 'Roboto';
   font-size: 14px;
   font-weight: bold;
   width: 234px;
   height: 40px;
   border: none;
   border-radius: 32px;
   margin-top: 12px;
   margin-bottom: 2px;
   outline: none;
   cursor: pointer;
`
