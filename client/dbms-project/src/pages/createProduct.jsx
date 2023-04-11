// /** @jsxImportSource @emotion/react */
import { Button, Paper, Typography, Grid, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment } from "@mui/material";
import { css } from '@emotion/react';
import { useFormik } from 'formik';
import ProductForm from "../components/productForm";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { show } from '../features/snackbarSlice';

const classes = {
    heading: `
        margin: 16px 0px 16px;
        font-weight: 800;
        line-height: 1.5;
        font-size: 1.25rem;
        font-family: "Public Sans", sans-serif;
        @media (min-width: 600px){
            font-size: 1.25rem;
        }
        @media (min-width: 900px){
            font-size: 1.5rem;
        }
    `
}

export default function CreateProduct(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
          name: '',
          desc: '',
          mrp: '',
          price: '',
          stock: '',
          image: ''
        },
        onSubmit: (values) => {
          console.log(values);
          axios.post('/products', values, {headers:{'Authorization': `bearer ${localStorage.getItem('token')}`}})
          .then((response)=>{
              console.log(response);
              dispatch(show("Product created"));
          }).catch((err) => {
              console.log(err);
              if(err.response.status === 401){
                navigate('/login');
              }
          })
        },
    });

    return(
        <>
        <Typography variant='h4' css={css(classes.heading)}>Create new product</Typography>
        <ProductForm formik={formik} btnText="Create Product"/>
        </>
    )
}