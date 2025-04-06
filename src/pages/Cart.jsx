import CartContent from "../components/Cart/CartContent";
import Header from "../components/Home/Header";

function Cart({cart, removeItem, handleCartQuantity, handleOnProcessed}) {
  return (
    <>
      <Header></Header>
      <CartContent removeCartItem={removeItem} handleCartQuantity={handleCartQuantity} cartItems={cart} handleOnProcessed={handleOnProcessed}></CartContent>
    </>
  );
}
export default Cart;
