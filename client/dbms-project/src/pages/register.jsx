// /** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Container, Typography, Box, TextField, Stack, InputAdornment, IconButton, FormControl, InputLabel, OutlinedInput, Button, Checkbox, FormControlLabel } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { css } from "@emotion/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import axios from "axios";
import { useDispatch } from "react-redux";
import { show } from '../features/snackbarSlice';

const classes = {
    box: `
        max-width: 480px;
        margin: auto;
        min-height: 100vh;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        flex-direction: column;
        padding: 96px 0px;
    `,
    btn: `
        width: 100%;
        border-radius: 6px;
        height: 48px;
        text-transform: none;
        font-weight: 700;
        background-color: rgb(32, 101, 209);
        box-shadow: rgba(32, 101, 209, 0.24) 0px 8px 16px 0px;
    `
}

export default function Login(){
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          password: '',
          isSupplier: false
        },
        onSubmit: (values) => {
          console.log(values);
          axios.post('/auth/register', values)
          .then((response)=>{
              console.log(response);
              if(response.status === 200)
                localStorage.setItem('token', response.data);
              navigate('/');
          }).catch((err) => {
              console.log(err);
              if(err.response.status === 409){
                dispatch(show("User already exists"));
                navigate('/login');
              }
          })
        },
    });

    return(
        <Container maxWidth="sm">
            <Box css={css(classes.box)}>
                <Typography variant="h4">Sign up</Typography>
                <Stack sx={{mt:5}} direction="column" gap={3}>
                    <TextField label="Name" name="name" value={formik.values.name} onChange={formik.handleChange}/>
                    <TextField label="Email" name="email" value={formik.values.email} onChange={formik.handleChange}/>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <FormControlLabel control={<Checkbox name="isSupplier" checked={formik.values.isSupplier} onChange={formik.handleChange}/>} label="Register as supplier" />
                    <Button type="submit" variant="contained" onClick={formik.handleSubmit} css={css(classes.btn)}>Register</Button>
                </Stack>
                <Typography variant="body1" component={RouterLink} to="/login" sx={{mt:3}}>Login</Typography>
            </Box>
        </Container>
    )
}