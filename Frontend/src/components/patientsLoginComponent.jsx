import { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';
const LOGIN = () => {
  const [latitude,setLatitude] = useState('');
  const [longitude,setLongitude] = useState('');
  const [errorMessage,setErrorMessage] = useState('');
  const [cookies,setCookie,removeCookie] = useCookies();
  const [successMessage,setSuccessMessage] = useState('');
  const Navigate= useNavigate()
  const [formData,setFormData] = useState({
    email:'',
    password:''
  });
  const handelOnChange=(e)=>{
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handelOnSubmit= async(e)=>{
    try{
      e.preventDefault();
      const response = await axios.post('http://localhost:4000/medichain/patient-login',{formData,longitude,latitude})
      console.log(response.data)
       setSuccessMessage(response.message)
       Navigate('/patients-dashboard')
       const token=response.data.token
       setCookie('token',token,{path:'/'})
    }catch(error){
      setErrorMessage(error.response.data.message)
    }
  }
  useEffect(()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error)=>{
        setErrorMessage(error.message);
      }
    )
    }else{
      setErrorMessage("Geolocation is not supported by this browser");
    }
    
  },[]);
    return (
        <div id="containerDiv">
          <img src='/closeup-support-hands 1.png' className="backgroundImage"/>
          <div>
            <button className="btn"><img src="/arrow.png"/>GO BACK</button>
            <div className="moto">
                <h1>Building The Future</h1>
            <p >Caring for your health is our foremost priority at MediSync. 
            We believe in the power of connection, which is why our platform serves as a bridge between patients and doctors, 
            ensuring that you receive the care and attention you deserve. With our app, you're not just a user — 
            you're part of a community where your well-being comes first. We're dedicated to fostering meaningful relationships, 
            connecting hearts, and providing comprehensive healthcare solutions tailored to your needs. 
            Trust us to be your partner in health, every step of the way.</p>
            </div>
         
          </div>
        <div className="formDiv">
                    
                    <h2>Welcome Back</h2>
                    <form className="form" onSubmit={handelOnSubmit}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Email" onChange={handelOnChange}/>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password"  name="password" placeholder="Password" onChange={handelOnChange}/>
                        <input type="submit" value={"Continue"} className="btnsubmit"/>
                        <p className="or"> OR</p>
                        <div className="google-button">
                        <input type="button" value="SIGN UP WITH GOOGLE" className="google"/>
                        <img src="icons8-google.png" alt="Google Logo"/>
                        </div>
                        <p>New User? <span><a>SIGNUP HERE</a></span></p>
                        {errorMessage&&(<p className='message'>{errorMessage}</p>)}
                    </form>
        </div>
                
            
        </div>
    );
}

export default LOGIN ;
