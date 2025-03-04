import React, { useContext, useEffect, useState } from "react";
import { Carousel } from "../components/Carousel";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import RecommendedMobile from "../components/RecommentedMobile";
import RecommendedTv from "../components/RecommentedTv";
import { shopContext } from "../context/ShopContext";

const Home = () => {
  const { products } = useContext(shopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((product) => product.bestSeller);
    setBestSeller(bestProduct);
  }, [products]);

  return (
    <div className="container bg-gray-100 mx-auto px-4 py-8">
      <Carousel />

      <section className="mt-12 w-full">
        <h2 className="text-2xl text-center font-bold mb-6">
          Recommended Mobile
        </h2>
        <RecommendedMobile addToCart={addToCart} />
        <h2 className="text-2xl text-center font-bold mb-6 p-4">
          Recommended Tv
        </h2>
        <RecommendedTv addToCart={addToCart} />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
