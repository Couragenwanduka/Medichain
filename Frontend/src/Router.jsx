import HOMESCREEN from "./pages/HomeScreen";
import PatientsSignup from "./pages/patientsSignup";
import PATIENTSLOGIN from './pages/patientsLogin';
import PATIENTSDASHBOARD from './pages/PatientsDashBoard.jsx';
import DoctorsLogin from "./pages/Doctors'slogin.jsx"
import {BrowserRouter,Routes, Route} from 'react-router-dom';


const ROUTER=()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HOMESCREEN/>}/>
                <Route path='patient-signup' element={<PatientsSignup/>}/>
                <Route path='patient-login' element={<PATIENTSLOGIN/>}/>
                <Route path='patients-dashboard' element={<PATIENTSDASHBOARD/>}/>
                <Route path='doctors-login' element={<DoctorsLogin/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default ROUTER;