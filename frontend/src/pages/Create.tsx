import React from 'react'
import { defaultEventListing } from '../util';
import EventForm from '../components/EventForm';
import BottomButton from '../components/BottomButton';
import useNaviate

const Create = () => {
    return (
        <div className="flex flex-col items-center h-screen-h">
          <EventForm event={defaultEventListing} updating={false} />
          <BottomButton onClick={} text="Back to events" />
        </div>
      );
}

export default Create