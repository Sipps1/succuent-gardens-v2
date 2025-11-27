import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Product from '../components/Product';

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setFeatured(data.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div>
      <section className="text-center py-16 px-4 bg-white rounded-2xl mb-8 overflow-hidden relative shadow-soft border border-white/50">
        <img
          src="https://images.unsplash.com/photo-1459156212016-c812468e2115?w=150&h=150&fit=crop"
          alt="succulent"
          className="animate-float absolute top-5 left-8 w-[100px] h-[100px] rounded-full opacity-40 -z-0"
        />
        <img
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=100&h=100&fit=crop"
          alt="flower"
          className="animate-sway absolute top-12 right-10 w-[80px] h-[80px] rounded-full opacity-40 -z-0"
        />

        <h1 className="text-shadow-custom relative z-10">
          Create Your Own
          <br />
          <span className="text-secondary">Miniature Fairy Garden</span>
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto relative z-10">
          Discover enchanting succulents, whimsical figurines, and magical
          accessories to build your perfect miniature world. Every garden tells
          its own story.
        </p>

        <Link to="/shop" className="btn relative z-10">
          <ShoppingBag className="w-5 h-5" />
          Explore Our Collection
          <ArrowRight className="w-5 h-5" />
        </Link>

        <div className="flex justify-center gap-2 mt-8 relative z-10">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`w-6 h-2 rounded-full opacity-50 ${i % 2 === 0 ? 'bg-[#D4A5A5]' : 'bg-[#C8B6A6]'}`} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-center text-secondary text-3xl mb-2">
          Featured Collection
        </h2>
        <p className="text-center max-w-xl mx-auto mb-8">
          Handpicked treasures to start your fairy garden journey
        </p>
        
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        )}
         <div className="text-center mt-12">
          <Link to="/shop" className="btn btn-secondary">
            <ArrowRight className="w-5 h-5" />
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;