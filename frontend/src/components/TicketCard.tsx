import React, { useEffect } from 'react'
import { TicketCardProps } from '../util'

const TicketCard: React.FC<TicketCardProps> = ({ticket, ticketId}) => {

useEffect(()=>{

  
}, [])
  
  return (
    <div className='p-2 rounded-xl flex flex-col'>
      <p>Sold by:</p>
      <p>{ticket?.sellerName}</p>
    </div>
  )
}

export default TicketCard