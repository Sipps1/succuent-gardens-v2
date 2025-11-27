import React from 'react';
import { useCart } from '../context/CartContext';

const Product = ({ product }) => {
  const { addToCart } = useCart();

  const imageUrl =
    product.image || 'https://via.placeholder.com/300x250.png?text=No+Image';

  return (
    <div className="clay-soft flex flex-col overflow-hidden">
      <img
        src={imageUrl}
        alt={product.name}
        className="w-full h-[250px] object-cover transition-transform duration-500 hover:scale-110"
      />
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl text-primary mb-2 font-heading">{product.name}</h3>
        <p className="text-sm mt-2 flex-grow text-gray-600">{product.description}</p>
        <p className="text-xl font-bold text-secondary mt-4">R{product.price.toFixed(2)}</p>
      </div>
      <div className="p-0 px-6 pb-6">
        <button className="btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;