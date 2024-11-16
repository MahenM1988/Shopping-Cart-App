import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash, faShoppingCart, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import './Cart.css'; 

const Cart = ({ cartItems, updateQuantity, removeFromCart, closeCart }) => {
  const [isPaymentVisible, setPaymentVisible] = useState(false);
  const [error, setError] = useState('');  
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [address] = useState({
    line1: '10880 Malibu Point',
    city: 'Malibu',
    state: 'CA',
    postal_code: '90265',
    country: 'US'
  });

  const baseTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const deliveryCost = deliveryOption === 'express' ? 10 : 0;

  const total = baseTotal + deliveryCost;

  const handleProceedToPayment = () => setPaymentVisible(true);
  const handleClosePayment = () => setPaymentVisible(false);

  return (
    <div className="cart-popup">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <h3>{item.name}</h3>
            <p>Price: ${item.price.toFixed(2)}</p>
            <div className="quantity-controls">
              <button onClick={() => (item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeFromCart(item.id))}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <button onClick={() => removeFromCart(item.id)}>
                Remove From Cart <FontAwesomeIcon icon={faTrash} style={{ marginLeft: '8px' }} />
              </button>
            </div>
          </div>
        ))
      )}
      
      <h3>Delivery Option</h3>
      <select value={deliveryOption} onChange={(e) => setDeliveryOption(e.target.value)}>
        <option value="standard">Standard - Free</option>
        <option value="express">Express - $10.00</option>
      </select>

      <h3>Subtotal: ${baseTotal.toFixed(2)}</h3>
      <h3>Delivery Cost: ${deliveryCost.toFixed(2)}</h3>
      <h3>Total: ${total.toFixed(2)}</h3>

      <button onClick={closeCart}>
        <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: '8px' }} />
        Continue Shopping
      </button>
      {cartItems.length > 0 && (
        <button onClick={handleProceedToPayment}>
          <FontAwesomeIcon icon={faCreditCard} style={{ marginRight: '8px' }} />
          Proceed to Payment
        </button>
      )}
      {isPaymentVisible && (
        <PaymentForm 
          totalAmount={total}
          cartItems={cartItems}
          handleClosePayment={handleClosePayment}
          setError={setError}
          error={error}
          deliveryOption={deliveryOption}
          address={address}
        />
      )}
    </div>
  );
};

const PaymentForm = ({ totalAmount, cartItems, handleClosePayment, setError, error, deliveryOption, setDeliveryOption, address, setAddress }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const response = await fetch('http://localhost:5000/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        amount: totalAmount * 100,
        deliveryOption,
        address 
      }),
    });

    const { clientSecret } = await response.json();

    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          address: {
            line1: address.line1,
            city: address.city,
            state: address.state,
            postal_code: address.postal_code,
            country: address.country,
          },
        },
      },
    });

    if (stripeError) setError(stripeError.message);
    else if (paymentIntent.status === 'succeeded') {
      alert('Payment successful!');
      handleClosePayment();
    } else setError('Payment failed, please try again.');
  };

  return (
    <div className="payment-form">
      <h2>Complete Your Payment</h2>
      <p><strong>Powered by Stripe</strong></p>
      <p>For testing, use 4242 4242 4242 4242 as the card number. The expiration date can be any future date, and the CVC can be any 3 digits. Use any five digits for the zip code</p>
      <form onSubmit={handleSubmit}>
        
        <h3>Shipping Address</h3>
        <input type="text" placeholder="Address Line 1" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} required />
        <input type="text" placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} required />
        <input type="text" placeholder="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} required />
        <input type="text" placeholder="Postal Code" value={address.postal_code} onChange={(e) => setAddress({ ...address, postal_code: e.target.value })} required />
        <input type="text" placeholder="Country" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} required />

        <h3>Payment Details</h3>
        <CardElement />
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={!stripe}>Pay ${totalAmount.toFixed(2)}</button>
      </form>
      <button onClick={handleClosePayment}>Cancel</button>
    </div>
  );
};

export default Cart;