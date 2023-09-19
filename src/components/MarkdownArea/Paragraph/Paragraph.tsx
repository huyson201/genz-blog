
import React from 'react'

type Props = {
  children: any
}

const Paragraph = ({ children, ...props }: Props) => {
  return (
    <p className='whitespace-pre-wrap mt-2'>{children}</p>
  )
}

export default Paragraph