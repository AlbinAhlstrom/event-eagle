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
    className="card shadow-xl bg-neutral max-h-40vh max-w-40vw"
    >
  <figure><img src={props.image} alt={props.category} className='w-full'/></figure>
  <div className="card-body flex justify-between h-10">
    <h2 className="card-title">{props.category}</h2>
      <button className="btn btn-primary self-center" onClick={() => navigate("/events/" + props.category)}>Browse</button>
  </div>
</div>
  )
}

export default CategoryCard