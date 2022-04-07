import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { API_KEY } from '../../constants/TaskManagementConstants'
import {
   FormContainer,
   FormDescription,
   LoginButton,
   LoginFormContainer,
   LoginWebsiteLogoDesktopImage,
   LoginWebsiteTitleLogo,
   Title,
   TitleContainer
} from './styledComponents'

interface LoginFormProps {
   token: any
   location: any
}

class LoginForm extends Component<LoginFormProps> {
   componentDidMount(): void {
      const hashKey = this.getHashKeyFromLocationAfterLogin()

      if (hashKey.token) {
         this.setAccessTokenInLocalStorage(hashKey.token)
      }
   }

   getHashKeyFromLocationAfterLogin = () => {
      const { location } = this.props
      const { hash } = location
      const hashKey = { token: '' }
      const queryParams = new URLSearchParams(window.location.search)
      const error = queryParams.get('error')

      if (error === 'access_denied') {
         window.close()
      }

      hash
         .replace(/^#\/?/, '')
         .split('&')
         .forEach(keyValue => {
            const spl = keyValue.indexOf('=')
            if (spl !== -1) {
               hashKey[keyValue.substring(0, spl)] = keyValue.substring(spl + 1)
            }
         })
      return hashKey
   }

   setAccessTokenInLocalStorage = (token: string): void => {
      localStorage.setItem('pa_token', token)
      localStorage.setItem('pa_expires', (new Date().getTime() + 60).toString())
      window.location.replace('/trello/')
   }

   isDevelopmentEnvironment = (): boolean => {
      if (
         process.env.NODE_ENV === 'development' ||
         window.location.hostname === 'localhost'
      ) {
         return true
      }
      return false
   }

   getReturnURL = (): string => {
      if (this.isDevelopmentEnvironment()) {
         return 'http://localhost:3004/login'
      }
      return 'https://narentrello.ccbp.tech/login'
   }

   openLoginModal = (): void => {
      const apiKey = API_KEY

      const returnURL = this.getReturnURL()

      const url = `https://trello.com/1/OAuthAuthorizeToken?expiration=never&name=TaskManager&scope=read,write,account&key=${apiKey}&callback_method=fragment&return_url=${returnURL}`

      window.open(url, '_self', ``)
   }

   submitForm = async (event): Promise<void> => {
      event.preventDefault()
      this.openLoginModal()
   }

   render(): JSX.Element {
      const token = localStorage.getItem('pa_token')
      if (token !== null) {
         return <Redirect to='/trello' />
      }
      return (
         <LoginFormContainer>
            <TitleContainer>
               <LoginWebsiteTitleLogo
                  src='https://assets.ccbp.in/frontend/react-js/task-manager-mini-project/task-manager-logo.png'
                  alt='title logo'
               />
               <Title>Task Manager</Title>
            </TitleContainer>
            <FormContainer onSubmit={this.submitForm}>
               <LoginWebsiteLogoDesktopImage
                  src='https://assets.ccbp.in/frontend/react-js/task-manager-mini-project/task-manager-login.png'
                  alt='website logo'
               />
               <FormDescription className='form-description'>
                  Task tracking for your everyday needs.
               </FormDescription>
               <LoginButton type='submit'>LOG IN WITH TRELLO</LoginButton>
            </FormContainer>
         </LoginFormContainer>
      )
   }
}

export default LoginForm
