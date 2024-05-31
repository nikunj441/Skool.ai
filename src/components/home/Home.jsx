import React from "react"
import { Box, Grid } from "@mui/material"
import Banner from '../banner/Banner'
import Categoies from './Categories'
import Posts from "./post/Posts"
const Home = () =>{
    return(
        <Box>
            <Banner />
            <Grid container>
                <Grid item lg={2} sm={2} xs={12}>
                    <Categoies />
                </Grid>
                <Grid style={{padding: "10px"}} item lg={10} sm={10} xs={12}>
                    <Posts />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Home