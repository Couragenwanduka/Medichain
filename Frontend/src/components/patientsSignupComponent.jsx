import axios from 'axios';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';
const SIGNUP = () => {
  const [errorMessage,setErrorMessage] = useState('')
  const navigate = useNavigate();
  const [formdata,setFormData] = useState({
   firstName:'',
   lastName:'',
   email:'',
   password:'',
   age:'',
   gender:''
    
  })
  const handelOnChange = (e)=>{
    e.preventDefault();
    setFormData({
     ...formdata,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit =async(e)=>{
    try{
      e.preventDefault();
    const response= await axios.post('http://localhost:4000/medichain/patient-signup',formdata)
     if(response.status==200){
      navigate('/patient-login')
     }
    }catch(error){
      setErrorMessage(error.response.data.message|| 'an error occurred')
      console.log(error)
    }
  }
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
                    {/* <h1>SIGNUP</h1> */}
                    <h2>LET'S GET STARTED</h2>
                    <h3>CREATE ACCOUNT</h3>
                    <form className="form" onSubmit={handleSubmit}>
                        <label htmlFor="firstName">firstName</label>
                        <input type="text" id="firstName" name='firstName' placeholder="First Name" onChange={handelOnChange}/>
                        <label htmlFor="lastName">lastName</label>
                        <input type="text" id="lastName" name='lastName' placeholder="Last Name" onChange={handelOnChange}/>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email"  name='email' placeholder="Email" onChange={handelOnChange} />
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name='password' placeholder="Password" onChange={handelOnChange} />
                        <label htmlFor="Age">Age</label>
                        <input type="text" id="Age" name='age' placeholder="Age" onChange={handelOnChange}/>
                        <label htmlFor="gender">Gender</label>
                        <input type="text" id="gender" name='gender' placeholder="Gender" onChange={handelOnChange}/>
                        <input type="submit" value={"GET STARTED"} className="btnsubmit"/>
                        {errorMessage&&(<p className='message'>{errorMessage}</p>)}
                        <p className="or"> OR</p>
                        <div className="google-button">
                        <input type="button" value="SIGN UP WITH GOOGLE" className="google"/>
                        <img src="icons8-google.png" alt="Google Logo"/>
                        </div>
                        <p>Already have an account? <span><Link to={'/patient-login'}>LOGIN HERE</Link></span></p>
                        
                    </form>
        </div>
       
        </div>
    );
}

export default SIGNUP;
