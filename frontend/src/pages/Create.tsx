import { defaultEventListing } from '../util';
import EventForm from '../components/EventForm';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center h-screen-h">
          <EventForm event={defaultEventListing} updating={false} />
          <button className='btn btn-primary fixed bottom-2 mt-auto self-center' onClick={() => navigate("/admin")}>Back to dashboard</button>
        </div>
      )
}

export default Create