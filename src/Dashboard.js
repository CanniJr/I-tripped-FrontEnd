import React from 'react'
import TripList from './Container/TripList'
import { withRouter, NavLink } from 'react-router-dom'

class Dashboard extends React.Component{
    
    state = {
        user: {}
    }

//      componentDidMount() {
//     const token = localStorage.getItem("token")
//     if (token){
//     fetch("https://localhost:3000/api/v1/profile", {
//       method: "GET",
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then(resp => resp.json())
//     .then(data => this.setState({ user: data.user}))
//     } else {
//       this.props.history.push("/login")
//     }
//   }
    
    render(){
        console.log(this.props)
        return(
    <div className="user-card">
        <h1>Welcome, {this.props.user.username}!</h1>
        <img src={this.props.user.avatar} alt={this.props.user.username} />
        <button onClick={this.props.logoutHandler}>Log Out</button>
        <div className="trip-list">
            <NavLink to="/dashboard/trips" >
                <h1>My trips:</h1>
            </NavLink>

            <TripList user={this.props.user} />
        </div>
    </div>

        )
    }

}

export default withRouter(Dashboard)