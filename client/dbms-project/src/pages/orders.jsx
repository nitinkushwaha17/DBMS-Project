// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Grid, Card, CardContent, Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Container, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
    `,
    cardTitle: `
        margin: 0px;
        font-weight: 700;
        line-height: 1.55556;
        font-size: 1.0625rem;
        font-family: "Public Sans", sans-serif;
    `,
    thead: `
        .MuiTableCell-root{
            line-height: 1.5rem;
            font-size: 0.875rem;
            font-family: "Public Sans", sans-serif;
            font-weight: 600;
            display: table-cell;
            vertical-align: inherit;
            text-align: left;
            padding: 16px;
            border-bottom: none;
            color: rgb(99, 115, 129);
            background-color: rgb(244, 246, 248);
        }
    `,
    cell: `
        line-height: 1.57143;
        font-size: 0.875rem;
        font-family: "Public Sans", sans-serif;
        font-weight: 400;
        vertical-align: inherit;
        text-align: left;
        padding: 16px;
        color: rgb(33, 43, 54);
        border-bottom: none;
        
    `,
    cell1: `
        display: flex;
        align-items: center;
    `,
    imgBox: `
        line-height: 1;
        display: block;
        overflow: hidden;
        position: relative;
        width: 64px;
        height: 64px;
        border-radius: 12px;
        margin-right: 16px;
    `,
    img: `
        width: 64px;
        height: 64px;
        object-fit: cover;
    `,
    prodName: `
        margin: 0px;
        font-weight: 600;
        line-height: 1.57143;
        font-size: 0.875rem;
        font-family: "Public Sans", sans-serif;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 240px;
        text-transform: capitalize;
    `,
}

export default function orders(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        axios.get('/order')
        .then((response)=>{
            setProducts(response.data);
        })
        .catch((error)=>{console.log(error)})
        .finally(()=>{setLoading(false)});
    }, []);
    
    return(
        <>
        {/* <Container> */}
            <Typography variant='h4' m={3} css={css(classes.heading)}>My Orders</Typography>
            <Grid css={css(classes.grid)}>
                <Grid item xs={12} md={8}>
                    <Card elevation={12}>
                        <CardContent>
                            <Typography variant='h6' css={css(classes.cardTitle)}>
                                All Orders&nbsp;
                                <Typography variant='span'>
                                    ({products.length} items)
                                </Typography>
                            </Typography>
                        </CardContent>
                        <TableContainer>
                            <Table>
                                <TableHead css={css(classes.thead)}>
                                    <TableRow>
                                        <TableCell>Product</TableCell> 
                                        <TableCell>Price</TableCell> 
                                        <TableCell>Quantity</TableCell> 
                                        <TableCell>Total price</TableCell> 
                                        <TableCell>Date</TableCell> 
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {loading?<>Loading...</>:
                                    products.map(product => (
                                    <TableRow key={product.id}>
                                        <TableCell css={css(classes.cell, classes.cell1)}>
                                            <Box css={css(classes.imgBox)}>
                                                <img src={product.img} css={css(classes.img)} />
                                            </Box>
                                            <Typography variant='subtitle2' css={css(classes.prodName)}>{product.name}</Typography>
                                        </TableCell>
                                        <TableCell css={css(classes.cell)}>
                                            Rs{product.price}
                                        </TableCell>
                                        <TableCell css={css(classes.cell)}>
                                            {product.quantity}
                                        </TableCell>
                                        <TableCell css={css(classes.cell)}>
                                            Rs{product.price*product.quantity}
                                        </TableCell>
                                        <TableCell css={css(classes.cell)} sx={{whiteSpace:"nowrap"}}>
                                            {new Date(product.date).toDateString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Grid>
            </Grid>
        {/* </Container> */}
        </>
    )
}