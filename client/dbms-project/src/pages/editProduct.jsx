// /** @jsxImportSource @emotion/react */
import { Button, Paper, Typography, Grid, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment } from "@mui/material";
import { css } from '@emotion/react';
import { useFormik } from 'formik';
import ProductForm from "../components/productForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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

export default function EditProduct(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        axios.get(`/products/${id}`, {headers:{'Authorization': `bearer ${localStorage.getItem('token')}`}})
        .then(response => {
            console.log(response);
            setProduct(response.data);
        })
        .catch(err => console.error(err))
        .finally(()=>{setLoading(false)});
    }, []);

    const formik = useFormik({
        initialValues: {
          name: product.name,
          desc: product.desc,
          mrp: product.mrp,
          price: product.price,
          stock: product.stock,
          image: product.img
        },
        onSubmit: (values) => {
          console.log(values);
          axios.put(`/products/${product.id}`, values, {headers:{'Authorization': `bearer ${localStorage.getItem('token')}`}})
          .then((response)=>{
              console.log(response);
              dispatch(show("Product updated"));
              navigate(`/prod/${product.id}`);
          }).catch((err) => {
              console.log(err);
              if(err.response.status === 401){
                navigate('/login');
              }
          })
        },
        enableReinitialize: true
    });

    return(
        <>
        <Typography variant='h4' css={css(classes.heading)}>Edit product</Typography>
        {loading?<p>Loading...</p>:
        <ProductForm formik={formik} btnText="Update Product"/>}
        </>
    )
}