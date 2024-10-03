import React from "react";
import Img from "../../assets/koi/default-package-koi.png";
import { FaStar } from "react-icons/fa";

const ProductsData = [
  {
    id: 1,
    img: Img,
    title: "Package Mini Koi",
    description:
      "A selection of small koi fish featuring vibrant colors and unique patterns, perfect for home aquariums or small ponds. Ideal for hobbyists and collectors looking to enhance their aquatic displays.",
  },
  {
    id: 2,
    img: Img,
    title: "Package 4 Koi",
    description:
      "This package includes four stunning koi fish, showcasing a variety of colors and patterns. Ideal for enhancing your pond or aquarium, these koi are perfect for both beginners and experienced hobbyists looking to create a vibrant aquatic environment.",
  },
  {
    id: 3,
    img: Img,
    title: "Package 10 Female Koi",
    description:
      "This package offers ten exquisite female koi fish, celebrated for their vibrant colors and intricate patterns. Ideal for pond enthusiasts or aquarium setups, these females provide a stunning visual display and can contribute to breeding programs, making them a fantastic choice for both novice and seasoned koi lovers.",
  },
];
const TopProducts = ({ handleOrderPopup }) => {
  return (
    <div>
      <div className="container">
        {/* Header section */}
        <div className="text-left mb-24">
          <p data-aos="fade-up" className="text-sm text-primary">
            Top Rated Koi Fishes for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Best Package Koi Fishes
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            The best Japan Koi are often from high-quality bloodlines, known for their vivid colors, balanced patterns, and graceful form. Varieties like Kohaku (white with red markings), Taisho Sanke (white with red and black), and Showa (black with red and white) are among the most sought-after for their beauty and symmetry.
          </p>
        </div>
        {/* Body section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
          {ProductsData.map((data) => (
            <div
              data-aos="zoom-in"
              className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group max-w-[300px]"
            >
              {/* image section */}
              <div className="h-[60px]">
                <img
                  src={data.img}
                  alt=""
                  className="max-w-[140px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md"
                />
              </div>
              {/* details section */}
              <div className="p-4 text-center">
                {/* star rating */}
                <div className="w-full flex items-center justify-center gap-1">
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                </div>
                <h1 className="text-xl font-bold">{data.title}</h1>
                <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                  {data.description}
                </p>
                <button
                  className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
                  onClick={handleOrderPopup}
                >
                  View Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
