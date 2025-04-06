
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { MdTimer, MdCheckCircle, MdOutlineDeliveryDining } from "react-icons/md";
// import QRCode from "react-qr-code";
// import styles from "./OrderConfirmation.module.css";
// import axios from "axios";

// function OrderConfirmation() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [order, setOrder] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(30);
//   const [isPaid, setIsPaid] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     table_number: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (location.state?.order) {
//       setOrder(location.state.order);
//       setTimeLeft(location.state.order.estimatedTime || 30);
//     } else {
//       navigate("/");
//     }
//   }, [location, navigate]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(prev => (prev <= 1 ? 0 : prev - 1));
//     }, 60000);
//     return () => clearInterval(timer);
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handlePaymentSuccess = async () => {
//     if (!formData.name || !formData.table_number) {
//       alert("Please enter your name and table number");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//         const data = {
//           name:formData.name,
//           dish_name:order.name,
//           quantity:order.quantity,
//           total_amount:order.price,
//           status:"pending",
//           delivery_address:"some place",
//           payment_status:true,
//           table_number:formData.table_number,
//           image:order.image,

//         }

//         const res = await axios.post("http://127.0.0.1:8000/api/orders/",data);


//         console.log("res in create order",res.data);

//         if(res.data){
//           setIsSubmitting(false);
//         }



//         console.log("data is ",data);
//     } catch (error) {

//       console.log("could not create the order please try again later");
//       console.log("error in cloud order create ",error);
//     }

//   };

//   if (!order) {
//     return (
//       <div className={styles.loading}>
//         <p>Loading order details...</p>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.card}>
//         <div className={styles.header}>
//           <h2>Order Confirmation</h2>
//           <p className={styles.orderId}>Order # {order.id || "ORD" + Math.floor(Math.random() * 10000)}</p>
//         </div>

//         {!isPaid && (
//           <div className={styles.customerForm}>
//             <h3>Your Details</h3>
//             <div className={styles.formGroup}>
//               <label>Full Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 placeholder="Enter your name"
//                 required
//               />
//             </div>
//             <div className={styles.formGroup}>
//               <label>Table Number</label>
//               <input
//                 type="number"
//                 name="table_number"
//                 value={formData.table_number}
//                 onChange={handleInputChange}
//                 placeholder="Enter table number"
//                 min="1"
//                 required
//               />
//             </div>
//           </div>
//         )}

//         <div className={styles.statusSection}>
//           <div className={styles.statusItem}>
//             <div className={`${styles.statusIcon} ${styles.active}`}>
//               <MdCheckCircle />
//             </div>
//             <p>Order Placed</p>
//           </div>

//           <div className={styles.statusLine}></div>

//           <div className={styles.statusItem}>
//             <div className={`${styles.statusIcon} ${isPaid ? styles.active : ''}`}>
//               <MdCheckCircle />
//             </div>
//             <p>Payment</p>
//           </div>

//           <div className={styles.statusLine}></div>

//           <div className={styles.statusItem}>
//             <div className={`${styles.statusIcon} ${timeLeft <= 10 ? styles.active : ''}`}>
//               <MdOutlineDeliveryDining />
//             </div>
//             <p>Delivery</p>
//           </div>
//         </div>

//         <div className={styles.orderDetails}>
//           <h3>Your Order</h3>
//           <div className={styles.orderItem}>
//             <img src={order.image} alt={order.dish_name} className={styles.itemImage} />
//             <div className={styles.itemInfo}>
//               <p className={styles.itemName}>{order.dish_name}</p>
//               <p className={styles.itemMeta}>
//                 {formData.name && (
//                   <span className={styles.customerInfo}>
//                     {formData.name} • Table {formData.table_number}
//                   </span>
//                 )}
//               </p>
//               <p className={styles.itemPrice}>₹{order.price || order.total_amount}</p>
//             </div>
//           </div>

//           <div className={styles.totalSection}>
//             <div className={styles.totalRow}>
//               <span>Subtotal</span>
//               <span>₹{order.price || order.total_amount}</span>
//             </div>
//             <div className={styles.totalRow}>
//               <span>Delivery Fee</span>
//               <span>₹{order.deliveryFee || 0}</span>
//             </div>
//             <div className={styles.totalRow}>
//               <span>Tax</span>
//               <span>₹{order.tax || 0}</span>
//             </div>
//             <div className={`${styles.totalRow} ${styles.grandTotal}`}>
//               <span>Total</span>
//               <span>₹{order.total || order.price || order.total_amount}</span>
//             </div>
//           </div>
//         </div>

//         <div className={styles.deliveryInfo}>
//           <div className={styles.timeInfo}>
//             <MdTimer className={styles.timeIcon} />
//             <div>
//               <p>Estimated Delivery Time</p>
//               <p className={styles.time}>{timeLeft} minutes</p>
//             </div>
//           </div>
//         </div>

//         {!isPaid ? (
//           <div className={styles.paymentSection}>
//             <h3>Complete Payment</h3>
//             <p>Scan the QR code below to pay with UPI</p>

//             <div className={styles.qrCodeContainer}>
//               <QRCode 
//                 value={`upi://pay?pa=sahvendra123@ybl&pn=MyRestaurant&am=${order.total || order.price || order.total_amount}&tn=Order_${order.id}`}
//                 size={200}
//                 level="H"
//               />
//             </div>

//             <p className={styles.amount}>₹{order.total || order.price || order.total_amount}</p>

//             <button
//               onClick={handlePaymentSuccess}
//               className={styles.payButton}
//               disabled={isSubmitting || !formData.name || !formData.table_number}
//             >
//               {isSubmitting ? 'Processing...' : 'I\'ve Paid'}
//             </button>
//           </div>
//         ) : (
//           <div className={styles.paymentSuccess}>
//             <MdCheckCircle className={styles.successIcon} />
//             <h3>Payment Successful!</h3>
//             <p>Your order is being prepared for Table {formData.table_number}.</p>
//             <p>Estimated delivery in {timeLeft} minutes.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default OrderConfirmation;






import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdTimer, MdCheckCircle, MdOutlineDeliveryDining } from "react-icons/md";
import QRCode from "react-qr-code";
import styles from "./OrderConfirmation.module.css";
import axios from "axios";

