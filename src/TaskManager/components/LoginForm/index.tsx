import React, { useEffect } from 'react'
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

const appName = 'Task Manager'
const loginFormDescription = 'Task tracking for your everyday needs.'
const logingBtnText = 'LOG IN WITH TRELLO'

const LoginForm = (props: LoginFormProps): JSX.Element => {
   const getHashKeyFromLocationAfterLogin = (): { token: string } => {
      const { location } = props
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
   const setAccessTokenInLocalStorage = (token: string): void => {
      localStorage.setItem('pa_token', token)
      localStorage.setItem('pa_expires', (new Date().getTime() + 60).toString())
      window.location.replace('/trello/')
   }
   useEffect((): void => {
      const hashKey = getHashKeyFromLocationAfterLogin()

      if (hashKey.token) {
         setAccessTokenInLocalStorage(hashKey.token)
      }
   }, [])

   const isDevelopmentEnvironment = (): boolean => {
      if (
         process.env.NODE_ENV === 'development' ||
         window.location.hostname === 'localhost'
      ) {
         return true
      }
      return false
   }

   const getReturnURL = (): string => {
      if (isDevelopmentEnvironment()) {
         return 'http://localhost:3004/login'
      }
      return 'https://narentrello.ccbp.tech/login'
   }

   const openLoginModal = (): void => {
      const apiKey = API_KEY

      const returnURL = getReturnURL()

      const url = `https://trello.com/1/OAuthAuthorizeToken?expiration=never&name=TaskManager&scope=read,write,account&key=${apiKey}&callback_method=fragment&return_url=${returnURL}`

      window.open(url, '_self', ``)
   }

   const submitForm = async (event): Promise<void> => {
      event.preventDefault()
      openLoginModal()
   }

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
            <Title>{appName}</Title>
         </TitleContainer>
         <FormContainer onSubmit={submitForm}>
            <LoginWebsiteLogoDesktopImage
               src='https://assets.ccbp.in/frontend/react-js/task-manager-mini-project/task-manager-login.png'
               alt='website logo'
            />
            <FormDescription className='form-description'>
               {loginFormDescription}
            </FormDescription>
            <LoginButton type='submit'>{logingBtnText}</LoginButton>
         </FormContainer>
      </LoginFormContainer>
   )
}

export default LoginForm
