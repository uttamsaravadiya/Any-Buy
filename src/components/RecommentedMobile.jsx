import React, { useState } from 'react';

const RecommendedMobile = ({ addToCart }) => {
  const product = [
    {
      id: 7,
      image: './src/assets/Mobile 1.png',
      title: 'POCO F2',
      price: "₹25000",
    },
    {
      id: 8,
      image: './src/assets/Mobile 2.png',
      title: ' Vivo X60 Pro',
      price: "₹28000",
    },
    {
      id: 9,
      image: './src/assets/Mobile 3.png',
      title: ' Galaxy Z Fold6 5G',
      price: "₹32000",
    },
    {
      id: 10,
      image: './src/assets/Mobile 4.png',
      title: 'Nothing Phone 1',
      price: "₹35000",
    },
    {
      id: 11,
      image: './src/assets/Mobile 5.png',
      title: 'Google Pixel 7 Pro 5G',
      price: "₹38000",
      button: true,
    },
    {
      id: 12,
      image: './src/assets/Mobile 6.png',
      title: 'I Phone 14 Pro',
      price: "₹145000",
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

  // function sendHandler(){
  //   console.log(deal)
  // }

  return (
    <div className="h-full w-full mx-auto p-4 rounded-md ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {product.map((deal) => (
          <div
            key={deal.id}
            className="relative rounded-lg h-[300px] overflow-hidden bg-gray-200 p-4 flex flex-col items-center duration-700"
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
            <button
              className='items-center px-4 py-2 mt-6 text-sm font-medium text-center  text-white ring-2 ring-gray-800 bg-gray-800 rounded-lg hover:bg-white hover:text-black transform transition ease-in-out duration-1000'
              onClick={() => addToCart(deal)}
            >
              Add To Cart
            </button>
          )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedMobile;
