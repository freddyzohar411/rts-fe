import React from 'react'

const TextElement = ({field}) => {
  return (
    <pre style={{fontSize:field.wordSize,fontFamily:"inherit"}}>{field.wordText}</pre>
  )
}

export default TextElement