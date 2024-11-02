import React from 'react';

function StarRating({ rating }) {
  // Tạo một mảng có 5 vị trí, mỗi vị trí sẽ là "đầy", "nửa" hoặc "rỗng"
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    if (starValue <= rating) {
      return 'full'; // Ngôi sao đầy
    } else if (starValue - 0.5 === rating) {
      return 'half'; // Ngôi sao nửa
    } else {
      return 'empty'; // Ngôi sao rỗng
    }
  });

  return (
    <div className="flex">
      {stars.map((star, index) => (
        <svg
          key={index}
          className="w-4 h-4 text-yellow-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path
            d={
              star === 'full'
                ? "M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                : star === 'half'
                ? "M11 0c-.563 0-1.074.33-1.303.846L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033V0Z" // Dữ liệu SVG của nửa ngôi sao
                : "M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" // Dữ liệu SVG của ngôi sao rỗng
            }
          />
        </svg>
      ))}
    </div>
  );
}

export default StarRating;
