import React from 'react'

function Dashboard(props){
   
    function handleLogout(e){
        console.log(props)
        e.preventDefault();
        props.setUser(null);
        props.history.push("/login");
    };

    return(
      <div className="user-card">
          <h1>Welcome {props.user.username}</h1>
          <img src={props.user.avatar} alt={props.user.username} />
          <button onClick={handleLogout}>Log Out</button>
      </div>

    )
}

export default Dashboard