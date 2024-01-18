import React from 'react'
import image from '../images/arts-and-theatre.jpg'

interface CategoryCardProps {
    category: string
    description: string
}

const CategoryCard: React.FC<CategoryCardProps> = (props) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
  <figure><img src={image} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">{props.category}</h2>
    <p>{props.description}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
  )
}

export default CategoryCard