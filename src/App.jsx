import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Admin from "./pages/Admin-Dashboard.jsx";
import Menu from "./pages/Menu.jsx";
import History from "./pages/OrderHistory.jsx";
import Order from "./pages/Oreder.jsx";

import SignUp from "./components/Auth/SignUp.jsx";
import Login from "./components/Auth/Login.jsx";
import FoodDetail from "./components/Home/FoodDetails.jsx";
import StoreContext from "./store/StoreContext.jsx";
import { useState } from "react";
import "./App.css";
import OrderConfirmation from "./order/OrderConfirmation.jsx";
import OrderHistory from "./order/OrderHistory.jsx";
import OrderDetails from "./order/OrderDetails.jsx";

function App() {
  const [cart, setCart] = useState([]);
  const [Proceed, setProceed] = useState([]);
  const [homeCategory, setCategory] = useState('All');

  const handleOnClickCategory = (category) => {
    setCategory(category);
  }

  const handleOnProcessed = (items) => {
    setProceed(items);
    console.log(items)
  }

  const setCartItems = (newItem, count, Id) => {
    setCart([...cart, newItem]);
    setCart((prev) =>
      prev.map((item) =>
        item.id === Id ? { ...item, quantity: item.quantity + count } : item
      )
    );
  };

  const handleCartQuantity = (behaviour, Id) => {
    if (behaviour === "add") {
      setCart((prev) =>
        prev.map((item) =>
          item.id === Id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else if (behaviour === "dec") {
      setCart((prev) =>
        prev.map((item) =>
          (item.id === Id && item.quantity != 0) ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  const removeItem = (foodItem) => {
    const newItems = cart.filter((item) => {
      if (!(item.id === foodItem.id)) {
        return foodItem;
      }
    });
    setCart(newItems);
    console.log(newItems);
  };

  const [history, setHistory] = useState([]);

  return (
    <StoreContext.Provider value={cart}>
      <Routes>
        <Route path="/" element={<Home handleOnClick={handleOnClickCategory} />} />
        <Route path="/admin-dashboard" element={<Admin />} />
        <Route
          path="/cart"
          element={
            <Cart
              removeItem={removeItem}
              handleOnProcessed={handleOnProcessed}
              handleCartQuantity={handleCartQuantity}
              cart={cart}
            />
          }
        />
        <Route path="/menu" element={<Menu homeCategory={homeCategory} />} />
        <Route path="/history" element={<History history={history} />} />
        <Route path="/order" element={<Order setHistory={setHistory} orderItems={Proceed} />} />
        {/* <Route path="/signup" element={<SignUp />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route
          path="/menu/:id"
          element={<FoodDetail setCartItems={setCartItems} />}
        />


        <Route
          path="order-confirmation"
          element={<OrderConfirmation />}
        />


<Route path="/order-history" element={<OrderHistory />} />


<Route path="/order-detail" element={<OrderDetails />} />
      </Routes>
    </StoreContext.Provider>
  );
}

export default App;
