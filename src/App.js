import React from 'react'
import Login from './components/account/Login.jsx'
import DataProvider from './context/DataProvider.jsx'
import Home from './components/home/Home.jsx'; 
import {BrowserRouter, Routes, Route, Navigate, Outlet} from 'react-router-dom'
import Header from './components/header/Header.jsx';
import { useState } from 'react';
import CreatePost from './components/create/CreatePost.jsx';
import DetailView from './components/details/DetailView.jsx';
import UpdatePost from './components/create/UpdatePost.jsx';
import Contact from './components/contact/Contact.jsx'
import About from './components/about/About.jsx'

const PrivateRoute = ({isAuthenticated,...props}) =>{

  return isAuthenticated ? 
    <div> 
      <Header /> 
      <Outlet />
    </div> 
  : <Navigate replace to='/login' />
}

function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false)
  return (
    <DataProvider>
      <BrowserRouter>
        
          <div style={{marginTop: 64}}>
          <Routes>
            <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated}/>} />
            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
              <Route path='/' element={<Home />} />
            </Route>
            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
              <Route path='/create' element={<CreatePost />} />
            </Route>
            <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
              <Route path='/details/:id' element={<DetailView />} />
            </Route>
            <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
              <Route path='/update/:id' element={<UpdatePost />} />
            </Route>
            <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
              <Route path='/about' element={<About />} />
            </Route>
            <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
              <Route path='/contact' element={<Contact />} />
            </Route>
            
          </Routes>
          </div>   
      </BrowserRouter> 
    </DataProvider>
  );
}

export default App;
