import React from 'react'
import { Route, withRouter, NavLink, Redirect } from 'react-router-dom'

class Dashboard extends React.Component{
    
    state = {
        user: null
    }

    componentDidMount() {
    const token = localStorage.getItem("token")
    if (token){
    fetch("http://localhost:3000/api/v1/profile", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}`},
    })
    .then(resp => resp.json())
    .then(data => 
      this.setState({ user: data.user}))
    } else {
      this.props.history.push("/login")
    }
  }
    
    render(){
        return(
            <>
            {this.props.user ? 
                <>
                    {this.state.user === null ? <h1>Loading</h1> : 
                    <div className="user-card">
                        <h1>Welcome, {this.props.user.username}!</h1>
                        <p>{this.props.user.bio}</p>
                        <img src={this.props.user.avatar} alt={this.props.user.username} />
                        <button onClick={this.props.logoutHandler}>Log Out</button>
                        <div className="trip-list">
                            <NavLink to="/trips" >
                                <h3>My trips</h3>
                            </NavLink>
                            <NavLink to="/profile_edit">
                                <h3>Edit Profile</h3>
                            </NavLink>
                        </div>
                    </div>
                    }
                </>
            : 
            <Redirect to="/login" />
        }
            </>

        )
    }

}

export default withRouter(Dashboard)