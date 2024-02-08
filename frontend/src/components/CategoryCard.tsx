import React from 'react'
import { useNavigate } from 'react-router-dom'

interface CategoryCardProps {
    category: string
    image: string
}

const CategoryCard: React.FC<CategoryCardProps> = (props) => {
  const navigate = useNavigate()

  return (
    <div 
    className="card shadow-lg bg-neutral sm:max-h-max-card-h sm:max-w-max-card-w "
    >
  <figure><img src={props.image} alt={props.category} className='h-full w-full'/></figure>
  <div className="card-body flex flex-row py-2">
    <h2 className="card-title flex-1">{props.category}</h2>
      <button className="btn btn-primary align-center" onClick={() => navigate("/events/" + props.category)}>Browse</button>
  </div>
</div>
  )
}

export default CategoryCard