import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import musicImage from '../images/music-events.jpg'
import sportsImage from '../images/sport-events.jpg'
import theatreImage from '../images/theatre-events.jpg'
import familyImage from '../images/family-events.jpg'


function Categories() {
  const eventCategories = [
    {name: "Music", image:musicImage}, 
    {name: "Sports", image:sportsImage},
    {name: "Arts", image:theatreImage}, 
    {name: "Family",  image:familyImage}
  ]
  const navigate = useNavigate()

  return (
    <>
      <Header/>
      <div className='flex flex-col gap-10 items-center justify-center mt-10'>
      <section className='grid grid-cols-2 grid-rows-2 gap-4 align-middle'>
        {eventCategories.map( category => {
      return <CategoryCard category={category.name}  image={category.image}/>
        })}
      </section>
      <button className="btn btn-primary" onClick={() => navigate("/events")}>Show all Categories</button>
      </div>
    </>
  )
}

export default Categories