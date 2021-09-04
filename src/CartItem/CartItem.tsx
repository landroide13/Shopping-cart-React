import Button from '@material-ui/core/Button';
import { CartItemType } from '../App';
import { Wrapper } from './CartItem.style';


type  Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  remove: (id: number) => void;
}


const CartItem: React.FC<Props> = ({ item, addToCart, remove }) => (
  
  <Wrapper>

    <div className="">
      <h3>{item.title}</h3>
      <div className="info">
        <p>Price: ${item.price}</p>
        <p>Total: ${ (item.ammount * item.price).toFixed(2) }</p>
      </div>
      <div className="buttons">
        <Button size='small' disableElevation variant='contained' onClick={() => remove(item.id)}> - </Button>
        <p>{item.ammount}</p>
        <Button size='small' disableElevation variant='contained' onClick={() => addToCart(item)}> + </Button>
      </div>
    </div>
    <img src={item.image} alt={ item.title } />
  </Wrapper> 
 
)



export default CartItem;











