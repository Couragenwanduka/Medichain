import { Link } from "react-router-dom";
const HOMESCREENCOMPONENTS=()=>{
    return(
        <>
        <h1 className="homeScreenText">TELL US WHAT YOU ARE?</h1>
        <div className="containerDiv12">
            <div>
                <Link to={'/doctors-login'}>
                <img src="/Doctor.png" className="doctor"/>
                </Link>
            </div>
            <div>
                <Link to={'/patient-signup'}>
                <img src="/Patient.png" className="patient"/>
                </Link>
            </div>
        </div>
        <p className="textPara">Have a problem?, don’t hesitate to <span className="contactus"><a >contact us</a></span> </p>
        </>
    )
}

export default HOMESCREENCOMPONENTS;