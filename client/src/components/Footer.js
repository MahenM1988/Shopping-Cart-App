import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    fontSize: '14px', 
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '10px 30px', 
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000, 
  };

  const copyrightStyle = {
    flex: 1, 
    textAlign: 'left', 
    fontSize: '12px', 
    color: '#bbb', 
  };

  const iconContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-end', 
    gap: '20px', 
  };

  const imageStyle = {
    width: '30px', 
    height: 'auto',
  };

  return (
    <div style={footerStyle}>
      <div style={copyrightStyle}>
        <p>&copy; {new Date().getFullYear()} Mahen Mahindaratne. All rights reserved.</p>
      </div>

      <div style={iconContainerStyle}>
        <img src="/assets/visa.svg" alt="Visa" style={imageStyle} />
        <img src="/assets/mastercard.svg" alt="MasterCard" style={imageStyle} />
        <img src="/assets/amex.svg" alt="American Express" style={imageStyle} />
        <img src="/assets/discover.svg" alt="Discover" style={imageStyle} />
      </div>
    </div>
  );
};

export default Footer;
