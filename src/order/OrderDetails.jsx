// // // import axios from 'axios'
// // // import React, { useEffect } from 'react'

// // // function OrderDetails() {

// // //     const fetchOrdersData = async () => {
// // //         try {
// // //             const res = await axios.get("http://127.0.0.1:8000/api/orders/")

// // //             console.log("res is ", res.data);



// // //         } catch (error) {
// // //             console.log("errro is that", error)
// // //             console.log("could not get the orders")
// // //         }
// // //     }

// // //     useEffect(() => {
// // //         fetchOrdersData()
// // //     }, [])

// // //     return (
// // //         <div>

// // //             <h1>I Love You SMMSMMLLMD</h1>
// // //         </div>
// // //     )
// // // }

// // // export default OrderDetails




// // import axios from 'axios';
// // import React, { useEffect, useState } from 'react';
// // import styles from './OrderDetails.module.css';

// // function OrderDetails() {
// //     const [orders, setOrders] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);

// //     const fetchOrdersData = async () => {
// //         try {
// //             const res = await axios.get("http://127.0.0.1:8000/api/orders/");
// //             setOrders(res.data);
// //             setLoading(false);
// //         } catch (error) {
// //             console.error("Error fetching orders:", error);
// //             setError("Failed to load orders. Please try again later.");
// //             setLoading(false);
// //         }
// //     };

// //     useEffect(() => {
// //         fetchOrdersData();
// //     }, []);

// //     const formatDate = (dateString) => {
// //         const options = { 
// //             year: 'numeric', 
// //             month: 'long', 
// //             day: 'numeric',
// //             hour: '2-digit',
// //             minute: '2-digit'
// //         };
// //         return new Date(dateString).toLocaleDateString(undefined, options);
// //     };

// //     if (loading) {
// //         return <div className={styles.loading}>Loading orders...</div>;
// //     }

// //     if (error) {
// //         return <div className={styles.error}>{error}</div>;
// //     }

// //     return (
// //         <div className={styles.container}>
// //             <div className={styles.header}>
// //                 <h1>Order Details</h1>
// //                 <p>View and manage all customer orders</p>
// //             </div>

// //             <div className={styles.ordersGrid}>
// //                 {orders.map(order => (
// //                     <div key={order.id} className={styles.orderCard}>
// //                         <div className={styles.orderHeader}>
// //                             <span className={styles.orderId}>Order #{order.id}</span>
// //                             <span className={`${styles.orderStatus} ${order.status === 'pending' ? styles.statusPending : styles.statusCompleted}`}>
// //                                 {order.status}
// //                             </span>
// //                         </div>

// //                         <div className={styles.detailRow}>
// //                             <span className={styles.detailLabel}>Total Amount:</span>
// //                             <span className={styles.detailValue}>${order.total_amount}</span>
// //                         </div>

// //                         <div className={styles.detailRow}>
// //                             <span className={styles.detailLabel}>Ordered At:</span>
// //                             <span className={styles.detailValue}>{formatDate(order.ordered_at)}</span>
// //                         </div>

// //                         <div className={styles.detailRow}>
// //                             <span className={styles.detailLabel}>Table Number:</span>
// //                             <span className={styles.detailValue}>{order.table_number}</span>
// //                         </div>

// //                         <div className={styles.detailRow}>
// //                             <span className={styles.detailLabel}>Payment:</span>
// //                             <span className={`${styles.paymentStatus} ${order.payment_status ? styles.paymentPaid : styles.paymentUnpaid}`}>
// //                                 {order.payment_status ? 'Paid' : 'Unpaid'}
// //                             </span>
// //                         </div>

// //                         {order.image && (
// //                             <img 
// //                                 src={order.image} 
// //                                 alt={`Order ${order.id}`} 
// //                                 className={styles.orderImage}
// //                             />
// //                         )}
// //                     </div>
// //                 ))}
// //             </div>
// //         </div>
// //     );
// // }

// // export default OrderDetails;




// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import styles from './OrderDetails.module.css';
// import { motion } from 'framer-motion';

// function OrderDetails() {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const fetchOrdersData = async () => {
//         try {
//             const res = await axios.get("http://127.0.0.1:8000/api/orders/");
//             setOrders(res.data);
//             setLoading(false);
//         } catch (error) {
//             console.error("Error fetching orders:", error);
//             setError("Failed to load orders. Please try again later.");
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchOrdersData();
//     }, []);

//     const formatDate = (dateString) => {
//         const options = { 
//             year: 'numeric', 
//             month: 'long', 
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//         };
//         return new Date(dateString).toLocaleDateString(undefined, options);
//     };

//     if (loading) {
//         return (
//             <div className={styles.loadingContainer}>
//                 <motion.div
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                     className={styles.spinner}
//                 />
//                 <p>Loading orders...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <motion.div 
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className={styles.error}
//             >
//                 {error}
//                 <button 
//                     onClick={fetchOrdersData}
//                     className={styles.retryButton}
//                 >
//                     Retry
//                 </button>
//             </motion.div>
//         );
//     }

//     return (
//         <div className={styles.container}>
//             <motion.div 
//                 initial={{ opacity: 0 }}
//                 // animate={{ opacity: 1 }}
//                 // transition={{ duration: 0.5 }}
//                 className={styles.header}
//             >
//                 <h1>Order Details</h1>
//                 <p>View and manage all customer orders</p>
//             </motion.div>

//             <div className={styles.ordersGrid}>
//                 {orders.map((order, index) => (
//                     <motion.div 
//                         key={order.id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5, delay: index * 0.1 }}
//                         className={styles.orderCard}
//                         whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
//                     >
//                         <div className={styles.orderHeader}>
//                             <span className={styles.orderId}>Order #{order.id}</span>
//                             <span className={`${styles.orderStatus} ${
//                                 order.status === 'pending' ? styles.statusPending : 
//                                 order.status === 'delivered' ? styles.statusDelivered :
//                                 styles.statusOther
//                             }`}>
//                                 {order.status}
//                             </span>
//                         </div>

//                         <div className={styles.orderContent}>
//                             <div className={styles.orderDetails}>
//                                 <div className={styles.detailRow}>
//                                     <span className={styles.detailLabel}>Customer:</span>
//                                     <span className={styles.detailValue}>{order.user_name}</span>
//                                 </div>

//                                 <div className={styles.detailRow}>
//                                     <span className={styles.detailLabel}>Dish:</span>
//                                     <span className={styles.detailValue}>{order.dish}</span>
//                                 </div>

//                                 <div className={styles.detailRow}>
//                                     <span className={styles.detailLabel}>Quantity:</span>
//                                     <span className={styles.detailValue}>{order.quantity}</span>
//                                 </div>

//                                 <div className={styles.detailRow}>
//                                     <span className={styles.detailLabel}>Total Amount:</span>
//                                     <span className={styles.detailValue}>₹{order.total_amount}</span>
//                                 </div>

//                                 <div className={styles.detailRow}>
//                                     <span className={styles.detailLabel}>Ordered At:</span>
//                                     <span className={styles.detailValue}>{formatDate(order.ordered_at)}</span>
//                                 </div>

//                                 <div className={styles.detailRow}>
//                                     <span className={styles.detailLabel}>Delivery Address:</span>
//                                     <span className={styles.detailValue}>{order.delivery_address}</span>
//                                 </div>

//                                 <div className={styles.detailRow}>
//                                     <span className={styles.detailLabel}>Table Number:</span>
//                                     <span className={styles.detailValue}>{order.table_number}</span>
//                                 </div>

//                                 <div className={styles.detailRow}>
//                                     <span className={styles.detailLabel}>Payment:</span>
//                                     <span className={`${styles.paymentStatus} ${
//                                         order.payment_status ? styles.paymentPaid : styles.paymentUnpaid
//                                     }`}>
//                                         {order.payment_status ? 'Paid' : 'Unpaid'}
//                                     </span>
//                                 </div>
//                             </div>

