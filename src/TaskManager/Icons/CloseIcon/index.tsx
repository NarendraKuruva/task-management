import * as React from 'react'

interface CloseIconProps {
   color?: string
   onClick?: any
   cursor?: any
}

const CloseIcon = (props: CloseIconProps): JSX.Element => (
   <svg
      width={12}
      height={12}
      fill={props.color}
      xmlns='http://www.w3.org/2000/svg'
      {...props}
   >
      <path
         fillRule='evenodd'
         clipRule='evenodd'
         d='m7.414 6 4.293-4.293A.999.999 0 1 0 10.293.293L6 4.586 1.707.293A.999.999 0 1 0 .293 1.707L4.586 6 .293 10.293a.999.999 0 1 0 1.414 1.414L6 7.414l4.293 4.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L7.414 6Z'
         fill={props.color}
      />
   </svg>
)

export default CloseIcon
