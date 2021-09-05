import CartItem from "../CartItem/CartItem";
import { Wrapper } from "./Cart.style";
import { CartItemType } from "../App";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  remove: (id: number) => void;
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, remove }) => {

  const getTotal = (items: CartItemType[]) => 
    items.reduce((ack: number, item) => ack + item.ammount * item.price, 0)
  


  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No Items in Your Cart</p> : null}

      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          remove={remove}
        />
      ))}
      <h2>Total: ${ getTotal(cartItems).toFixed(2) }</h2>
    </Wrapper>
  );

  
}




export default Cart;








