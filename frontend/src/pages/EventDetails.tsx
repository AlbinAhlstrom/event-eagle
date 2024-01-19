import React from 'react'
import EventListing from '../helpers/types'


const EventDetails = ({
    id,
    title,
    description,
    startTime,
    endTime,
    venue,
    address,
    latitude,
    longitude,
    price,
    category
}: EventListing) => {
  return (
    <div>
        <h1>{title}</h1>
        <p>{description}</p>
    </div>
  )
}

export default EventDetails