import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  // Calculate charges
  const calculateTotal = () =>
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  // Function to handle quantity of the orders
  const updateQuantity = (id, delta) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Handle function to remove items from cart
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const placeOrder = () => {
    localStorage.setItem('order', JSON.stringify(cart));
    localStorage.removeItem('cart');
    navigate('/orders');
  };

  return (
    <div className="container">
      <Header />
      <h2 className="my-4 text-center">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              className="row align-items-center mb-3 p-2 border rounded"
            >
              <div className="col-md-4 col-12 text-center mb-3 mb-md-0">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-fluid"
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: '100%',
                      height: '200px',
                      backgroundColor: '#f0f0f0',
                    }}
                  >
                    <span>No Image</span>
                  </div>
                )}
              </div>
              <div className="col-md-5 col-12 text-center text-md-start">
                <h5>{item.name}</h5>
                <p>Price: Rs {item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="col-md-3 col-12 text-center">
                {/* Manage the quantity of the items */}
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  -
                </button>
                <button
                  className="btn btn-success btn-sm mx-2"
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  +
                </button>
                <button
                  className="btn btn-danger btn-sm mx-2"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total price calculated */}
          <h4 className="text-center mt-4">Total: Rs {calculateTotal()}</h4>
          <button
            className="btn btn-success w-100 mt-4 mb-5"
            onClick={placeOrder}
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
