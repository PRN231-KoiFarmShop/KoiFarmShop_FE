import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FishService from "../Services/FishService";
import Img from "../../assets/koi/default-koi.png";
import { FaMoneyBill, FaSearch } from "react-icons/fa";

const ListKois = () => {
  const [kois, setKois] = useState([]);
  const [filteredKois, setFilteredKois] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch fish data from API with no pageSize
    FishService.getFishList()
      .then((response) => {
        setKois(response.data);
        setFilteredKois(response.data);
      })
      .catch((error) => {
        console.error("Error fetching fish data:", error);
      });
  }, []);

  // Function to filter kois based on search term and filters
  const filterKois = () => {
    let result = kois;

    // Filter by search term
    if (searchTerm) {
      result = result.filter((fish) =>
        fish.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by selected type
    if (selectedType) {
      result = result.filter((fish) => fish.type === selectedType);
    }

    // Filter by price range
    result = result.filter(
      (fish) => fish.price >= minPrice && fish.price <= maxPrice
    );

    setFilteredKois(result);
  };

  const handleImageClick = (koiId) => {
    navigate(`/kois/${koiId}`); // Redirect to KoiDetail page using koi ID
  };

  useEffect(() => {
    filterKois();
  }, [searchTerm, selectedType, minPrice, maxPrice, kois]);

  // Unique types for filter options
  const uniqueTypes = [...new Set(kois.map((fish) => fish.type))];

  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* Search bar and type filter */}
        <div className="flex items-center justify-between mb-4">
          {/* Container for search and filter */}
          <div className="flex items-center w-1/2">
            {" "}
            {/* Flex container for search and type filter */}
            <div className="relative w-1/2">
              {" "}
              {/* Relative positioning for icon */}
              <FaSearch className="absolute left-2 top-2 text-gray-400" />{" "}
              {/* Search icon */}
              <input
                type="text"
                placeholder="Search by fish name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded-md pl-8 pr-2 py-2 w-full"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="border rounded-md p-2 mx-2 ml-4"
            >
              <option value="">All Types</option>
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter on the right */}
          <div className="flex flex-col">
            {" "}
            {/* Adjusted layout */}
            <label className="mb-1">Price Range:</label>
            <div className="flex">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="border rounded-md p-1 mx-1 w-24"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="border rounded-md p-1 mx-1 w-24"
              />
            </div>
          </div>
        </div>

        {/* Body section */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
            {/* Card section */}
            {filteredKois.map((fish, index) => (
              <div
                data-aos="fade-up"
                data-aos-delay={index * 200}
                key={fish.id}
                className="space-y-3"
              >
                {/* Clicking the image redirects to KoiDetail page */}
                <img
                  onClick={() => handleImageClick(fish.id)}
                  src={
                    fish.imageUrls && fish.imageUrls[0]
                      ? fish.imageUrls[0]
                      : Img
                  }
                  alt={fish.name}
                  className="h-[280px] w-[200px] object-cover rounded-md cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" // Added hover effect
                />
                <div>
                  <h3 className="font-semibold">{fish.name}</h3>
                  <p className="text-sm text-gray-600">{fish.weight} kilos</p>
                  <div className="flex items-center gap-1">
                    <FaMoneyBill className="text-green-500" />{" "}
                    {/* Money icon */}
                    <span>{fish.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListKois;
