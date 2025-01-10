import React from 'react';

const RecommendedTv = () => {
  const product = [
    {
      id: 1,
      image: './src/assets/Mobile.avif',
      title: 'Save up to $900 on Galaxy Tab S10 Ultra',
    },
    {
      id: 2,
      image: './src/assets/Mobile.avif',
      title: 'Save up to $900+ on Galaxy Z Flip6',
    },
    {
      id: 3,
      image: './src/assets/Mobile.avif',
      title: 'Save up to $350+ on Galaxy Watch Ultra',
    },
    {
      id: 4,
      image: './src/assets/Mobile.avif',
      title: 'Save up to $925+',
    },
    {
      id: 5,
      image: './src/assets/Mobile.avif',
      title: 'Save $1,200 on Galaxy Z Fold6',
      button: true,
    },
    {
      id: 6,
      image: './src/assets/Mobile.avif',
      title: 'Save $1,200 on Galaxy Z Fold6',
      button: true,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {product.map((deal) => (
          <div
            key={deal.id}
            className="relative rounded-lg overflow-hidden bg-gray-100 p-4 flex flex-col items-center"
          >
            <img
              src={deal.image}
              alt={deal.title}
              className="w-full h-40 object-contain hover:scale-105 transition-transform"
            />
            <p className="mt-2 text-center text-gray-800 font-medium">
              {deal.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedTv;
