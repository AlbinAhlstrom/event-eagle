import React, { useEffect } from 'react'

const SavedEvents = () => {

  const fetchUserEvents = async () => {

    const response = await fetch("https://event-eagle.azurewebsites.net/Events/userEvents");
    const data = await response.json();

    console.log(data);
  }

useEffect(()=>{
  fetchUserEvents();
},[])
  return (
    <div>SavedEvents</div>
  )
}

export default SavedEvents