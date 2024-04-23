import { useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import Modal from 'react-modal';

const DashBoard = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [showMore, setShowMore] = useState(false);
    const [loading, setLoading] = useState(false);
    const [doctor, setDoctor] = useState('');
    const [cookies] = useCookies(['token']);
    const [error, setError] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [appointment, setAppointmentData] = useState(null);
    const [ secondAppointment, setSecondAppointment] = useState(null);
   
    
   
    const handleOpenModal = (doctor) => {
        setModalOpen(true);
        setSelectedDoctor(doctor);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleButtonClick = () => {
        setShowMore(!showMore);
    };

    const handleTabClick = (index) => {
        setActiveTab(index)
    }

    const onTabClick = async (Specialization) => {
        try {
            const token = cookies.token;
            const response = await axios.get(`http://localhost:4000/medichain/doctor-by-specialization/${Specialization}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setDoctor(response.data.doctorDetails);
            console.log(response.data.doctorDetails);
            console.log(doctor)
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
            setError('Error fetching data');
        }
    }

    const bookAppointment =async()=>{
        try{
    const token = cookies.token;
    const doctorid=doctor._id 
    const location=[doctor.county,doctor.country,doctor.state]
    const response = await axios.post(`http://localhost:4000/medichain/create-appointment`,{doctorid,location}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    console.log(response.data)
        }catch(error){
            console.log(error);
        }
    }
    const seeAppointment=async()=>{
        try{
        const token = cookies.token;
        const response= await axios.get(`http://localhost:4000/medichain/find-all-appointment-by-patient-id`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        setAppointmentData(response.data);
         setSecondAppointment(response.data.appointment[1])
        console.log(response.data)
        }catch(error){
            console.log(error);
        }
    }
    return (
        <>
            <div className="containerDiv1">
                <div className="imagecontainer">
                    <img src="/Header.jpg" className="image" alt="Header" />
                </div>
                <div className="main">
                    <img src="/notifications.png" className="notification" alt="Notifications" />
                    <div className="userDiv">
                        <img src="/person.png" className="person" alt="Person" />
                        <p>Hi there</p>
                    </div>
                </div>
            </div>
            <aside className="aside">
                <div>
                    <button className={activeTab === 'DashBoard' ? 'active btnD' : "btnD"}
                        onClick={() => handleTabClick('DashBoard')}
                    >
                        <img src="D.png" className="imageD" alt="Dashboard icon" />
                        DashBoard
                    </button>
                </div>
                 <div>
                    <button 
                        className={activeTab === 'Appointment' ? 'active btnD' : 'btnD'}
                        onClick={() => {
                            handleTabClick('Appointment');
                        seeAppointment()
                        }}
                    >
                        <img src="A.png" className="imageD" alt="Appointment icon" />
                        Appointment
                    </button>
                </div>

                <div>
                    <button className={activeTab === 'Message' ? 'active btnD' : "btnD"}
                        onClick={() => handleTabClick('Message')}
                    >
                        <img src="R.png" className="imageD" alt="Message icon" />
                        Message
                    </button>
                </div>
                <div>
                    <button className={activeTab === 'Profile' ? 'active btnD' : "btnD"}
                        onClick={() => handleTabClick('Profile')}
                    >
                        <img src="person.png" className="imageD" alt="Profile icon" />
                        Profile
                    </button>
                </div>
            </aside>
            {activeTab === 'DashBoard' && (
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
                                    <div className="mainDiv1" onClick={() => onTabClick('gynecologist')}>Gynecologists</div>
                                    <div className="mainDiv1" onClick={() => onTabClick('oncologist')}>Oncologists</div>
                                    <div className="mainDiv1" onClick={() => onTabClick('pediatrician')}>Pediatricians</div>
                                    <div className="mainDiv1" onClick={() => onTabClick('general Surgeon')}>General Surgeons</div>
                                    <div className="mainDiv1" onClick={() => onTabClick('rheumatologist')}>Rheumatologists</div>
                                </div>
                                <div className="collectionDiv">
                                    <div className="mainDiv1" onClick={() => onTabClick('Internal Medicine')}>Internal Medicine</div>
                                    <div className="mainDiv1" onClick={() => onTabClick('Neurologist')}>Neurologists</div>
                                    <div className="mainDiv1" onClick={() => onTabClick('Emergency Medicine Specialist')}>Emergency Medicine Specialists</div>
                                    <div className="mainDiv1" onClick={() => onTabClick('Physical Medicine and Rehabilitation')}>Physical Medicine and Rehabilitation</div>
                                </div>
                            </>
                        )}
                    </div>
                    <button onClick={handleButtonClick}>
                        {showMore ? 'Show Less' : 'Show More'}
                    </button>
                    <p className="available">Available Doctors</p>
                    <div className="doctor-card">
    {Object.keys(doctor).length > 0 && (
        <div className="doctor-list" key={Object.keys(doctor)[0]} onClick={()=>handleOpenModal(doctor)}>
            <div className="textDiv">
            <p className="doctor-name">{doctor.firstName} {doctor.lastName}</p>
            <p className="doctor-info">{doctor.experience} of experience</p>
            <p className="doctor-info">Location: {doctor.country}, {doctor.county}, {doctor.state}</p>
            </div>
            <div>
            <img src={doctor.image[0]} alt="Doctor" className="doctor-img" />
            </div>
           
        </div>
    )}
</div> 
 </div>
            )}
            {activeTab === 'Appointment' && (
                <div className="appointmentDiv">
                    <h1>My Appointment</h1>
                    <p>Up Coming</p>
                    <div >
                   
                    <div className="appointment-container">
  {appointment && Array.isArray(appointment.appointment) && (
    appointment.appointment.map((item, index) => (
      <div key={index} className="appointment-card">
        <p><strong>Date:</strong> {item.date}</p>
        <p><strong>Doctor:</strong> {item.doctor}</p>
        <p><strong>Location:</strong> {item.location}</p>
        <div className="doctor-info">
          <p><strong>Doctor:</strong> {secondAppointment.firstName} {secondAppointment.lastName}</p>
          <img src={secondAppointment.image[0]} alt="Doctor" />
          <p><strong>Location:</strong> {secondAppointment.county}, {secondAppointment.state}, {secondAppointment.country}</p>
        </div>
      </div>
    ))
  )}
</div>

                        <div className="doctorDiv">1</div>
                        <div className="doctorDiv">2</div>
                        <div className="doctorDiv">2</div>
                    </div>
                    <p>Past</p>
                    <div>
                        <div className="mainDiv1">1</div>
                        <div className="mainDiv1">2</div>
                        <div className="mainDiv1">2</div>
                    </div>
                </div>
            )}
            {activeTab === 'Message' && (
                <div className="appointmentDiv">
                    <h1>No Messages</h1>
                </div>
            )}
            {activeTab === 'Profile' && (
                <div className="ProfileDiv">
                    <div>
                        <button>
                            <div>
                                <img alt="Profile" />
                            </div>
                            <div>
                                <img src="/addPhoto.png" alt="Add Photo" />
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
                        <input type="radio" value={'Male'} />
                        <input type="radio" value={'Female'} />
                        <p>Brithday</p>
                        <input type="date" />
                    </div>
                    <button>Log Out</button>
                </div>
            )}
           <Modal
    isOpen={modalOpen}
    onRequestClose={handleCloseModal}
    contentLabel="Doctor Details Modal"
    ariaHideApp={false}
    style={{
        content: {
            width: '50%',
            margin: 'auto',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            border: 'none',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: '1000',
        },
    }}
>
    {selectedDoctor && (
        <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontWeight: 'bold', marginBottom: '10px',color:'red', textTransform: 'capitalize', fontSize:'60px' }}>
                {selectedDoctor.firstName} {selectedDoctor.lastName}
            </h2>
            <img
                src={selectedDoctor.image[0]}
                alt="Doctor"
                style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '20px' }}
            />
            <div style={{ textAlign: 'left' }}>
                <p>
                    <strong>Bio:</strong> {selectedDoctor.bio}
                </p>
                <p>
                    <strong>Gender:</strong> {selectedDoctor.gender}
                </p>
                <p>
                    <strong>Email:</strong> {selectedDoctor.email}
                </p>
                <p>
                    <strong>Country:</strong> {selectedDoctor.country}
                </p>
                <p>
                    <strong>State:</strong> {selectedDoctor.state}
                </p>
                <p>
                    <strong>County:</strong> {selectedDoctor.county}
                </p>
            </div>
        </div>
    )}
             <button onClick={bookAppointment}
             style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#0F4C5C', color: '#fff', cursor: 'pointer' }}
             >Book Appointment</button>
    <button onClick={handleCloseModal} style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer',marginLeft:'20px' }}>
        Close Modal
    </button>
</Modal>

        </>
    )
}

export default DashBoard;
