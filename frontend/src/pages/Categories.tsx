import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import musicImage from '../images/music-events.jpg'
import sportsImage from '../images/sport-events.jpg'
import theatreImage from '../images/theatre-events.jpg'
import familyImage from '../images/family-events.jpg'


function Categories() {
  const eventCategories = [{name: "Music", description: "", image:musicImage}, 
  {name: "Sports", description: "", image:sportsImage},
  {name: "Arts & Theatre", description: "", image:theatreImage}, 
  {name: "Family", description: "", image:familyImage}
  ]

  return (
    <>
      <Header/>
      <div className='flex items-center justify-center '>
      <section className='grid grid-cols-2 grid-rows-2 gap-4 align-middle'>
        {eventCategories.map( category => {
      return <CategoryCard category={category.name} description={category.description} image={category.image}/>
        })}
      </section>
      </div>
      

    </>
  )
}

export default Categories