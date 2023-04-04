// /** @jsxImportSource @emotion/react */
import { Button, Paper, Grid, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment } from "@mui/material";
import { css } from '@emotion/react';

const classes = {
    btn: `
        background-color: rgb(0, 171, 85);
        width: 100%;
        border-radius: 10px;
        height: 48px;
        text-transform: none;
        margin-top: 24px;
        box-shadow: rgba(0, 171, 85, 0.24) 0px 8px 16px 0px;
    `
}

export default function ProductForm(props){
    const {formik} = props;

    return(
        <Grid container css={css(classes.grid)} spacing={2}>
            <Grid item xs={12} md={8}>
                <Paper sx={{padding:4}}>
                    <TextField
                        sx={{width:"100%"}}
                        name="name"
                        label="Product Name" 
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        multiline
                        name="desc"
                        label="Description"
                        value={formik.values.desc}
                        onChange={formik.handleChange}
                        sx={{width:"100%", mt:3}}
                        inputProps={{sx:{minHeight: "200px", maxHeight: "200px", overflow:"scroll !important"}}}
                        />
                    <TextField
                        name="image"
                        label="Image url"
                        value={formik.values.image}
                        onChange={formik.handleChange}
                        sx={{width:"100%", mt:3}}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper sx={{padding:4}}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="stock">Stock</InputLabel>
                        <OutlinedInput
                            id="stock"
                            name="stock"
                            label="Stock"
                            placeholder="0"
                            type="number"
                            value={formik.values.stock}
                            onChange={formik.handleChange}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{mt:3}}>
                        <InputLabel htmlFor="regular-price">Regular Price</InputLabel>
                        <OutlinedInput
                            id="regular-price"
                            startAdornment={<InputAdornment position="start">Rs</InputAdornment>}
                            name="mrp"
                            label="Regular Price"
                            placeholder="00"
                            type="number"
                            value={formik.values.mrp}
                            onChange={formik.handleChange}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ mt: 3 }}>
                        <InputLabel htmlFor="sale-price">Sale Price</InputLabel>
                        <OutlinedInput
                            id="sale-price"
                            startAdornment={<InputAdornment position="start">Rs</InputAdornment>}
                            name="price"
                            label="Sale Price"
                            placeholder="00"
                            type="number"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                        />
                    </FormControl>
                </Paper>
                <Button
                    size="large"
                    variant="contained"
                    onClick={formik.handleSubmit}
                    css={css(classes.btn)}
                >
                    {props.btnText}
                </Button>
            </Grid>
        </Grid>
    )
}