const SIGNUP = () => {
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
                    <form className="form">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder="Name" />
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Email" />
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Password" />
                        <input type="button" value={"GET STARTED"} className="btnsubmit"/>
                        <p className="or"> OR</p>
                        <div className="google-button">
                        <input type="button" value="SIGN UP WITH GOOGLE" className="google"/>
                        <img src="icons8-google.png" alt="Google Logo"/>
                        </div>
                        <p>Already have an account? <span><a>LOGIN HERE</a></span></p>
                        
                    </form>
        </div>
                
            
        </div>
    );
}

export default SIGNUP;
