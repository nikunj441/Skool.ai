import { Box, Typography, styled } from "@mui/material"
import { addElipsis } from "../../../utils/common-utils"

const Container = styled(Box)`
    border: 0px solid grey;
    border-radius: 10px;
    box-shadow: 7px 9px 5px 0px rgba(0, 0, 0, 0.5);
    
    height: 300px;
    display: flex;
    align-items: center;
    flex-direction: column;
    & > p{
        padding: 0 5px 5px 5px;
    }
`

const Image = styled('img')({
    width: '100%',
    borderRadius: '10px 10px 0 0',
    objectFit: 'cover',
    height: '150px'
})

const Text = styled(Typography)`
    color: #878787;
    font-size: 15px;
`
const Heading = styled(Typography)`
    font-size: 18px;
`
const Details = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
`


const Post = ({post}) =>{

    post.picture = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'
    return(
        <Container>
            <Image src={post.picture} alt="post-banner" />
            <Text>{post.categories}</Text>
            <Heading>{addElipsis(post.title,20)}</Heading>
            <Text>Tutor: {post.username}</Text>
            
        </Container>
        
       
    )
}

export default Post