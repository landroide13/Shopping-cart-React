
// Components
import { useState } from 'react';
import { useQuery } from 'react-query';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import Item from './Item/Item';
import Cart from './Cart/Cart';

// Styles
import { Wrapper, StyledButton } from './App.styles';
import { async } from 'q';

// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string; 
  image: string;
  price: number;
  title: string;
  ammount: number
}


const getProducts = async (): Promise<CartItemType[]> => 
  await (await fetch('https://fakestoreapi.com/products')).json()


const App = () => {

  const [ cartOpen, setCartOpen ] = useState(false);
  const [ cartItems, setCartItems ] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts);

  console.log(data);

  const getTotalItems = (items: CartItemType[]) => 
    items.reduce((ack: number, item) => ack + item.ammount, 0)
  
  
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      const isIn = prev.find(item => item.id === clickedItem.id)
      
      if (isIn) {
        return prev.map(item => (
          item.id === clickedItem.id ? {...item, ammount: item.ammount + 1} : item
        ))
      }
      return [...prev, {...clickedItem, ammount: 1}]
    })
  }

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.ammount === 1) return ack;
          return [...ack, { ...item, ammount: item.ammount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  }

  if (isLoading) return <LinearProgress />
  if(error) return <div>Something Went Wrong..</div>

  return (
    <Wrapper>

      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)} >
        <Cart cartItems={cartItems} addToCart={handleAddToCart} remove={handleRemoveFromCart} />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>

        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
          )
        )}

      </Grid>
    </Wrapper>
  );
}

export default App;
