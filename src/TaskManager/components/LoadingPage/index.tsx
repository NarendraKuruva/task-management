import React from 'react'
import Loader from 'react-loader-spinner'
import {
   LoadingContainer,
   LoadingMainContainer,
   LoadingText
} from './styledComponents'
const renderLoader = () => (
   <Loader type='ThreeDots' color='#ffffff' height={50} width={50} />
)

const Loading = (): JSX.Element => (
   <LoadingMainContainer>
      <LoadingContainer>
         <LoadingText>Loading</LoadingText>
         <Loader type='ThreeDots' color='#ffffff' height={30} width={30} />
      </LoadingContainer>
   </LoadingMainContainer>
)

export default Loading
