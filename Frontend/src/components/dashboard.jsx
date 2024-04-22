import { useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
const DashBoard=()=>{
    const [activeTab, setActiveTab] =useState(0);
    const [activeSpec, setActiveSpec] = useState(0);
    const [showMore, setShowMore] = useState(false);
    const [location, setLocation] = useState('');
    const [doctor, setDoctor] = useState('');
    const [cookies] = useCookies(['token']);
    const [error, setError] = useState('');

    const handleButtonClick = () => {
        setShowMore(!showMore);
      };


    const handleTabClick=(index)=>{
        setActiveTab(index)
    }
    const handleSpecClick=(index)=>{
        setActiveSpec(index)
    }
    const onTabClick = async(Specialization) =>{
       try{
        const token = cookies.token;
        const response= await axios.get(`http://localhost:4000/medichain/doctor-by-specialization/${Specialization}`,{
            headers:{
               'Authorization':`Bearer ${token}`
            }
        })
        // if(response.data.doctor.length === 0){
        //     setError('Nodoctor found')
        // }
        
       console.log(response.data);
        const [locationData, doctorData] = response.data; // Destructure the first array from response data
        setLocation(locationData); // Set location state
        setDoctor(doctorData);
       }catch(error){
        console.log(error)
       }
    }
    return(
        <>
        <div className="containerDiv1">
            <div className="imagecontainer">
                <img src="/Header.jpg" className="image"/>
            </div>
            <div className="main">
                <img src="/notifications.png" className="notification"/>
                <div className="userDiv">
                <img src="/person.png" className="person"/>
                <p>Hi there</p>
                </div>
            </div>
        </div>
        <aside className="aside">
            <div>
            <button className={activeTab==='DashBoard'?'active btnD':"btnD"}
            onClick={()=>handleTabClick('DashBoard')}
            >
                <img src="D.png" className="imageD" alt="Dashboard icon" />
                DashBoard
            </button>

                
            </div>
            <div>
               
                <button className={activeTab=== 'Appointment'?'active btnD':"btnD"}
                onClick={()=>handleTabClick('Appointment')}
                >
                <img src="A.png" className="imageD"/>
                    Appointment</button>
            </div>
            <div>
                 
                <button className={activeTab=== 'Message'?'active btnD':"btnD"}
                onClick={()=>handleTabClick('Message')}
                >
                <img src="R.png" className="imageD"/>
                    Message</button>
                
            </div>
            <div>
                
                <button className={activeTab=== 'Profile'?'active btnD':"btnD"}
                onClick={()=>handleTabClick('Profile')}
                >
                <img src="person.png" className="imageD"/>
                    Profile</button>
                
            </div>
        </aside>
        {activeTab=== 'DashBoard' &&(
     <div className="appointmentDiv">
      <h1>Book an appointment</h1>
      <p>Specialization</p>
      <div className="specializationDiv">
        <div className="collectionDiv"> 
        <div className="mainDiv1" onClick={() => onTabClick('cardiologist')}>Cardiologists</div>
        <div className="mainDiv1" onClick={() => onTabClick('dermatologist')}>Dermatologists</div>
        <div className="mainDiv1" onClick={() => onTabClick('athology')}>Pathology</div>
        <div className="mainDiv1" onClick={() => onTabClick('sychiatrist')}>Psychiatrists</div>
        <div className="mainDiv1" onClick={() => onTabClick('phthalmologist')}>Ophthalmologists</div>
        </div>
        {showMore && (
          <>
          <div className="collectionDiv">
         <div className="mainDiv1"  onClick={() => onTabClick('gynecologist')}>Gynecologists</div>
        <div className="mainDiv1"  onClick={() => onTabClick('oncologist')}>Oncologists</div>
        <div className="mainDiv1"  onClick={() => onTabClick('pediatrician')}>Pediatricians</div>
        <div className="mainDiv1"  onClick={() => onTabClick('general Surgeon')}>General Surgeons</div>
        <div className="mainDiv1"  onClick={() => onTabClick('rheumatologist')}>Rheumatologists</div>
       
         </div>
          <div className="collectionDiv">
          <div className="mainDiv1"  onClick={() => onTabClick('Internal Medicine')}>Internal Medicine</div>
          <div className="mainDiv1"  onClick={() => onTabClick('Neurologist')}>Neurologists</div>
          <div className="mainDiv1"  onClick={() => onTabClick('Emergency Medicine Specialist')}>Emergency Medicine Specialists</div>
          <div className="mainDiv1"  onClick={() => onTabClick('Physical Medicine and Rehabilitation')}>Physical Medicine and Rehabilitation</div>    
          </div>
      
          </>
        )}
      </div>
      <button onClick={handleButtonClick}>
        {showMore ? 'Show Less' : 'Show More'}
      </button>    
             <p>Available Doctors</p>
             {Array.isArray(doctor) && doctor.map((singleDoctor, index) => (
    <div key={index} className="doctor-info">
        <img src={singleDoctor.image[0]} alt="Doctor" />
        <div className="details">
            <p className="name">Dr {singleDoctor.firstName} {singleDoctor.lastName}</p>
            <p className="spec">{singleDoctor.specialization}</p>
            {location && location[index] && (
                <p className="location">{location[index].county}, {location[index].state}, {location[index].country}</p>
            )}
        </div>
    </div>
))}

             <p>Available Days</p>
             <div>
                 <div  className="mainDiv1">1</div>
                 <div  className="mainDiv1">2</div>
                 <div  className="mainDiv1">2</div>
             </div>
             <p>Available Times</p>
             <div>
                 <div  className="mainDiv1">1</div>
                 <div  className="mainDiv1">2</div>
                 <div  className="mainDiv1">2</div>
             </div>
             <button>Book Appointment</button>
             </div>
        )}
        {activeTab === 'Appointment' &&(
             <div className="appointmentDiv">
             <h1>My Appointment</h1>
         
             <p>Up Coming</p>
             <div >
                 <div className="doctorDiv">1</div>
                 <div className="doctorDiv">2</div>
                 <div className="doctorDiv">2</div>
             </div>
             <p>Past</p>
             <div>
                 <div  className="mainDiv1">1</div>
                 <div  className="mainDiv1">2</div>
                 <div  className="mainDiv1">2</div>
             </div>
            
             </div>
        )}
        {activeTab=== 'Message' &&(
             <div className="appointmentDiv">
             <h1>No Messages</h1>       
             </div>
        )}
        {activeTab==='Profile' &&(
             <div className="ProfileDiv">
             <div>
             <button>
             <div>
             <img/>
             </div> 
             <div>
                 <img src="/addPhoto.png"/>
             </div>
             </button>
             <p>doiwjirf</p>
             </div>
             
             <div>
                 <p>Email</p>
                 <p>safrget</p>
             </div>
             <div>
                 <p>Gender</p>
                 <input type="radio" value={'Male'}/>
                 <input type="radio" value={'Female'}/>
                 <p>Brithday</p>
                 <input type="date"/>
             </div>
            <button>Log Out</button>
             
         </div>
        )}
       
        </>
    )
}

export default DashBoard;