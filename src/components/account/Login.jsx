
import {useState, useContext} from 'react'
import {Box,TextField,Button,styled,Typography} from '@mui/material'
import logo from '../../images/logo.png'
import {API} from '../../service/api.js'
import {DataContext} from '../../context/DataProvider.jsx'
import  {useNavigate} from 'react-router-dom'
import { Snackbar } from '@mui/material';
const Component = styled(Box)`
    width: 400px;
    margin: auto;
    margin-top: 10px;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`

const Image = styled('img')({
    width: 160,
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0'
})

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    flex-direction: column;
    & > div, & > button{
         margin-top: 20px;
    }
`

const LoginButton = styled(Button)`
    text-transform: none;
    background-color: #4169E1;
    color: #FFF;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/20%);
    &:hover {
        background-color: #0437F2;
      }
`
const SignInButton = styled(Button)`
    text-transform: none;
    background: #FFF;
    color: blue;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/20%);
`
const Text = styled(Typography)`
    color: #878787;
    font-size: 15px;
`
const Error = styled(Typography)`
    font-size: 10px; 
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`
const signupInitialDetails = {
    name: '',
    username: '',
    password: ''
}
const loginInitialDetails = {
    username: '',
    password: ''
}

const Login = ({isUserAuthenticated}) =>{


    const [account, toggleAccount] = useState('login')
    const [signup, setSignup] = useState(signupInitialDetails)
    const [login, setLogin] = useState(loginInitialDetails)
    const [error, setError] = useState('')
    const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);

    const {setAccount} = useContext(DataContext)
    const navigate = useNavigate()

    const toggleSignup = () =>{
        account === "login" ? toggleAccount('signup') : toggleAccount('login')
    }
    
    const onInputChange = (e) =>{
        setSignup({...signup,[e.target.name]:e.target.value})
    }

    const onValueChange = (e) =>{
        setLogin({...login,[e.target.name]:e.target.value})
    }

    const loginUser = async () => {
        try {
            let response = await API.userLogin(login);
            
            if (response.isSuccess) {
                setError('');
                sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
                setAccount({ username: response.data.username, name: response.data.name });
                isUserAuthenticated(true);
                navigate('/');
            } else {
                setError('Something went wrong! Please try again later');
                setShowErrorSnackbar(true); // Show the Snackbar when login fails
            }
        } catch (error) {
            console.log(error);
        }
    };

    const signupUser = async () =>{
       let response = await API.userSignup(signup)
       if(response.isSuccess){
        setError('')
        setSignup(signupInitialDetails)
        toggleAccount('login')
       }else{
        setError('Something went wrong! Please try again later')
       }
    }
    

    return(
        <Component>
            <Box>
                <Image src={logo} alt='logo'/>
            {
                    
                account === "login"
                
                ?
                    <Wrapper>
                        <TextField variant="standard" type='text' value={login.username} label="Enter username" onChange={(e)=>onValueChange(e)} name="username" />
                        <TextField variant="standard" type="password" label="Enter password" onChange={(e)=>onValueChange(e)} name="password" />

                        {error && <Error>{error}</Error>}
                        
                        <LoginButton variant='contained' onClick={()=>{loginUser()}}>Login</LoginButton>
                        <Text style = {{textAlign: "center",marginTop: "15px"}}>OR</Text>
                        <SignInButton onClick={()=>toggleSignup()}>Create an account</SignInButton>
                    </Wrapper>
                :
                    <Wrapper>
                        <TextField variant="standard" name="name" onChange={(e)=>onInputChange(e)} placeholder="Enter Name" />
                        <TextField variant="standard" name="username" onChange={(e)=>onInputChange(e)}  label="Enter username" />
                        <TextField type="password" variant="standard" name="password" onChange={(e)=>onInputChange(e)} label="Enter password" />

                        {error && <Error>{error}</Error>}

                        <SignInButton onClick={()=>signupUser()}>SignUp</SignInButton>
                        <Text style = {{textAlign: "center",marginTop: "15px"}}>OR</Text>
                        <LoginButton variant='contained' onClick={()=>toggleSignup()}>Already have an account</LoginButton>
                    </Wrapper>

            }
            </Box>

            <Snackbar
                open={showErrorSnackbar}
                autoHideDuration={6000}
                onClose={() => setShowErrorSnackbar(false)}
                message="Username and password do not match!"
            />

        </Component>
    )
}

export default Login;