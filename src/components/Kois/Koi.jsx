import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Img from "../../assets/koi/default-koi.png";
import FishService from "../Services/FishService";
import { FaMoneyBill } from "react-icons/fa6";

const Kois = () => {
  const [kois, setKois] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch fish data from API with pageSize = 5
    FishService.getFishList(5)
      .then((response) => {
        setKois(response.data); // Assuming response.data is the array of fish
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching fish data:", error);
        setLoading(false);
      });
  }, []);

  const handleImageClick = (koiId) => {
    navigate(`/kois/${koiId}`); // Redirect to KoiDetail page using koi ID
  };

  const handleViewMoreClick = () => {
    navigate("/kois");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary">
            Here some best Koi Fishes for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Japan Koi
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Japan Koi, or Nishikigoi, are ornamental carp bred in Japan for
            their vibrant colors and striking patterns. They symbolize good
            fortune and perseverance, making them a prized addition to ponds and
            gardens worldwide.
          </p>
        </div>
        {/* Body section */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
            {/* card section */}
            {kois.map((fish, index) => (
              <div
                data-aos="fade-up"
                data-aos-delay={index * 200}
                key={fish.id}
                className="space-y-3"
              >
                <img
                  onClick={() => handleImageClick(fish.id)}
                  src={
                    fish.imageUrls && fish.imageUrls[0]
                      ? fish.imageUrls[0]
                      : Img
                  }
                  alt={fish.name}
                  className="h-[280px] w-[160px] object-cover rounded-md cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
                />
                <div>
                  <h3 className="font-semibold">{fish.name}</h3>
                  <p className="text-sm text-gray-600">{fish.weight} kilos</p>
                  <div className="flex items-center gap-1">
                    <FaMoneyBill className="text-green-500" />
                    <span>{fish.price} VND</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* view more button */}
          <div className="flex justify-center">
            <button
              onClick={handleViewMoreClick}
              className="text-center mt-10 cursor-pointer bg-primary text-white py-2 px-6 rounded-md transition-transform duration-300 ease-in-out hover:scale-105" // Added scale effect
            >
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kois;
