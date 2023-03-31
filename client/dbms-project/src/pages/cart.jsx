// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Grid, Paper, Card, CardHeader, CardContent, Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, IconButton, Stack, Divider, Button } from '@mui/material';
import { Box } from '@mui/system';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

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
    grid:`
        // > .MuiGrid-item{
        //     padding-top: 24px;
        //     padding-left: 24px;
        // }
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
    `,
    countBox: `
        width: 96px;
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
        width: 96px;
        border-radius: 8px;
        border: 1px solid rgba(145, 158, 171, 0.32);
    `,
    checkoutbtn: `
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
        outline: 0px;
        border: 0px;
        margin: 0px;
        cursor: pointer;
        user-select: none;
        vertical-align: middle;
        appearance: none;
        text-decoration: none;
        font-weight: 700;
        line-height: 1.71429;
        text-transform: capitalize;
        font-family: "Public Sans", sans-serif;
        min-width: 64px;
        padding: 8px 22px;
        border-radius: 8px;
        transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        color: rgb(255, 255, 255);
        background-color: rgb(0, 171, 85);
        width: 100%;
        box-shadow: none;
        height: 48px;
        font-size: 15px;
    `
}

export default function cart(){
    return(
        <>
        <Typography variant='h4' m={3} css={css(classes.heading)}>Checkout</Typography>
        <Grid container css={css(classes.grid)} spacing={2}>
            <Grid item xs={12} md={8}>
                <Card elevation={12}>
                    <CardContent>
                        <Typography variant='h6' css={css(classes.cardTitle)}>
                            Cart&nbsp;
                            <Typography variant='span'>
                                (0 items)
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
                                    <TableCell></TableCell> 
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell css={css(classes.cell, classes.cell1)}>
                                        <Box css={css(classes.imgBox)}>
                                            <img src="https://api-prod-minimal-v4.vercel.app/assets/images/products/product_6.jpg" css={css(classes.img)}></img>
                                        </Box>
                                        <Typography variant='subtitle2' css={css(classes.prodName)}>Nike air jordan</Typography>
                                    </TableCell>
                                    <TableCell css={css(classes.cell)}>
                                        $49.90
                                    </TableCell>
                                    <TableCell css={css(classes.cell)}>
                                        <Box css={css(classes.countBox)}>
                                            <Box css={css(classes.count)}>
                                                <IconButton size="small">
                                                    <RemoveIcon />
                                                </IconButton>
                                                1
                                                <IconButton size="small">
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell css={css(classes.cell)}>
                                        $49.90
                                    </TableCell>
                                    <TableCell css={css(classes.cell)}>
                                        <IconButton size="small">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card sx={{marginBottom: 4}} elevation={12}>
                    <CardContent>
                        <Typography css={css(classes.cardTitle)}>Order Summary</Typography>
                    </CardContent>
                    <CardContent>
                        <Stack direction="column" gap={3}>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2">Sub Total</Typography>
                                <Typography variant="subtitle2">$270.54</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2">Discount</Typography>
                                <Typography variant="subtitle2">-</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2">Shipping</Typography>
                                <Typography variant="subtitle2">Free</Typography>
                            </Stack>
                            <Divider />
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="subtitle1">Total</Typography>
                                <Typography variant="subtitle1" sx={{color: "rgb(255, 86, 48)"}}>$270.54</Typography>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
                <Button css={css(classes.checkoutbtn)}>Check Out</Button>
            </Grid>
        </Grid>
        </>
    )
}