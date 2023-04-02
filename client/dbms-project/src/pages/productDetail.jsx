/** @jsxImportSource @emotion/react */
import { Typography, Grid, Box, Rating, Stack, Divider, RadioGroup, FormControlLabel, Radio, Select, MenuItem, IconButton, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';

const classes = {
    img: `
        width: 100%;
        border-radius: 20px

    `,
    details: `
        > :not(style) + :not(style){
            margin-top: 16px;
        }
        @media (min-width: 900px){
            padding: 40px 40px 0px 16px;
        }
    `,
    iconBox: `
        font-size: medium;
        width: 20px;
        height: 20px;
        display: flex;
        border-radius: 50%;
        position: relative;
        align-items: center;
        justify-content: center;
        background-color: currentcolor;
    `,
    icon: `
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: rgb(255, 72, 66);
        transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        position: absolute;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        >svg{
            width: 12px;
            height: 12px;
        }
    `,
    checkedIcon: `
        transform: scale(1.4);
        box-shadow: #0005 4px 4px 8px 0px;

    `,
    countBox: `
        width: 100px;
        text-align: right;
    `,
    count: `
        display: flex;
        flex-direction: row;
        flex-shrink: 0;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 4px;
        padding: 4px 6px;
        // width: 96px;
        border-radius: 8px;
        border: 1px solid rgba(145, 158, 171, 0.32);
    `,
    btn: `
        width: 100%;
        border-radius: 10px;
        height: 48px;
        text-transform: none;
    `
}

const Icon = (
    <Box css={css(classes.iconBox)}>
    <span css={css(classes.icon)} />
    </Box>
)

const CheckedIcon = (
    <Box css={css(classes.iconBox)}>
    <span css={css(classes.icon, classes.checkedIcon)}>
        <CheckIcon />
    </span>
    </Box>
)

const options = ['Option 1', 'Option 2'];

export default function ProductDetail(){
    const [color, setColor] = useState("red");
    const [size, setSize] = useState(5);
    const [product, setProduct] = useState();
    let { id } = useParams();
    // const [inputValue, setInputValue] = React.useState('');

    const handleChange = (event)=>{
        setColor(event.target.value);
    }

    useEffect(()=>{
        axios.get(`/products/${id}`)
        .then((response)=>setProduct(response.data))
        .catch((error)=>console.error(error))
    }, []);

    const formik = useFormik({
        initialValues: {
          product_id: id,
          quantity: 1
        },
        onSubmit: (values) => {
          console.log(values);
          axios.post('/cart', values)
          .then((response)=>{
              console.log(response);
          }).catch((err) => {
              console.log(err);
          })
        },
    });

    if(!product) return <p>Loading...</p>;

    return(
        <>
            <Typography variant='h4' m={3} css={css(classes.heading)}>Product Details</Typography>
            <Grid container css={css(classes.grid)} spacing={2}>
                <Grid item xs={12} md={6} lg={7}>
                    <img css={css(classes.img)} src={product.img} />
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                    <Box css={css(classes.details)}>
                        <Typography variant="h5" fontWeight={700} textTransform="capitalize">
                        {product.name}
                        </Typography>
                        <Stack direction="row" alignItems="center">
                            <Rating name="read-only" value={5} readOnly />
                            <Typography variant="body2" ml={1}>
                            (10k reviews)
                            </Typography>
                        </Stack>
                        <Typography variant="h4">
                        Rs {product.price}
                        </Typography>
                        <Divider />
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="h6">Color</Typography>
                            <Stack direction="row">
                                <Radio onChange={handleChange} checked={color==="red"} icon={Icon} checkedIcon={CheckedIcon} value="red"/>
                                <Radio onChange={handleChange} checked={color==="blue"} icon={Icon} checkedIcon={CheckedIcon} value="blue" />
                            </Stack>
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="h6">Size</Typography>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={size}
                                size="small"
                                onChange={(e)=>{setSize(e.target.value)}}
                                sx={{width: 100}}
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                            </Select>
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="h6">Quantity</Typography>
                            <Box css={css(classes.countBox)}>
                                <Box css={css(classes.count)}>
                                    <IconButton size="small" onClick={()=>{formik.setValues({...formik.values, quantity: formik.values.quantity-1})}}>
                                        <RemoveIcon />
                                    </IconButton>
                                    {formik.values.quantity}
                                    <IconButton size="small" onClick={()=>{formik.setValues({...formik.values, quantity: formik.values.quantity+1})}}>
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Stack>
                        <Divider />
                        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
                            <Button size="large" variant="contained" css={css(classes.btn)} sx={{backgroundColor: 'rgb(255, 171, 0)'}} onClick={formik.handleSubmit}>Add To Cart</Button>
                            <Button size="large" variant="contained" css={css(classes.btn)} sx={{backgroundColor: 'rgb(0, 171, 85)'}}>Buy Now</Button>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}