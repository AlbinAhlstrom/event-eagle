import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';

function Categories() {
  const eventCategories = ["Sports", "Concerts", "Arts & Theate", "Family"]
  return (
    <>
      <Header/>
      <div className='flex items-center justify-center'>
      <section className='grid grid-cols-2 grid-rows-2 gap-4'>
        {eventCategories.map( category => {
      return <CategoryCard category={category} description='A description'/>
        })}

      </section>
      </div>
      

    </>
  )
}

export default Categories