function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPaid, setIsPaid] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    table_number: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    if (location.state?.order) {
      setOrder(location.state.order);
      setTimeLeft(location.state.order.estimatedTime || 30);
    } else {
      navigate("/");
    }
  }, [location, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev <= 1 ? 0 : prev - 1));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentSuccess = async () => {
    if (!formData.name || !formData.table_number) {
      alert("Please enter your name and table number");
      return;
    }

    setIsSubmitting(true);
    console.log("ORder is ", order)

    try {
      const data = {
        user_name: formData.name,
        dish: order.name,
        quantity: order.quantity || 1,
        total_amount: order.price || order.total_amount,
        status: "delivered",
        delivery_address: "Restaurant Table Delivery",
        payment_status: true,
        table_number: formData.table_number,
        image: order.image,
      };


      console.log("data is ", data);
      const res = await axios.post("http://127.0.0.1:8000/api/orders/", data);

      if (res.data) {
        setIsSubmitting(false);
        setIsPaid(true);

        // Show success message for 3 seconds before redirecting
        setOrderSuccess(true);
        // setTimeout(() => {
        //   navigate("/orders"); // Redirect to orders page
        // }, 3000);
      }
    } catch (error) {
      console.error("Order creation failed:", error);
      alert("Order creation failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (!order) {
    return (
      <div className={styles.loading}>
        <p>Loading order details...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {orderSuccess ? (
        <div className={styles.successOverlay}>
          <div className={styles.successMessage}>
            <MdCheckCircle className={styles.successIconLarge} />
            <h2>Order Placed Successfully!</h2>
            <p>Your food will be served at Table {formData.table_number} shortly.</p>
            <Link to={'/menu'}>Explore more items</Link>
          </div>
        </div>
      ) : (
        <div className={styles.card}>
          <div className={styles.header}>
            <h2>Order Confirmation</h2>
            <p className={styles.orderId}>Order # {order.id || "ORD" + Math.floor(Math.random() * 10000)}</p>
          </div>

          {!isPaid && (
            <div className={styles.customerForm}>
              <h3>Your Details</h3>
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Table Number</label>
                <input
                  type="number"
                  name="table_number"
                  value={formData.table_number}
                  onChange={handleInputChange}
                  placeholder="Enter table number"
                  min="1"
                  required
                />
              </div>
            </div>
          )}

          <div className={styles.statusSection}>
            <div className={styles.statusItem}>
              <div className={`${styles.statusIcon} ${styles.active}`}>
                <MdCheckCircle />
              </div>
              <p>Order Placed</p>
            </div>

            <div className={styles.statusLine}></div>

            <div className={styles.statusItem}>
              <div className={`${styles.statusIcon} ${isPaid ? styles.active : ''}`}>
                <MdCheckCircle />
              </div>
              <p>Payment</p>
            </div>

            <div className={styles.statusLine}></div>

            <div className={styles.statusItem}>
              <div className={`${styles.statusIcon} ${timeLeft <= 10 ? styles.active : ''}`}>
                <MdOutlineDeliveryDining />
              </div>
              <p>Delivery</p>
            </div>
          </div>

          <div className={styles.orderDetails}>
            <h3>Your Order</h3>
            <div className={styles.orderItem}>
              <img src={order.image} alt={order.dish_name || order.name} className={styles.itemImage} />
              <div className={styles.itemInfo}>
                <p className={styles.itemName}>{order.dish_name || order.name}</p>
                <p className={styles.itemMeta}>
                  {formData.name && (
                    <span className={styles.customerInfo}>
                      {formData.name} • Table {formData.table_number}
                    </span>
                  )}
                </p>
                <p className={styles.itemPrice}>₹{order.price || order.total_amount}</p>
              </div>
            </div>

            <div className={styles.totalSection}>
              <div className={styles.totalRow}>
                <span>Subtotal</span>
                <span>₹{order.price || order.total_amount}</span>
              </div>
              <div className={styles.totalRow}>
                <span>Delivery Fee</span>
                <span>₹{order.deliveryFee || 0}</span>
              </div>
              <div className={styles.totalRow}>
                <span>Tax</span>
                <span>₹{order.tax || 0}</span>
              </div>
              <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                <span>Total</span>
                <span>₹{order.total || order.price || order.total_amount}</span>
              </div>
            </div>
          </div>

          <div className={styles.deliveryInfo}>
            <div className={styles.timeInfo}>
              <MdTimer className={styles.timeIcon} />
              <div>
                <p>Estimated Delivery Time</p>
                <p className={styles.time}>{timeLeft} minutes</p>
              </div>
            </div>
          </div>

          {!isPaid ? (
            <div className={styles.paymentSection}>
              <h3>Complete Payment</h3>
              <p>Scan the QR code below to pay with UPI</p>

              <div className={styles.qrCodeContainer}>
                <QRCode
                  // value={`upi://pay?pa=sahvendra1@oksbi&pn=sahvendreResto&am=${order.total || order.price || order.total_amount}&tn=Order_${order.id}`} 

                  value={`upi://pay?pa=manishkeer530@oksbi&pn=ManishRestorent&am=${order.total || order.price || order.total_amount}&tn=Order_${order.id}`}
                  size={200}
                  level="H"
                />
              </div>

              <p className={styles.amount}>₹{order.total || order.price || order.total_amount}</p>

              <button
                onClick={handlePaymentSuccess}
                className={styles.payButton}
                disabled={isSubmitting || !formData.name || !formData.table_number}
              >
                {isSubmitting ? 'Processing...' : 'I\'ve Paid'}
              </button>
            </div>
          ) : (
            <div className={styles.paymentSuccess}>
              <MdCheckCircle className={styles.successIcon} />
              <h3>Payment Successful!</h3>
              <p>Your order is being prepared for Table {formData.table_number}.</p>
              <p>Estimated delivery in {timeLeft} minutes.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OrderConfirmation;