import React from 'react';
import { useState } from 'react';

const RecommendedTv = () => {
  const product = [
    {
      id: 1,
      image: './src/assets/tv 1.png',
      title: 'Save ₹10,000 on Coolite LED – Experience Innovation at an Unbeatable Price!',
    },
    {
      id: 2,
      image: './src/assets/tv 2.png',
      title: 'Save ₹10,000 on TCL Google TV – Experience Innovation at an Unbeatable Price!',
    },
    {
      id: 3,
      image: './src/assets/tv 3.png',
      title: 'Save ₹10,000 on INTEX – Experience Innovation at an Unbeatable Price!',
    },
    {
      id: 4,
      image: './src/assets/tv 4.png',
      title: 'Save ₹10,000 on Samsung Smart TV – Experience Innovation at an Unbeatable Price!',
    },
    {
      id: 5,
      image: './src/assets/tv 5.png',
      title: 'Save ₹10,000 on Samsung Neo QLED – Experience Innovation at an Unbeatable Price!',
      button: true,
    },
    {
      id: 6,
      image: './src/assets/tv 6.png',
      title: 'Save ₹10,000 on Croma Smart TV – Experience Innovation at an Unbeatable Price!',
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
    <div className="h-full w-full mx-auto p-4 rounded-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {product.map((deal) => (
          <div
            key={deal.id}
            className="relative rounded-lg overflow-hidden bg-gray-100 p-4 flex flex-col items-center"
            onMouseEnter={() => handleMouseEnter(deal.id)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={deal.image}
              alt={deal.title}
              className="w-full h-40 object-contain hover:scale-110 transition-transform ease-in-out duration-700"
            />
            <p className="mt-2 text-center text-gray-800 font-medium">
              {deal.title}
            </p>
            {hoverCrad === deal.id && (
            <button className='inline-flex  items-center px-4 py-2 my-2 text-sm font-medium text-center  text-white ring-2 ring-gray-800 bg-gray-800 rounded-lg hover:bg-white hover:text-black transform transition ease-in-out duration-1000'>
              Buy Now
            </button>
          )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedTv;
