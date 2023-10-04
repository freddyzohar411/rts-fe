import React from 'react'

const ButtonElement = ({field}) => {
  return (
    <button type={field.buttonType} className={field.buttonClass} name={field.buttonName}>
        {field.buttonText}
    </button>
  )
}

export default ButtonElement