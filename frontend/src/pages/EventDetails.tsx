import { useParams } from 'react-router-dom'


const EventDetails = () => {
    const { id } = useParams<'id'>();
  return (
    <div>
        <h1>Event with id</h1>
        <p>{id}</p>
    </div>
  )
}

export default EventDetails