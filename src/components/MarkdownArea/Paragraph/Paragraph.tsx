
import React from 'react'

type Props = {
  children: any
}

const Paragraph = ({ children }: Props) => {
  return (
    <p className='whitespace-pre-wrap'>{children}</p>
  )
}

export default Paragraph