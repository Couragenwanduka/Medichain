import { useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import Modal from 'react-modal';
import {useNavigate} from 'react-router-dom';


const DashBoard = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [showMore, setShowMore] = useState(false);
    const [loading, setLoading] = useState(false);
    const [doctor, setDoctor] = useState('');
    const [cookies,removeCookie] = useCookies(['token']);
    const [error, setError] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [messageModal, setMessageModal] = useState(false);
    const [appointment, setAppointmentData] = useState(null);
    const [secondAppointment, setSecondAppointment] = useState(null);
   const [message, setMessage] = useState('')
   const [doctorid , setDoctorId] = useState('')
   const [id , setId] = useState('')
   const [displayInfo , setDisplayInfo] = useState('')
  const [successMessage, setSuccessMessage] = useState('')   
  const [cancelappointmentModel, setCancelAppointmentModel] = useState(false)
  const [findMessage, setFindMessage] = useState('')
  const Navigate= useNavigate()
  const status= 'cancelled'
  const sender= "patient"


  const handleLogout = () => {
    try {
        // Clear the 'token' cookie
        removeCookie('token');
        
        // Redirect to login page or perform any other logout actions
        Navigate( '/patient-login');
    } catch (error) {
        // Handle errors if necessary
        console.error('Logout error:', error);
    }
};
   
    const handleMessageChange = (event) => {
        setMessage(event.target.value);
      };

    const handleOpenModal = (doctor) => {
        setModalOpen(true);
        setSelectedDoctor(doctor);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };
 const handlecancleappointmodal= (appointment) => {
    setCancelAppointmentModel(true);
    setAppointmentData(appointment);
    setId(appointment._id)
 }
 const handlecancleappointmodalclose= () => {
    setCancelAppointmentModel(false);
    setAppointmentData(null);
 }
    const handleOpenMessageModal = (secondAppointment) => {
        setMessageModal(true);
        setSelectedDoctor(secondAppointment);
        setDoctorId(secondAppointment._id);
    };
    const handleCloseMessageModal = () => {
        setMessageModal(false);
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
        setAppointmentData(response.data.appointment[0]);
         setSecondAppointment(response.data.appointment[1])
        }catch(error){
            console.log(error);
        }
    }
    const handleSubmit =async (event) => {
        try{
            const token = cookies.token;
            event.preventDefault();
            const response= await axios.post(`http://localhost:4000/medichain/create-message-patients`,{message,doctorid,sender},{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setSuccessMessage(response.data.message)
        }catch(error){
            console.log(error);
        }
      };
      const handleCancelAppointment = async () => {
        try{
        const token = cookies.token;
        const response= await axios.patch(`http://localhost:4000/medichain/update-appointment-by-patient-id/:${id}`,{status},{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setSuccessMessage(response.data.message)
        }catch(error){
            console.log(error);
        }
      }
      const getAllMessages = async()=>{
        try{
         const token = cookies.token;
         const response= await axios.get(`http://localhost:4000/medichain/get-message-by-patient-id`,{
             headers:{
                 'Authorization':`Bearer ${token}`
             }
         })
         setFindMessage(response.data)
         console.log(response.data)
        }catch(error){
            console.log(error);
        }
      }
      const patientDetails =async()=>{
          try{
           const token= cookies.token;
           const response= await axios.get(`http://localhost:4000/medichain/patient-details`,{
               headers:{
                   'Authorization':`Bearer ${token}`
               }
           })
           setDisplayInfo(response.data.Patient.user)
          }catch(error){
            console.log(error)
          }
      }
      function groupMessagesByDoctor(messages) {
        const groupedMessages = {};
        messages.forEach(message => {
            const doctorId = message.doctorid._id; // Assuming doctorid is an object with _id field
            if (!groupedMessages[doctorId]) {
                groupedMessages[doctorId] = [];
            }
            groupedMessages[doctorId].push(message);
        });
        return groupedMessages;
    }
    return (
        <>
            <div className="containerDiv1">
                <div className="imagecontainer">
                    <img src="/Header.jpg" className="image" alt="Header" />
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
                        onClick={() => {handleTabClick('Message')
                        getAllMessages()}
                    }
                    >
                        <img src="R.png" className="imageD" alt="Message icon" />
                        Message
                    </button>
                </div>
                <div>
                    <button className={activeTab === 'Profile' ? 'active btnD' : "btnD"}
                        onClick={() => {handleTabClick('Profile') 
                        patientDetails()}}
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
                   
                    
               
                    {loading ? (
            <div className="loader">Loading...</div>
        ) : (
            <div className="appointment-container">
                <div>
                {appointment && (
                <div className="appointment-card">
                    <div className="textDiv">
                    <p className="appointment-time">Time: {new Date(appointment.time).toLocaleString('en-US', { timeZoneName: 'short', weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</p>
                        <p className="appointment-location">Location: {appointment.location}</p>
                    </div>
                </div>
                
            )}
            {secondAppointment && (
                <div className="appointment-details">
                    <div className="appointment-info">
                        <p>Name:<span  className="appointment-name">{secondAppointment.firstName} {secondAppointment.lastName}</span></p>
                        <img src={secondAppointment.image[0]} alt="Doctor" className="doctor-img" style={{ width: '100%', borderRadius: '8px' }} />
                    </div>
                </div>
            )}
                </div>
                <div className="btnDiv" >
                            <button className="message"  onClick={()=>handleOpenMessageModal(secondAppointment)}>Message</button>
                            <button className="cancel1" onClick={()=>handlecancleappointmodal(appointment)}>Cancel Appointment</button>
                        </div>
            
        </div>
        
        )}

                    </div>
                    <p>Past</p>
                    <div>
                        <div className="mainDiv1">1</div>
                        <div className="mainDiv1">2</div>
                        <div className="mainDiv1">2</div>
                    </div>
                </div>
            )}
       <div className="message-platform">
        {activeTab === 'Message' && (
            <>
                {findMessage && findMessage.findMessage && findMessage.findMessage.length > 0 ? (
                    Object.entries(groupMessagesByDoctor(findMessage.findMessage)).map(([doctorId, messages]) => (
                        <div key={doctorId} className="doctor-container">
                            {/* <div className="doctor-info">
                                <img src={messages[0].doctorid.image[0]} alt="Doctor Avatar" />
                                <h2 className="doctor-name">Dr. {messages[0].doctorid.firstName} {messages[0].doctorid.lastName}</h2>
                            </div> */}
                            <div className={`messages`}>
                            {messages.map((message, index) => (
                                <div key={index} className="message-container">
                                    <div className="message-content">
                                        <p className="message-text">{message.message}</p>
                                        <h2 className="doctor-name">Dr. {messages[0].doctorid.firstName} {messages[0].doctorid.lastName}</h2>
                                        <p className="message-meta">
                                            <span className="message-time">{message.time}</span>
                                        </p>
                                        <div className="textarea-button-container">
                                            <textarea className="textarea-like-input" rows="4"></textarea>
                                            <button className="send-button">Send</button>
                                        </div>
                                    </div>
                                    <div className="message-avatar">
                                        <img src={message.doctorid.image[0]} alt="Doctor Avatar" />
                                    </div>
                                </div>
                            ))}

                            </div>
                        </div>
                    ))
                ) : (
                    <p>No messages found</p>
                )}
            </>
        )}
    </div>
   

    {activeTab === 'Profile' && (
    <div className="ProfileDiv">
        {displayInfo && (
            <div className="profile-container">
                <div className="profile-picture">
                    <img src={displayInfo.profilePictureUrl || "/defaultProfilePicture.png"} alt="Profile" />
                    <div className="profile-picture-overlay">
                        <label htmlFor="upload" className="upload-label">{displayInfo.profilePictureUrl ? 'Change Picture' : 'Upload Picture'}</label>
                        <input type="file" id="upload" className="upload-input" accept="image/*"  />
                        {displayInfo.profilePictureUrl && <button className="delete-button" onClick={handleDeletePicture}>Delete Picture</button>}
                    </div>
                </div>
                <div className="profile-details">
                    <h2>{displayInfo.firstName} {displayInfo.lastName}</h2>
                    <p>Email: {displayInfo.email}</p>
                    <p>Age: {displayInfo.age}</p>
                    <p>Gender: {displayInfo.gender}</p>
                    <p>Birthday: <input type="date" /></p>
                </div>
                <button className="logout-button" onClick={handleLogout}>Log Out</button>
            </div>
        )}
    </div>
)}

            
            <Modal 
  isOpen={cancelappointmentModel}
  onRequestClose={handlecancleappointmodalclose}
  contentLabel="Cancel Appointment Modal"
  ariaHideApp={false}
>
{successMessage ? (
  <div className="success-message">Appointment successfully cancelled!</div>
) : (
  <div className="cancel-modal">
    <h1 className="cancel-modal-title">Cancel Appointment</h1>
    <p className="cancel-modal-text">Are you sure you want to cancel this appointment?</p>
    <div className="cancel-modal-buttons">
      <button className="cancel-modal-button" onClick={handlecancleappointmodalclose}>No</button>
      <button className="cancel-modal-button-confirm" onClick={handleCancelAppointment}>Yes</button>
    </div>
  </div>
)}

 
</Modal>

    <Modal
      isOpen={messageModal}
      onRequestClose={handleCloseMessageModal}
      contentLabel="Message"
      ariaHideApp={false}
      className="message-modal" // Add a class name for styling
    >
      <h2>Send a Message</h2>
      {/* Conditionally render textarea or success message */}
      {successMessage ? (
        <div className="success-message">Message sent successfully!</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={handleMessageChange}
            placeholder="Type your message here..."
            rows={6}
            cols={40}
            required
            className="message-input" // Add a class name for styling
          />
          <button type="submit" className="send-button">Send</button> {/* Add a class name for styling */}
        </form>
      )}
    </Modal>
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
            <h2 style={{ fontWeight: 'bold', marginBottom: '10px',color:'#0F4C5C', textTransform: 'capitalize', fontSize:'60px', }}>
                {selectedDoctor.firstName} {selectedDoctor.lastName}
            </h2>
            <img
                src={selectedDoctor.image[0]}
                alt="Doctor"
                style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '20px',  }}
            />
            <div style={{ textAlign: 'left' ,fontSize:"16px" }}>
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
        Close 
    </button>
</Modal>

        </>
    )
}

export default DashBoard;
