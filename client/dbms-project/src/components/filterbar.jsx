/** @jsxImportSource @emotion/react */
import { Autocomplete, Box, TextField, InputAdornment, Button } from "@mui/material";
import { css } from '@emotion/react';
import { Search } from "@mui/icons-material";
import FilterListIcon from '@mui/icons-material/FilterList';

const classes = {
    bar: `
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 16px 0;
        @media (min-width: 0px){
            flex-direction: column;
        }
        @media (min-width: 600px){
            flex-direction: row;
        }
        @media (min-width: 600px){
            align-items: center;
        }
    `,
    filterbox: `
        display: flex;
        flex-direction: row;
        flex-shrink: 0;
        margin-top: 8px;
        margin-bottom: 8px;
    `,
    filter: `
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
        background-color: transparent;
        outline: 0px;
        border: 0px currentcolor;
        margin: 0px;
        cursor: pointer;
        user-select: none;
        vertical-align: middle;
        appearance: none;
        text-decoration: none;
        font-weight: 700;
        line-height: 1.71429;
        font-size: 0.875rem;
        text-transform: capitalize;
        font-family: "Public Sans", sans-serif;
        min-width: 64px;
        padding: 6px 8px;
        border-radius: 8px;
        transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        color: inherit;
        box-shadow: none;
    `,
    sortby: `
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
        background-color: transparent;
        outline: 0px;
        border: 0px currentcolor;
        margin: 0px;
        cursor: pointer;
        user-select: none;
        vertical-align: middle;
        appearance: none;
        text-decoration: none;
        line-height: 1.71429;
        font-size: 0.875rem;
        text-transform: capitalize;
        font-family: "Public Sans", sans-serif;
        min-width: 64px;
        padding: 6px 8px;
        border-radius: 8px;
        transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        color: inherit;
        box-shadow: none;
        font-weight: 600;
    `
}

export default function Filterbar(){
    return(
        <Box css={css(classes.bar)}>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                // sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} size="small" InputProps={{startAdornment: <InputAdornment position="start"><Search/></InputAdornment>}} label="Movie" />}
            />
            <Box css={css(classes.filterbox)}>
                <Button css={css(classes.filter)} endIcon={<FilterListIcon />}>Filter</Button>
                <Button css={css(classes.sortby)} endIcon={<FilterListIcon />}>Sort By:<Box component="span">Featured</Box></Button>
            </Box>
        </Box>
    )
}

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 }
]