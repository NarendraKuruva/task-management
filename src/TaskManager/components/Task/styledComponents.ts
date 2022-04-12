import styled from 'styled-components'
import tw from 'twin.macro'

export const TaskItemContainer = styled.div`
   ${tw` rounded cursor-pointer w-[230px] hover:bg-[#e3e3e4] mb-2.5 py-2 px-4`}
   background: ${props => (props.isDragging ? ' #CBD5E1' : '#FFFFFF')};
   filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.15));
   transform:${props =>
      props.isDragging ? 'rotate(15deg)' : 'rotate(-0deg)'} ;   
`
export const TaskItemName = styled.p`
   ${tw`not-italic font-medium text-sm text-[#475569]`}
   font-family: 'Inter';
`
