import Header from "../components/Home/Header";
import styles from "./History.module.css";

function History() {
  // Sample order history data
  const orders = [
    {
      id: "#ORD-78654",
      date: "15 May 2023, 12:30 PM",
      status: "Delivered",
      items: [
        {
          name: "Paneer Butter Masala",
          price: 250,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1633945274309-2c16c9682a8c?w=500&auto=format&fit=crop&q=60"
        },
        {
          name: "Garlic Naan",
          price: 50,
          quantity: 2,
          image: "https://images.unsplash.com/photo-1630918236417-1e8d1a9a6a2f?w=500&auto=format&fit=crop&q=60"
        }
      ],
      subtotal: 350,
      delivery: 50,
      discount: 0,
      total: 400
    },
    {
      id: "#ORD-78653",
      date: "10 May 2023, 7:15 PM",
      status: "Cancelled",
      items: [
        {
          name: "Chicken Biryani",
          price: 350,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1633945274309-2c16c9682a8c?w=500&auto=format&fit=crop&q=60"
        },
        {
          name: "Raita",
          price: 40,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60"
        }
      ],
      subtotal: 390,
      delivery: 50,
      discount: 0,
      total: 440
    },
    {
      id: "#ORD-78650",
      date: "5 May 2023, 1:45 PM",
      status: "Delivered",
      items: [
        {
          name: "Margherita Pizza",
          price: 300,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=500&auto=format&fit=crop&q=60"
        },
        {
          name: "Garlic Bread",
          price: 120,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1608190003443-86ab6a1e0675?w=500&auto=format&fit=crop&q=60"
        },
        {
          name: "Cold Coffee",
          price: 90,
          quantity: 2,
          image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=60"
        }
      ],
      subtotal: 600,
      delivery: 0,
      discount: 50,
      total: 550
    }
  ];

  return (
    <>
      <Header />
      <div className={styles.historyContainer}>
        <h1 className={styles.historyTitle}>Order History</h1>
        
        {orders.length > 0 ? (
          <div className={styles.orderList}>
            {orders.map((order, index) => (
              <div key={index} className={styles.orderCard} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={styles.orderHeader}>
                  <div>
                    <span className={styles.orderId}>{order.id}</span>
                    <span className={styles.orderDate}> • {order.date}</span>
                  </div>
                  <span className={`${styles.orderStatus} ${
                    order.status === 'Delivered' ? styles.statusDelivered :
                    order.status === 'Cancelled' ? styles.statusCancelled :
                    styles.statusProcessing
                  }`}>
                    {order.status}
                  </span>
                </div>
                
                <div className={styles.orderDetails}>
                  <div className={styles.orderItems}>
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className={styles.orderItem}>
                        <div className={styles.itemImage}>
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className={styles.itemInfo}>
                          <div className={styles.itemName}>{item.name}</div>
                          <div className={styles.itemPrice}>
                            ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className={styles.orderSummary}>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>Subtotal</span>
                      <span className={styles.summaryValue}>₹{order.subtotal}</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>Delivery Fee</span>
                      <span className={styles.summaryValue}>
                        {order.delivery === 0 ? 'FREE' : `₹${order.delivery}`}
                      </span>
                    </div>
                    {order.discount > 0 && (
                      <div className={styles.summaryRow}>
                        <span className={styles.summaryLabel}>Discount</span>
                        <span className={styles.summaryValue} style={{ color: '#e63946' }}>
                          -₹{order.discount}
                        </span>
                      </div>
                    )}
                    <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                      <span className={styles.summaryLabel}>Total</span>
                      <span className={styles.summaryValue}>₹{order.total}</span>
                    </div>
                  </div>
                </div>
                
                <button className={styles.reorderBtn}>Reorder</button>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyHistory}>
            <img src="https://cdn-icons-png.flaticon.com/512/4555/4555971.png" alt="No orders" />
            <h3>No Order History Yet</h3>
            <p>You haven't placed any orders with us yet. Explore our menu and place your first order!</p>
            <button className={styles.exploreBtn}>Explore Menu</button>
          </div>
        )}
      </div>
    </>
  );
}

export default History;