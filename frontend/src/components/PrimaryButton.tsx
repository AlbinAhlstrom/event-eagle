import React from 'react'

interface ButtonProps {
    onClick: () => void
    text: string
}

const PrimaryButton:React.FC<ButtonProps> = ({onClick, text}) => {
  return (
    <button className="btn btn-primary" onClick={onClick}>
    {text}
    </button>   
  )
}

export default PrimaryButton

