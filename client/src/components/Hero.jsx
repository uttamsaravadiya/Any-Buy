import React, { useEffect, useState } from "react";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const products = [
    {
      id: 1,
      name: "Smartphone Pro",
      description: "Latest technology with advanced features.",
      price: "$999",
      imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRJMfZ47Q4PqPoRnyJ3kMcTt9NXijjMWaeMsP2f7tsVTOzSvfF0mfmjqNkXJ4Jo22pLjk-IKH7CGq6NkKQl2yDSg0AGBQXFrvybggW6GIl0JyMLEyGchF4-", // Replace with actual image
    },
    {
      id: 2,
      name: "Ultra Laptop",
      description: "High-performance laptop for professionals.",
      price: "$1499",
      imageUrl: "data:image/jpeg;base64,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",
    },
    {
      id: 3,
      name: "Gaming Headphones",
      description: "Immersive sound experience for gamers.",
      price: "$299",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrXhxO1XXZIl_9xIoPZs6XJTIKc3Ui8S4uQuWK3do372AFf2H6ckY8FkU&s",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? products.length - 1 : prevIndex - 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {products.map((product, index) => (
        <div
          key={product.id}
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${product.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="bg-gradient-to-r from-blue-700 via-transparent to-transparent w-full h-full flex items-center px-10">
            <div className="max-w-lg text-white">
              <h1 className="text-5xl font-bold">{product.name}</h1>
              <p className="mt-3 text-lg">{product.description}</p>
              <p className="mt-2 text-2xl font-semibold">{product.price}</p>
              <button className="mt-4 px-6 py-2 bg-white text-blue-700 font-semibold rounded-md hover:bg-gray-300 transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hero;