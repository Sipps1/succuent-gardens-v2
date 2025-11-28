import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LayoutGrid, Filter } from 'lucide-react';
import Product from '../components/Product';

const CATEGORIES = [
  'small-containers',
  'medium-containers',
  'large-containers',
  'small-figurines',
  'medium-figurines',
  'large-figurines',
  'accessories',
  'decorative-stones',
];

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/products');
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-white rounded-2xl min-h-[80vh] p-8 relative shadow-soft border border-white/50">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading text-primary mb-4 text-shadow-custom">
          Shop Our Collection
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find the perfect pieces to build your magical miniature world.
        </p>
      </div>

      {/* Categories Filter - Replaced Combobox with Pill Buttons */}
      <div className="mb-12">
        <div className="flex items-center justify-center gap-2 mb-4 text-secondary">
          <Filter className="w-5 h-5" />
          <span className="font-bold uppercase tracking-wider text-sm">Filter by Category</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border-2 ${
              selectedCategory === 'all'
                ? 'bg-[#D4A5A5] text-white border-[#D4A5A5] shadow-md transform scale-105'
                : 'bg-transparent text-gray-500 border-gray-200 hover:border-[#D4A5A5] hover:text-[#D4A5A5]'
            }`}
          >
            All Items
          </button>
          
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-300 border-2 ${
                selectedCategory === cat
                  ? 'bg-[#C8B6A6] text-white border-[#C8B6A6] shadow-md transform scale-105'
                  : 'bg-transparent text-gray-500 border-gray-200 hover:border-[#C8B6A6] hover:text-[#C8B6A6]'
              }`}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4A5A5] mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading treasures...</p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-6 text-gray-400 text-sm">
            <LayoutGrid className="w-4 h-4" />
            <span>Showing {filteredProducts.length} results</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Product key={product._id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-16 text-gray-500">
                <p className="text-lg">No magical items found in this category.</p>
                <button 
                  onClick={() => setSelectedCategory('all')}
                  className="mt-4 text-[#D4A5A5] hover:underline"
                >
                  View all products
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ShopPage;