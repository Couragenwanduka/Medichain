const Profile=()=>{
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
        </>
    )
}

export default Profile;