import './App.css';
import WeatherComponent from './components/WeatherComponent';
import { auth } from './firebaseSetup';
import React, { useContext, useRef, useState, useEffect } from "react";
import { Card, TextField, Button } from '@mui/material';
import { AuthContext } from "./AuthContext";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import AccountComponent from './components/AccountComponent';
import { BrowserRouter as Router, Routes, Link, useNavigate, useLocation } from "react-router-dom";
import {Switch} from '@mui/material'
import Skeleton from '@mui/material/Skeleton'

function App() {

  const user = useContext(AuthContext);
  const [emailRef, setEmailRef] = useState<any>(null);
  const [passwordRef, setPasswordRef] = useState<any>(null);
  const loc = useLocation();
  

  const createAccount = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        emailRef,
        passwordRef
      );
    } catch (error) {
      console.error(error);
    }
  };
  
  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        emailRef,
        passwordRef
      );
    } catch (error) {
      console.error(error);
    }
  };
 
  const signOut = async () => {
    await auth.signOut();
  };
  
 

  useEffect(() => {
 
    // document.body.style.minHeight = '100%';
    // document.body.style.margin = "0";
    // document.body.style.padding = "0";
  }, [])

 
  

  return (
      
      <div className="App">
    
        <header className="App-header" style={{}}>
          <div style={{}}>
            {/* {loc.pathname === "/account" ? 
                        <AccountComponent/>
                    : null}
                    {user && <Button onClick={signOut} style={{margin: "0 auto"}}>Sign out</Button>} */}
                     
          </div>
        
          
          {!user ? (
            <>
              <Card style={{margin: "0 auto", marginTop: "35vh"}}>
                <TextField id="outlined-basic" variant="standard" placeholder="Email" onChange={(e) => setEmailRef(e.target.value)}/>
                <TextField id="outlined-basic" variant="standard" type="password" placeholder="Password" onChange={(e) => setPasswordRef(e.target.value)}/>
                <Button onClick={signIn}>
                    Sign In
                </Button>
                <Button onClick={createAccount}>
                    Sign Up
                </Button>
                
              </Card>
              <Skeleton variant="text" sx={{ fontSize: '1rem', width: "28vw", margin: "0 auto"}} />
            </>
          
          ) : <WeatherComponent/>}
           
          
        <Routes>
          {/* <Route path="/account" Component={AccountComponent}/> */}
        </Routes>
        </header>
      </div>
  );
}

export default App;
