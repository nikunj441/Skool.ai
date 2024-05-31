import {Box, styled, FormControl, InputBase, Button, TextareaAutosize, Typography} from '@mui/material'
import {AddCircle as Add} from '@mui/icons-material';
import  { useState, useEffect, useContext} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import {API} from '../../service/api'

const Container = styled(Box)(({theme})=>({
    margin: '60px 100px',
    [theme.breakpoints.down('md')]:{
        margin: 0
    }
}))
const Image = styled('img')({
    width: "100%",
    height: "50vh",
    objectFit: 'cover'

})

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`
const InsertImage = styled(Typography)`
    font-size: 13px;
    color: #9e9e9e;
`
const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    border: 0.5px solid grey;
    font-size: 20px;
`

const TextArea = styled(TextareaAutosize)`
    width: 100%;
    margin-top: 50px;
    font-size: 18px;
    border: none;
    &:focus-visible{
        outline: none;
    }
`

const initialPost={
    title: "",
    description: "",
    picture: "",
    username: "",
    categories: "",
    createdDate: new Date()
    
}
const UpdatePost = () =>{

    const [post,setPost] = useState(initialPost)
    const [file,setFile]=useState("")
    const {account} = useContext(DataContext)
    const location = useLocation()
    const navigate = useNavigate()

    const {id} = useParams()
    const url = post.picture ? post.picture : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"

    useEffect(()=>{
        const fetchData= async ()=>{
            let response = await API.getPostById(id)

            if(response.isSuccess){
                setPost(response.data)
            }
        }
        fetchData()
    },[])
    useEffect(() => {
        const getImage = async () => {
        try{
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
        
                // API CALL
    
                    const response = await API.uploadFile(data);
                    setPost({ ...post, picture: response.data });
                
              }
        }catch(e){
            console.log("error", e)
        }   
        }
        getImage()
        post.categories = location.search?.split('=')[1] || 'All'
        setPost({ ...post, username: account.username });       
        console.log(post.username)

      }, [file])  //eslint-disable-line react-hooks/exhaustive-deps

    const handleChange=(e)=>{
        setPost({...post,[e.target.name]:e.target.value})
    }

    const updateBlogPost = async () => {
        try {
          let res = await API.updatePost(post);
          if (res.isSuccess) {
             navigate(`/details/${id}`);
          }
        } catch (error) {
          console.error('Error in savePost:', error);
        }
      };
      

    return(
        <Container>
            <Image src={url} alt='banner' />
            <StyledFormControl>
                <label htmlFor='fileInput'>
                    <Add fontSize='large' 
                         color='action'        
                    />
                </label>
                <input 
                type='file' 
                id='fileInput' 
                style={{display: "none"}}
                onChange ={(e)=>setFile(e.target.files[0])}
                />

                <InputTextField 
                    placeholder='Tilte' 
                    name='title' 
                    value={post.title}
                    onChange={(e)=>handleChange(e)}
                />
                <Button 
                    variant="contained"
                    onClick = {()=>updateBlogPost()}
                    > 
                    Update
                </Button>
            </StyledFormControl>
            <InsertImage>Image</InsertImage>
            
        </Container> 
    )
} 

export default UpdatePost