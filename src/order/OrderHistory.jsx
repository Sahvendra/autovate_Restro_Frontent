import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  MdTimer, 
  MdCheckCircle, 
  MdOutlineDeliveryDining, 
  MdHistory,
  MdEdit,
  MdClose,
  MdSave
} from "react-icons/md";
import styles from "./OrderHistory.module.css";
import axios from "axios";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState("");
  const navigate = useNavigate();

  const statusOptions = [
    "pending",
    "confirmed",
    "preparing",
    "on the way",
    "delivered",
    "cancelled"
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/orders/");
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleEditClick = (order) => {
    setEditingOrderId(order.id);
    setStatusUpdate(order.status);
  };

  const handleCancelEdit = () => {
    setEditingOrderId(null);
    setStatusUpdate("");
  };

  const handleStatusUpdate = async (orderId) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/orders/${orderId}/`, {
        status: statusUpdate
      });
      
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: statusUpdate } : order
      ));
      
      setEditingOrderId(null);
    } catch (err) {
      console.error("Error updating order status:", err);
      setError("Failed to update order status.");
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <MdHistory className={styles.pendingIcon} />;
      case 'confirmed':
        return <MdTimer className={styles.confirmedIcon} />;
      case 'preparing':
        return <MdTimer className={styles.preparingIcon} />;
      case 'on the way':
        return <MdOutlineDeliveryDining className={styles.deliveringIcon} />;
      case 'delivered':
        return <MdCheckCircle className={styles.deliveredIcon} />;
      case 'cancelled':
        return <MdClose className={styles.cancelledIcon} />;
      default:
        return <MdHistory className={styles.defaultIcon} />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return "Pending confirmation";
      case 'confirmed':
        return "Order confirmed";
      case 'preparing':
        return "Preparing your order";
      case 'on the way':
        return "On the way to you";
      case 'delivered':
        return "Delivered successfully";
      case 'cancelled':
        return "Order cancelled";
      default:
        return "Order placed";
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>No Orders Yet</h2>
        <p>You haven't placed any orders yet.</p>
        <button onClick={() => navigate("/")}>Browse Menu</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Order History</h1>
      <p className={styles.subtitle}>View and manage your orders</p>
      
      <div className={styles.ordersList}>
        {orders.map(order => (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <span className={styles.orderId}>Order #{order.id}</span>
              <span className={styles.orderDate}>{formatDate(order.ordered_at)}</span>
            </div>
            
            <div className={styles.orderContent}>
              <div className={styles.orderImage}>
                <img src={order.image} alt="Order item" onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150?text=No+Image";
                }} />
              </div>
              
              <div className={styles.orderDetails}>
                <h3>Table #{order.table_number}</h3>
                <p className={styles.orderMeta}>
                  {order.delivery_address || "Dine-in"}
                </p>
                <p className={styles.orderPrice}>₹{order.total_amount}</p>
                <p className={styles.paymentStatus}>
                  Payment: {order.payment_status ? "Completed" : "Pending"}
                </p>
              </div>
              
              <div className={styles.orderStatus}>
                {editingOrderId === order.id ? (
                  <div className={styles.statusEdit}>
                    <select
                      value={statusUpdate}
                      onChange={(e) => setStatusUpdate(e.target.value)}
                      className={styles.statusSelect}
                    >
                      {statusOptions.map(option => (
                        <option key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </option>
                      ))}
                    </select>
                    <div className={styles.editActions}>
                      <button 
                        onClick={() => handleStatusUpdate(order.id)}
                        className={styles.saveButton}
                      >
                        <MdSave /> Save
                      </button>
                      <button 
                        onClick={handleCancelEdit}
                        className={styles.cancelButton}
                      >
                        <MdClose /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {getStatusIcon(order.status)}
                    <span className={`${styles.statusText} ${styles[order.status.replace(' ', '')]}`}>
                      {getStatusText(order.status)}
                    </span>
                    <button 
                      onClick={() => handleEditClick(order)}
                      className={styles.editButton}
                    >
                      <MdEdit /> Update Status
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;