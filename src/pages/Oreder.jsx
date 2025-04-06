import { useState } from 'react';
import styles from './Order.module.css';
import { FaCheckCircle, FaTimesCircle, FaShoppingCart, FaMapMarkerAlt, FaClock, FaPhone } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';

function Order({orderItems, setHistory}) {
  const [cartItems, setCartItems] = useState(orderItems);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'cash'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);
  const [orderId, setOrderId] = useState('');

  const handleQuantityChange = (id, change) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Randomly determine success (80% chance) for demo purposes
      const isSuccess = Math.random() > 0.2;
      
      if (isSuccess) {
        const newOrderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
        setOrderId(newOrderId);
        setOrderStatus('success');
        // Clear cart on success
        setCartItems([]);
      } else {
        setOrderStatus('error');
      }
    } catch (err) {
      setOrderStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = subtotal > 500 ? 0 : 50;
    return subtotal + deliveryFee;
  };

  const closeStatusMessage = () => {
    setOrderStatus(null);
  };

  return (
    <div className={styles.orderContainer}>
      <h1 className={styles.orderTitle}>Place Your Order</h1>
      
      {orderStatus && (
        <div className={`${styles.statusMessage} ${styles[orderStatus]}`}>
          <div className={styles.statusContent}>
            {orderStatus === 'success' ? (
              <>
                <FaCheckCircle className={styles.statusIcon} />
                <h3>Order Placed Successfully!</h3>
                <p>Your order ID: {orderId}</p>
                <p>Estimated delivery time: 30-45 minutes</p>
              </>
            ) : (
              <>
                <FaTimesCircle className={styles.statusIcon} />
                <h3>Order Failed</h3>
                <p>There was an issue processing your order. Please try again.</p>
              </>
            )}
            <button 
              onClick={closeStatusMessage}
              className={styles.closeButton}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className={styles.orderGrid}>
        <div className={styles.orderFormSection}>
          <form onSubmit={handleSubmit} className={styles.orderForm}>
            <h2 className={styles.sectionTitle}>
              <FaMapMarkerAlt className={styles.sectionIcon} />
              Delivery Information
            </h2>
            
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? styles.errorInput : ''}
              />
              {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={errors.phone ? styles.errorInput : ''}
              />
              {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="address">Delivery Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                className={errors.address ? styles.errorInput : ''}
              />
              {errors.address && <span className={styles.errorMessage}>{errors.address}</span>}
            </div>
            
            <h2 className={styles.sectionTitle}>
              <MdPayment className={styles.sectionIcon} />
              Payment Method
            </h2>
            
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={formData.paymentMethod === 'cash'}
                  onChange={handleInputChange}
                />
                <span className={styles.radioCustom}></span>
                Cash on Delivery
              </label>
              
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleInputChange}
                />
                <span className={styles.radioCustom}></span>
                Credit/Debit Card
              </label>
              
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={handleInputChange}
                />
                <span className={styles.radioCustom}></span>
                UPI Payment
              </label>
            </div>
            
            <button
              onClick={() => setHistory(orderItems)}
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting || cartItems.length === 0}
            >
              {isSubmitting ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>
        
        <div className={styles.orderSummarySection}>
          <div className={styles.summaryCard}>
            <h2 className={styles.sectionTitle}>
              <FaShoppingCart className={styles.sectionIcon} />
              Order Summary
            </h2>
            
            {cartItems.length > 0 ? (
              <>
                <div className={styles.orderItems}>
                  {cartItems.map(item => (
                    <div key={item.id} className={styles.orderItem}>
                      <div className={styles.itemImage}>
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className={styles.itemDetails}>
                        <h4>{item.name}</h4>
                        <div className={styles.itemControls}>
                          <button 
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className={styles.quantityButton}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className={styles.quantityButton}
                          >
                            +
                          </button>
                          <span className={styles.itemPrice}>₹{item.price * item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className={styles.summaryDetails}>
                  <div className={styles.summaryRow}>
                    <span>Subtotal</span>
                    <span>₹{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Delivery Fee</span>
                    <span>{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) > 500 ? 'FREE' : '₹50'}</span>
                  </div>
                  <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                    <span>Total</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.emptyCart}>
                <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" alt="Empty cart" />
                <p>Your cart is empty</p>
              </div>
            )}
          </div>
          
          <div className={styles.deliveryInfo}>
            <h2 className={styles.sectionTitle}>
              <FaClock className={styles.sectionIcon} />
              Delivery Info
            </h2>
            <p>Estimated delivery time: 30-45 minutes</p>
            <p>Minimum order: ₹200</p>
            <p>Free delivery on orders above ₹500</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;