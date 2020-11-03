import React from 'react'
import TripList from './Container/TripList'
import { withRouter } from 'react-router-dom'

class Dashboard extends React.Component{
   

    // handleLogout = (e) => {
    //     console.log(this.props)
    //     e.preventDefault();
    //     this.props.setUser(null);
    //     this.props.history.push("/login");
    // };

    
    
    render(){
        return(
    <div className="user-card">
        <h1>Welcome {this.props.user.username}</h1>
        <img src={this.props.user.avatar} alt={this.props.user.username} />
        <button onClick={this.props.logoutHandler}>Log Out</button>
        <div className="trip-list">
            <h1>Your trips:</h1>
            <TripList user={this.props.user} />
        </div>
    </div>

        )
    }

}

export default withRouter(Dashboard)