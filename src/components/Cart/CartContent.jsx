import styles from "./CartContent.module.css";
import { RiDiscountPercentLine } from "react-icons/ri";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

function CartContent({cartItems, removeCartItem ,handleCartQuantity, handleOnProcessed}) {
  
  // Calculate totals
  const handle = (behaviour , Id) => {
    handleCartQuantity(behaviour , Id)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 500 ? 0 : 50;
  const discount = subtotal > 1000 ? 100 : 0;
  const total = subtotal + deliveryFee - discount;

  return (
    <div className={styles.cartContainer}>
      <div className={styles.leftCart}>
        <div className={styles.couponContainer1}>
          <h1>No delivery charges for Members</h1>
          <p>Become a member of our restaurant. Join us or Sign in</p>
        </div>

        {cartItems.length > 0 ? (
          <div className={styles.itemArray}>
            {cartItems.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.cartItemImage}>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className={styles.cartItemContent}>
                  <h3 className={styles.cartItemTitle}>{item.name}</h3>
                  <p className={styles.cartItemDesc}>{item.description}</p>
                  <div className={styles.cartItemPrice}>
                    ₹{item.price}
                  </div>
                  <div className={styles.cartItemControls}>
                    <div className={styles.quantityControl}>
                      <button onClick={() => handle("dec", item.id)}><FaMinus /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handle("add", item.id)}><FaPlus /></button>
                    </div>
                    <button onClick={() => removeCartItem(item)} className={styles.removeBtn}>
                      <FaTrash size={14} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyCart}>
            <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" alt="Empty cart" />
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added anything to your cart yet</p>
            <button className={styles.emptyCartBtn}>Explore Menu</button>
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className={styles.rightCart}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Subtotal</span>
            <span className={styles.summaryValue}>₹{subtotal}</span>
          </div>
          
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Delivery Fee</span>
            <span className={styles.summaryValue}>
              {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
            </span>
          </div>
          
          {discount > 0 && (
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Discount</span>
              <span className={styles.summaryValue} style={{ color: '#e63946' }}>
                -₹{discount}
              </span>
            </div>
          )}
          
          <div className={styles.discountRow}>
            <RiDiscountPercentLine size={20} />
            <span>Apply coupon code</span>
          </div>
          
          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <span className={styles.summaryLabel}>Total</span>
            <span className={styles.summaryValue}>₹{total}</span>
          </div>
          
          <button onClick={handleOnProcessed(cartItems)} className={styles.checkoutBtn}>Proceed Order</button>
        </div>
      )}
    </div>
  );
}

export default CartContent;