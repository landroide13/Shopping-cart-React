import Button from "@material-ui/core/Button";
import { CartItemType } from "../App";
import { Wrapper }  from "./Item.style";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
}


const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <Wrapper>
    <img src={item.image} />

    <div className="">
      <h3>{item.title}</h3>
      <p> {item.description}</p>
      <h3>USD { item.price }</h3>
    </div>
    <button onClick={ () => handleAddToCart(item)} >Add To Cart</button>
  </Wrapper>
)


export default Item;




