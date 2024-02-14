import { useNavigate } from "react-router-dom";
import CategoryCard from "../components/card/CategoryCard";
import musicImage from "../images/alt/music.jpg";
import sportsImage from "../images/alt/sports.jpg";
import theatreImage from "../images/alt/arts.jpg";
import familyImage from "../images/alt/family.jpg";

function Categories() {
  const eventCategories = [
    { name: "Music", image: musicImage },
    { name: "Sports", image: sportsImage },
    { name: "Arts", image: theatreImage },
    { name: "Family", image: familyImage },
  ];
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center h-screen-h max-sm:h-auto">
      <div className="mt-4 max-sm:w-full max-sm:pb-20">
        <section className="grid gap-y-3 max-sm:grid-cols-1 grid-cols-2 gap-3 lg:mx-nav">
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
      </div>
      <div className="flex flex-col justify-center items-center max-sm:my-0 md:h-full w-full">
        <button
          className="btn btn-primary shadow-2xl max-sm:fixed max-sm:bottom-2 max-sm:w-2/3"
          onClick={() => navigate("/events")}
        >
          Browse all categories
        </button>
      </div>
    </div>
  );
}

export default Categories;
