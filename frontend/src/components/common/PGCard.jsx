import React from "react";
import { Link } from "react-router-dom";

const PGCard = ({ id, name, location, price, rating, image }) => {
  return (
    <Link to={`/pg/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <div className="p-6 text-left">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">{name}</h3>
          <p className="text-sm text-gray-600 mb-3">{location}</p>
          <div className="flex flex-row justify-between items-center">
            <p className="font-bold text-blue-600 text-lg">{price}</p>
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              <p className="text-sm text-gray-600">{rating}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PGCard;
