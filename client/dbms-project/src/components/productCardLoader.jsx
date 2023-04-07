import { Box, Card, Link, Typography, Stack, Skeleton, CardMedia, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ColorPreview from './colorPreview';

export default function ShopProductCardLoader() {

  return (
    <Card>
      <Box sx={{ pt:'100%', position: 'relative' }}>
        <Skeleton variant='rectangular' sx={{position: 'absolute', top: 0, width: '100%', height: '100%'}}/>
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
          <Typography variant="subtitle2" fontWeight={700} textTransform="capitalize" noWrap>
            <Skeleton width='60%'/>
          </Typography>

        <Stack direction='row' alignItems="center" justifyContent="space-between">
          <Skeleton width='40%'/>
          <Skeleton width='40%'/>
        </Stack>
      </Stack>
    </Card>
  );
}