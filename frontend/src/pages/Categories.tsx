import { useNavigate } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import musicImage from "../images/alt-images/music.jpg";
import sportsImage from "../images/alt-images/sports.jpg";
import theatreImage from "../images/alt-images/arts.jpg";
import familyImage from "../images/alt-images/family.jpg";

function Categories() {
  const eventCategories = [
    { name: "Music", image: musicImage },
    { name: "Sports", image: sportsImage },
    { name: "Arts", image: theatreImage },
    { name: "Family", image: familyImage },
  ];
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen-h">
    <div className="flex flex-col items-center">
        <section className="grid max-sm:grid-cols-1 grid-cols-2 gap-3 lg:mx-nav">
          {eventCategories.map((category, index) => {
            return (
              <CategoryCard
                key={index}
                category={category.name}
                image={category.image}
              />
            );
          })}
          
        </section>
        <button
            className="btn btn-primary my-2 max-sm:w-48 "
            onClick={() => navigate("/events")}
          >
            Show all Categories
          </button>
      </div>
      </div>
  );
}

export default Categories;

