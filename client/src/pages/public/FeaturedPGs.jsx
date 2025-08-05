import React from "react";
import PGCard from "../../components/common/PGCard";
import sunrisePG from "../../assets/Home/sunrise-pg-card.jpg"
import eliteResidency from "../../assets/Home/elite-residency-card.jpg";
import greenValley from "../../assets/Home/green-valley-card.jpg";

const featuredPGs = [
  {
    id: 1,
    name: "Sunrise PG",
    location: "Koramangala, Bangalore",
    price: "₹12,000",
    rating: "4.8 (124)",
    image: sunrisePG,
  },
  {
    id: 2,
    name: "Elite Residency",
    location: "Bandra, Mumbai",
    price: "₹15,500",
    rating: "4.9 (89)",
    image: eliteResidency,
  },
  {
    id: 3,
    name: "Green Valley PG",
    location: "Sector 62, Noida",
    price: "₹9,800",
    rating: "4.7 (156)",
    image: greenValley,
  },
];

const FeaturedPGs = () => {
  return (
    <section className="py-20 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Featured PGs</h2>
      <p className="mb-12 text-gray-600 text-lg">
        Discover top-rated paying guest accommodations handpicked for you
      </p>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {featuredPGs.map((pg) => (
          <PGCard
            key={pg.id}
            id={pg.id}
            name={pg.name}
            location={pg.location}
            price={pg.price}
            rating={pg.rating}
            image={pg.image}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedPGs;
