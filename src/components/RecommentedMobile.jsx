import React from 'react';
import { useState } from 'react';

const RecommendedMobile = () => {
  const product = [
    {
      id: 1,
      image: './src/assets/Mobile 1.png',
      title: 'Save ₹6,999 on the POCO – Experience Innovation at an Unbeatable Price!',
    },
    {
      id: 2,
      image: './src/assets/Mobile 2.png',
      title: 'Save ₹5,999 on Vivo X60 – Experience Innovation at an Unbeatable Price!',
    },
    {
      id: 3,
      image: './src/assets/Mobile 3.png',
      title: 'Save ₹10,999 on the Galaxy Z Fold6 – Experience Innovation at an Unbeatable Price!',
    },
    {
      id: 4,
      image: './src/assets/Mobile 4.png',
      title: 'Save ₹11,000 on Nothing Phone 1 – Experience Innovation at an Unbeatable Price!',
    },
    {
      id: 5,
      image: './src/assets/Mobile 5.png',
      title: 'Save ₹5,000 on Google Pixel 7 Pro – Experience Innovation at an Unbeatable Price!',
      button: true,
    },
    {
      id: 6,
      image: './src/assets/Mobile 6.png',
      title: 'Save ₹10,000 on I Phone 14 – Experience Innovation at an Unbeatable Price!',
      button: true,
    },
  ];

  const [hoverCrad, setHoverCard] = useState(null);

  const handleMouseEnter = (id) => {
    setHoverCard(id);
  }

  const handleMouseLeave = () => {
    setHoverCard(null);
  }


  return (
    <div className="h-full w-full mx-auto p-4 rounded-md ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {product.map((deal) => (
          <div
            key={deal.id}
            className="relative rounded-lg overflow-hidden bg-gray-100 p-4 flex flex-col items-center duration-700"
            onMouseEnter={() => handleMouseEnter(deal.id)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={deal.image}
              alt={deal.title}
              className="w-full h-40 object-contain hover:scale-110 transition-transform duration-700"
            />
            <p className="mt-2 text-center text-gray-800 font-medium">
              {deal.title}
            </p>
            {hoverCrad === deal.id && (
            <button className='items-center px-4 py-2 my-2 text-sm font-medium text-center  text-white ring-2 ring-gray-800 bg-gray-800 rounded-lg hover:bg-white hover:text-black transform transition ease-in-out duration-1000'>
              Buy Now
            </button>
          )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedMobile;
