import React from 'react';
import ProductCard from '../components/ProductCard';
import { Carousel } from '../components/Carousel';
import RecommendedMobile from '../components/RecommentedMobile';
import RecommendedTv from '../components/RecommentedTv';
import Footer from '../components/Footer';

const Home = () => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Carousel />
      
      <section className="mt-12 w-full">
        <h2 className="text-2xl text-center font-bold mb-6">Recommended Mobile</h2>
        <RecommendedMobile />
        <h2 className="text-2xl text-center font-bold mb-6 p-4">Recommended Tv</h2>
        <RecommendedTv />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />


          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;