//                             {order.image && (
//                                 <motion.div 
//                                     className={styles.imageContainer}
//                                     whileHover={{ scale: 1.05 }}
//                                 >
//                                     <img 
//                                         src={order.image} 
//                                         alt={`Order ${order.id}`} 
//                                         className={styles.orderImage}
//                                         loading="lazy"
//                                     />
//                                 </motion.div>
//                             )}
//                         </div>
//                     </motion.div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default OrderDetails;




import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './OrderDetails.module.css';
import { motion } from 'framer-motion';

function OrderDetails() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrdersData = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/orders/");
            setOrders(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setError("Failed to load orders. Please try again later.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrdersData();
    }, []);

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.pulseDot}></div>
                <p>Loading orders...</p>
            </div>
        );
    }

    if (error) {
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={styles.error}
            >
                {error}
                <button 
                    onClick={fetchOrdersData}
                    className={styles.retryButton}
                >
                    Retry
                </button>
            </motion.div>
        );
    }

    return (
        <div className={styles.container}>
            <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className={styles.header}
            >
                <h1>Order Details</h1>
                <p>View and manage all customer orders</p>
            </motion.div>

            <div className={styles.ordersGrid}>
                {orders.map((order, index) => (
                    <motion.div 
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className={styles.orderCard}
                        whileHover={{ 
                            y: -5,
                            boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
                        }}
                    >
                        <div className={styles.orderHeader}>
                            <span className={styles.orderId}>Order #{order.id}</span>
                            <span className={`${styles.orderStatus} ${
                                order.status === 'pending' ? styles.statusPending : 
                                order.status === 'delivered' ? styles.statusDelivered :
                                styles.statusOther
                            }`}>
                                {order.status}
                            </span>
                        </div>

                        <div className={styles.orderContent}>
                            <div className={styles.orderDetails}>
                                <div className={styles.detailRow}>
                                    <span className={styles.detailLabel}>Customer:</span>
                                    <span className={styles.detailValue}>{order.user_name}</span>
                                </div>

                                <div className={styles.detailRow}>
                                    <span className={styles.detailLabel}>Dish:</span>
                                    <span className={styles.detailValue}>{order.dish}</span>
                                </div>

                                <div className={styles.detailRow}>
                                    <span className={styles.detailLabel}>Quantity:</span>
                                    <span className={styles.detailValue}>{order.quantity}</span>
                                </div>

                                <div className={styles.detailRow}>
                                    <span className={styles.detailLabel}>Total Amount:</span>
                                    <span className={styles.detailValue}>₹{order.total_amount}</span>
                                </div>

                                <div className={styles.detailRow}>
                                    <span className={styles.detailLabel}>Ordered At:</span>
                                    <span className={styles.detailValue}>{formatDate(order.ordered_at)}</span>
                                </div>

                                <div className={styles.detailRow}>
                                    <span className={styles.detailLabel}>Delivery Address:</span>
                                    <span className={styles.detailValue}>{order.delivery_address}</span>
                                </div>

                                <div className={styles.detailRow}>
                                    <span className={styles.detailLabel}>Table Number:</span>
                                    <span className={styles.detailValue}>{order.table_number}</span>
                                </div>

                                <div className={styles.detailRow}>
                                    <span className={styles.detailLabel}>Payment:</span>
                                    <span className={`${styles.paymentStatus} ${
                                        order.payment_status ? styles.paymentPaid : styles.paymentUnpaid
                                    }`}>
                                        {order.payment_status ? 'Paid' : 'Unpaid'}
                                    </span>
                                </div>
                            </div>

                            {order.image && (
                                <motion.div 
                                    className={styles.imageContainer}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <img 
                                        src={order.image} 
                                        alt={`Order ${order.id}`} 
                                        className={styles.orderImage}
                                        loading="lazy"
                                    />
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default OrderDetails;