import React from 'react'
import Loader from 'react-loader-spinner'
import {
   LoadingContainer,
   LoadingMainContainer,
   LoadingText
} from './styledComponents'

const loadingText = 'Loading'

const Loading = (): JSX.Element => (
   <LoadingMainContainer>
      <LoadingContainer>
         <LoadingText>{loadingText}</LoadingText>
         <Loader type='ThreeDots' color='#ffffff' height={30} width={30} />
      </LoadingContainer>
   </LoadingMainContainer>
)

export default Loading
