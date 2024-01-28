import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CategoryCard from "../components/CategoryCard";
import musicImage from "../images/music-events.jpg";
import sportsImage from "../images/sport-events.jpg";
import theatreImage from "../images/theatre-events.jpg";
import familyImage from "../images/family-events.jpg";

function Categories() {
  const eventCategories = [
    { name: "Music", image: musicImage },
    { name: "Sports", image: sportsImage },
    { name: "Arts", image: theatreImage },
    { name: "Family", image: familyImage },
  ];
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between items-center h-screen">
      <Header />
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
            className="btn btn-primary my-2 w-1/3 max-sm:w-full"
            onClick={() => navigate("/events")}
          >
            Show all Categories
          </button>
      </div>
  );
}

export default Categories;

