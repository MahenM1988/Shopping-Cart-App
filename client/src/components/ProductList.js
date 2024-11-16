import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer';

const Modal = ({ image, onClose }) => {
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <img 
        src={image} 
        alt="Full size" 
        style={{
          maxHeight: '80%',
          maxWidth: '80%',
          objectFit: 'contain',
          borderRadius: '8px',
        }} 
      />
    </div>
  );
};

const ProductList = ({ products, addToCart }) => {
  const [quantities, setQuantities] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const handleQuantityChange = (id, change) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[id] || 0;
      const newQuantity = Math.max(0, Math.min(currentQuantity + change, products.find(product => product.id === id).available));
      return { ...prevQuantities, [id]: newQuantity };
    });
  };

  const openModal = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  const productItemStyle = {
    border: '1px solid #e5e5e5',
    borderRadius: '12px',
    padding: '20px',
    margin: '15px',
    width: 'calc(33.33% - 30px)',
    boxSizing: 'border-box',
    textAlign: 'center',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  };

  const quantityControlsStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '15px',
    gap: '10px',
  };

  const buttonStyle = {
    backgroundColor: '#0071e3',
    border: 'none',
    color: '#ffffff',
    padding: '8px 14px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    margin: '0 5px',
    textAlign: 'center',
  };

  const addToCartButtonStyle = {
    backgroundColor: '#28a745',
    border: 'none',
    color: '#ffffff',
    padding: '12px 20px',
    fontSize: '18px',
    cursor: 'pointer',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  };

  const iconStyle = {
    marginRight: '10px',
  };

  const imageStyle = {
    width: '45%',  
    height: 'auto',
    borderRadius: '8px',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {products.map(product => {
          const quantity = quantities[product.id] || 0;

          return (
            <div key={product.id} style={productItemStyle}>
              <img 
                src={`/images/${product.image}`}
                alt={product.name}
                style={imageStyle}
                onClick={() => openModal(`/images/${product.image}`)}  
              />

              <h2 style={{ fontSize: '20px', margin: '10px 0' }}>{product.name}</h2>
              <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '10px 0' }}>${product.price.toFixed(2)}</p>
              <div style={quantityControlsStyle}>
                <button 
                  onClick={() => handleQuantityChange(product.id, -1)} 
                  disabled={quantity === 0} 
                  style={buttonStyle}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span style={{ fontSize: '16px', margin: '0 10px' }}>{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(product.id, 1)} 
                  disabled={quantity >= product.available} 
                  style={buttonStyle}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <button 
                onClick={() => {
                  if (quantity > 0) {
                    addToCart({ ...product, quantity });
                    handleQuantityChange(product.id, -quantity);
                  }
                }} 
                style={addToCartButtonStyle}
              >
                <FontAwesomeIcon icon={faShoppingCart} style={iconStyle} />
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>

      {isModalOpen && <Modal image={modalImage} onClose={closeModal} />}
      
      <Footer />
    </div>
  );
};

export default ProductList;
