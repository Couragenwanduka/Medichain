const APPOINTMENT=()=>{
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
            <button className="btnD">
                <img src="D.png" className="imageD" alt="Dashboard icon" />
                DashBoard
            </button>

                
            </div>
            <div>
               
                <button className="btnD">
                <img src="A.png" className="imageD"/>
                    Appointment</button>
            </div>
            <div>
                 
                <button className="btnD">
                <img src="R.png" className="imageD"/>
                    Message</button>
                
            </div>
            <div>
                
                <button className="btnD">
                <img src="person.png" className="imageD"/>
                    Profile</button>
                
            </div>
        </aside>
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
        </>
    )
}

export default APPOINTMENT;