import { useState } from 'react';
import Header from "../components/Header.js";
import qrCodeImage from '../images/qr2.jpeg';


function Order() {
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    address: '',
    landmark: '',
    pincode: '',
  });
  const [showOrderSummary, setShowOrderSummary] = useState(false); // To toggle the display of the order summary
  const [order, setOrder] = useState(JSON.parse(localStorage.getItem('order')) || []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({
      ...orderDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowOrderSummary(true); // Show the order summary after form submission
  };

  const calculateTotal = () => {
    return order.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container">
      <Header />
      <h2 className="text-center my-4">Order Details</h2>

      {/* Show form first */}
      {!showOrderSummary ? (
        <div>
          <h4 className="my-4">Fill in your details</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control w-50"
                id="name"
                name="name"
                value={orderDetails.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Full Address
              </label>
              <input
                type="text"
                className="form-control w-50"
                id="address"
                name="address"
                value={orderDetails.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="landmark" className="form-label">
                Landmark
              </label>
              <input
                type="text"
                className="form-control w-50"
                id="landmark"
                name="landmark"
                value={orderDetails.landmark}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pincode" className="form-label">
                Pincode
              </label>
              <input
                type="text"
                className="form-control w-50"
                id="pincode"
                name="pincode"
                value={orderDetails.pincode}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              Submit Details
            </button>
          </form>
        </div>
      ) : (
        <div>

          <h4 className="my-4">Your Order</h4>
          {order.length === 0 ? (
            <p>Your cart is empty. Please add items to the cart first.</p>
          ) : (
            <div>
              {order.map((item, index) => (
                <p key={index}>
                  {item.name} - Rs {item.price} x {item.quantity}
                </p>
              ))}
            </div>
          )}

          <h4>Total: Rs {calculateTotal()}</h4>

          {/* Paytm QR Code Image */}
          <div className="my-4">
            <h4>Scan the QR code below to make the payment</h4>
            <img
              src={qrCodeImage}
              alt="Paytm QR Code"
              style={{ width: '200px', height: '200px', borderRadius: '8px' }}
            />
            <p className="mt-3">Scan the QR code to complete your payment.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Order;
