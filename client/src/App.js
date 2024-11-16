import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import productsData from './data/products.json';
import Login from './components/Login';

const stripePromise = loadStripe('pk_test_51QI9dHDQGZMdMxYUxbStXWmPWdBBaVPoWtO5iCWimzpi7jDt2UPrVusfO0DaXRU4VJYMtn03frgDCiYgnGggD0tv00mHyPvkYR');

const App = () => {
  const initialInventory = productsData.map(product => ({ ...product }));
  const [inventory, setInventory] = useState(initialInventory);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    const totalQuantityInCart = existingItem ? existingItem.quantity : 0;
    const totalQuantityAvailable = inventory.find(item => item.id === product.id).available;

    if (totalQuantityInCart + product.quantity <= totalQuantityAvailable) {
      if (existingItem) {
        const updatedCart = cart.map(item =>
          item.id === product.id
            ? { ...existingItem, quantity: existingItem.quantity + product.quantity }
            : item
        );
        setCart(updatedCart);
      } else {
        setCart([...cart, product]);
      }

      setInventory(inventory.map(item =>
        item.id === product.id
          ? { ...item, available: item.available - product.quantity }
          : item
      ));
    }
  };

  const updateQuantity = (id, quantity) => {
    const itemInCart = cart.find(item => item.id === id);
    if (itemInCart) {
      const currentQuantity = itemInCart.quantity;
      const itemAvailable = inventory.find(item => item.id === id).available;

      if (quantity < currentQuantity) {
        const quantityToRemove = currentQuantity - quantity;
        setInventory(inventory.map(item =>
          item.id === id
            ? { ...item, available: item.available + quantityToRemove }
            : item
        ));
      } else if (quantity > currentQuantity) {
        if (itemAvailable >= quantity - currentQuantity) {
          setInventory(inventory.map(item =>
            item.id === id
              ? { ...item, available: item.available - (quantity - currentQuantity) }
              : item
          ));
        } else {
          return;
        }
      }

      setCart(cart.map(item => item.id === id ? { ...item, quantity } : item));
    } else {
      if (quantity < 1) {
        removeFromCart(id);
      }
    }
  };

  const removeFromCart = (id) => {
    const itemInCart = cart.find(item => item.id === id);
    if (itemInCart) {
      setCart(cart.filter(item => item.id !== id));
      setInventory(inventory.map(item =>
        item.id === id
          ? { ...item, available: item.available + itemInCart.quantity }
          : item
      ));
    }
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
        setIsAuthenticated(true);
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    await fetch('http://localhost:5000/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setUsername('');
  };

  return (
    <div className="main-container">
      {isAuthenticated ? (
        <>
          <Navbar 
            itemCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
            openCart={toggleCart} 
            username={username} 
            handleLogout={handleLogout} 
          />
          <ProductList products={inventory} addToCart={addToCart} />
          {isCartOpen && (
            <Elements stripe={stripePromise}>
              <Cart
                cartItems={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                closeCart={toggleCart}
              />
            </Elements>
          )}
        </>
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </div>
  );  
};

export default App;
