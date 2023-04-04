import { useState, useEffect } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import ProductList from '../components/productList'
import ProductSort from '../components/ProductSort'
import ProductFilterSidebar from '../components/productFilterSidebar';
import axios from 'axios';
// mock
// import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    axios.get('/products')
    .then(response=>setProducts(response.data))
    .catch(err => console.error(err));
  }, []);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort setProducts={setProducts}/>
          </Stack>
        </Stack>

        <ProductList products={products}/>
        {/* <ProductCartWidget /> */}
    </>
  );
}