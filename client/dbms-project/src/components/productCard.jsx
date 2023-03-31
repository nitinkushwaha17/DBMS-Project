// /** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react';
// import { Box, Paper, Typography, Link } from '@mui/material';

// const classes = {
//     card: `
//         background-color: rgb(255, 255, 255);
//         color: rgb(33, 43, 54);
//         transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
//         background-image: none;
//         overflow: hidden;
//         position: relative;
//         box-shadow: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
//         border-radius: 16px;
//         z-index: 0;
//     `,
//     imgbox: `
//         padding: 8px;
//     `,
//     img: `
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//     `,
//     cardText: `
//         display: flex;
//         flex-direction: column;
//         padding: 24px;

//         > :not(style) + :not(style) {
//             margin: 20px 0px 0px;
//         }
//     `,
//     cardTextTitle: `
//         margin: 0px;
//         font-weight: 600;
//         line-height: 1.57143;
//         font-size: 0.875rem;
//         font-family: "Public Sans", sans-serif;
//         overflow: hidden;
//         text-overflow: ellipsis;
//         white-space: nowrap;
//         text-decoration: none;
//         color: inherit;
//     `,
//     priceBox: `
//         display: flex;
//         flex-direction: row;
//         align-items: center;
//         justify-content: space-between;
//     `,
//     colors: `
//         display: flex;
//         flex-direction: row;
//         align-items: center;
//         justify-content: flex-end;
//     `,
//     color: `
//         margin-left: -6px;
//         width: 16px;
//         height: 16px;
//         border-radius: 50%;
//         border: 2px solid rgb(255, 255, 255);
//         box-shadow: rgba(0, 0, 0, 0.24) -1px 1px 2px inset;
//         background-color: rgb(255, 192, 203);
//     `,
//     price: `
//         font-weight: 600;
//         line-height: 1.5;
//         font-size: 1rem;
//         font-family: "Public Sans", sans-serif;
//     `
// }

// export default function ProductCard(){
//     return(
//         <Paper css={css(classes.card)}>
//             <Box css={css(classes.imgbox)}>
//                 <img src="https://api-prod-minimal-v4.vercel.app/assets/images/products/product_6.jpg" css={css(classes.img)}></img>
//             </Box>
//             <Box css={css(classes.cardText)}>
//                 <Typography css={css(classes.cardTextTitle)}>
//                 <Link href="">
//                     Zoom Freak 2
//                 </Link>
//                 </Typography>
//                 <Box css={css(classes.priceBox)}>
//                     <Box component="span" css={css(classes.colors)}>
//                         <Box css={css(classes.color)}></Box>
//                         <Box css={css(classes.color)}></Box>
//                         <Box css={css(classes.color)}></Box>
//                     </Box>
//                     <Typography css={css(classes.price)}>$78.22</Typography>
//                 </Box>
//             </Box>
//         </Paper>
//     )
// }

import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
// import { fCurrency } from '../../../utils/formatNumber';
// components
// import Label from '../../../components/label';
import ColorPreview from './colorPreview';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
//   borderRadius: '10px',
});

// ----------------------------------------------------------------------


export default function ShopProductCard({ product }) {
  const { name, cover, price, colors, status, priceSale } = product;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {/* {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )} */}
        <StyledProductImg alt={name} src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={colors} />
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {priceSale && priceSale}
            </Typography>
            &nbsp;
            {price}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}