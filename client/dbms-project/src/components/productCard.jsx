import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ColorPreview from './colorPreview';

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const colors = ['#00AB55', '#000000', '#FFFFFF'];

export default function ShopProductCard({ product }) {
  const { name, mrp, price, img } = product;
  console.log(product)

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <StyledProductImg alt={name} src={img} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link component={RouterLink} to="/prod" color="inherit" underline="hover">
          <Typography variant="subtitle2" fontWeight={700} textTransform="capitalize" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={colors} />
          <Typography variant="subtitle1" textAlign="right">
            Rs {price}
            <br />
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              Rs {mrp && mrp}
            </Typography>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}