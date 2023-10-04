import React from 'react'

const TextElement = ({field}) => {
  return (
    <span style={{fontSize:field.wordSize}}>{field.wordText}</span>
  )
}

export default TextElement