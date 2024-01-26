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
    className="card bg-primary shadow-xl image-full"
    style={{maxHeight: "sm:38vh", maxWidth: "sm:40vw"}}
    >
  <figure><img src={props.image} alt={props.category} className="sm:h-1/2 sm:w-1/2" style={{height: "sm:50vh", width: "sm:50vw"}}/></figure>
  <div className="card-body flex justify-between">
    <h2 className="card-title">{props.category}</h2>
    <div className="card-actions self-center">
      <button className="btn btn-primary" onClick={() => navigate("/events/" + props.category)}>Browse</button>
    </div>
  </div>
</div>
  )
}

export default CategoryCard