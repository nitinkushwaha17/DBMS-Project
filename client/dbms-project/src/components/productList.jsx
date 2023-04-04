// /** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react';
// import { Box, Paper, Typography, Link } from '@mui/material';
// import ProductCard from './productCard';
// // import { Link } from 'react-router-dom';

// const classes = {
//     box: `
//         gap: 24px;
//         display: grid;
//         @media (min-width: 0px){
//             grid-template-columns: repeat(1, 1fr);
//         }
//         @media (min-width: 600px){
//             grid-template-columns: repeat(2, 1fr);
//         }
//         @media (min-width: 900px){
//             grid-template-columns: repeat(3, 1fr);
//         }
//         @media (min-width: 1200px){
//             grid-template-columns: repeat(4, 1fr);
//         }
//     `, 
// }

// export default function ProductList(){
//     return (
//         <Box css={css(classes.box)}>
//             <ProductCard />
//             <ProductCard />
//             <ProductCard />
//             <ProductCard />
//             <ProductCard />
//             <ProductCard />
//             <ProductCard />
//         </Box>
//     )
// }

import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './productCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------

// ProductList.propTypes = {
//   products: PropTypes.array.isRequired,
// };

// const product = {
//     id: `${Math.random()}`,
//     name: "nike air jordan",
//     cover: "https://api-prod-minimal-v4.vercel.app/assets/images/products/product_6.jpg",
//     price: 34.32,
//     priceSale: 33.02,
//     colors: ['#00AB55', '#000000', '#FFFFFF'],
//     status: 'new'
// };

export default function ProductList(props) {
  const {products} = props; 

  // useEffect(()=>{
  //   axios.get('/products')
  //   .then(response=>setProducts(response.data))
  //   .catch(err => console.error(err));
  // }, []);

  if(!products.length) return <p>Loading...</p>;

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}