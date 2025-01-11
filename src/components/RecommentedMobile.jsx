import React from 'react';
import { useState } from 'react';

const RecommendedMobile = () => {
  const product = [
    {
      id: 1,
      image: './src/assets/Mobile 1.avif',
      title: 'Save up to $900 on Galaxy Tab S10 Ultra',
    },
    {
      id: 2,
      image: './src/assets/Mobile 2.avif',
      title: 'Save up to $900+ on Galaxy Z Flip6',
    },
    {
      id: 3,
      image: './src/assets/Mobile 3.avif',
      title: 'Save up to $350+ on Galaxy Watch Ultra',
    },
    {
      id: 4,
      image: './src/assets/Mobile 4.avif',
      title: 'Save up to $925+',
    },
    {
      id: 5,
      image: './src/assets/Mobile 5.avif',
      title: 'Save $1,200 on Galaxy Z Fold6',
      button: true,
    },
    {
      id: 6,
      image: './src/assets/Mobile 6.avif',
      title: 'Save $1,200 on Galaxy Z Fold6',
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
    <div className="max-w-7xl mx-auto p-4 rounded-md ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {product.map((deal) => (
          <div
            key={deal.id}
            className="relative rounded-lg overflow-hidden bg-gray-200 p-4 flex flex-col items-center"
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
            <button className='bg-black text-white p-1 text-center rounded-full transform transition ease-in-out duration-700'>
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
