import {API} from '../../../service/api'
import { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'
import { useSearchParams, Link } from 'react-router-dom'
//Components
import Post from './Post'


const Posts = () =>{

    const [posts,setPosts] = useState([])
    const [searchParams] = useSearchParams()

    const category = searchParams.get('category')

    
    useEffect(() => {
        const fetchData = async () => { 
          try {
            let response = await API.getAllPosts({category: category || ''});
      
            if (response.isSuccess) {
              setPosts(response.data);
            }
          } catch (error) {
            console.log('error');
          }
        };
      
        fetchData();
      }, [category]);

    return(
      <>
      <Grid container spacing={3}> {/* This creates the grid container */}

    { 
        posts && posts.length > 0 
        ? 
        posts.map((post) =>(
          <Grid item lg={3} md={4} sm={6} xs={12} >
              <Link  to={`details/${post._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                <Post key={post._id} post={post}/>
              </Link>
          </Grid>
        ))
       
        
      : 

        <Box style={{ color: '#878787', margin: '30px 80px', fontSize: '18px' }}>
          No data available
        </Box>
      
    }
    </Grid>
    </>
    )
  }
export default Posts