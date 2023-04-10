import { useState } from 'react';
// @mui
import { Menu, Button, MenuItem, Typography } from '@mui/material';
// component
import Iconify from './iconify';
import axios from 'axios';

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];

export default function ProductSort(props) {
  const {setProducts} = props;
  const [open, setOpen] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    handleClose();

    axios.get(`/products?sortby=${SORT_BY_OPTIONS[index].value}`, {headers:{'Authorization': `bearer ${localStorage.getItem('token')}`}})
    .then(response=>setProducts(response.data))
    .catch(err => console.error(err));
  };

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
      >
        Sort By:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {SORT_BY_OPTIONS[selectedIndex].label}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {SORT_BY_OPTIONS.map((option, index) => (
          <MenuItem
            key={index}
            selected={index===selectedIndex}
            onClick={(event)=>{handleMenuItemClick(event, index)}}
            sx={{ typography: 'body2' }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}