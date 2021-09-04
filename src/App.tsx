
// Components
import { useState } from 'react';
import { useQuery } from 'react-query';
import Drawer from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons';
import Badge from '@material-ui/core/Badge';
import Item from './Item/Item';

// Styles
import { Wrapper } from './App.styles';
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

  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts);

  console.log(data);

  const getTotalItems = () => {

  }
  
  const handleAddToCart = (clickedItem: CartItemType) => {
    
  }

  const handleRemoveFromCart = () => {
    
  }

  if (isLoading) return <LinearProgress />
  if(error) return <div>Something Went Wrong..</div>

  return (
    <Wrapper>
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
