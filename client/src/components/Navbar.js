import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ itemCount, openCart, username, handleLogout }) => (
  <nav style={styles.navbar}>
    <div style={styles.branding}>
      <h1 style={styles.logo}>Welcome to the Legacy Library</h1>
    </div>

    <div style={styles.navItems}>
      {username && <span style={styles.welcomeText}>Hello, {username}</span>}
      
      <button onClick={openCart} style={styles.cartButton}>
        <FontAwesomeIcon icon={faShoppingCart} style={styles.icon} /> 
        Cart ({itemCount})
      </button>

      {username ? (
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      ) : (
        <button style={styles.loginButton}>
          <FontAwesomeIcon icon={faUserCircle} style={styles.icon} /> Login
        </button>
      )}
    </div>
  </nav>
);

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#333',
    color: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  branding: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: '1px',
    margin: 0,
  },
  navItems: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  welcomeText: {
    fontSize: '16px',
    fontWeight: '500',
  },
  cartButton: {
    backgroundColor: '#007bff',
    border: 'none',
    color: '#fff',
    padding: '10px 15px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '25px',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.2s ease',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    border: 'none',
    color: '#fff',
    padding: '10px 15px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '25px',
    transition: 'background-color 0.2s ease',
  },
  loginButton: {
    backgroundColor: '#28a745',
    border: 'none',
    color: '#fff',
    padding: '10px 15px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '25px',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.2s ease',
  },
  icon: {
    marginRight: '8px',
  },
};

export default Navbar;
