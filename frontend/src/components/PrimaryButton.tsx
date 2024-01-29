import React from 'react'

interface ButtonProps {
    onClick: () => void
    text: string
}

const PrimaryButton:React.FC<ButtonProps> = ({onClick, text}) => {
  return (
    <button className="btn btn-primary fixed bottom-2 mt-auto self-center" onClick={onClick}>
    {text}
    </button>   
  )
}

export default PrimaryButton

