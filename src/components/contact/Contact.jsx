import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub,LinkedIn, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(http://mrtaba.ir/image/bg2.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px top -100px;
    background-size: cover;
`;

const Container = styled(Box)`
    display: flex;
    flex-direction: row;
    width: 30%;
    margin: 30px auto;
    justify-content: space-between;
    &>
`
const Wrapper = styled(Box)`
    padding: 20px;
    & > h3 {
        margin-top: 50px;
    }
`

const Text = styled(Typography)`
    color: #878787;
`;

const EmailIcon = styled(Email)`
    color: #878787;
`

const Contact = () => {
    return (
        <Box>
            <Banner />
            <Wrapper>
                <Typography variant="h3">Getting in touch is easy!</Typography>   
                <Container>
                    <Box >
                        <Link href="https://github.com/nikunj441" color="inherit" target="_blank"><GitHub /></Link>
                    </Box>

                    <Box>
                        <Link href="#" color="inherit" target="_blank">
                            <LinkedIn />
                        </Link>
                    </Box>

                    <Box>
                         <a href="mailto:info@connect.com" color='inherit'><EmailIcon  /></a>.
                    </Box>
                </Container> 
            </Wrapper>
        </Box>
    );
}

export default Contact;