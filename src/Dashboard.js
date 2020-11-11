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
                    <>
                        <div className="welcome"> 
                            <h1>Welcome, {this.props.user.username}!</h1>
                        </div>
                        <div className="user-card">
                            <div className="upper-container">
                                <div className="image-container">
                                    <img src={this.props.user.avatar} alt={this.props.user.username} />
                                </div>
                                <div className="lower-container">
                                    <h3>{this.props.user.username}</h3>
                                    <p>{this.props.user.age}</p>
                                    <p>{this.props.user.email}</p>
                                    <p>{this.props.user.bio}</p>
                                </div>
                                <div className="trip-list">
                                    <NavLink to="/trips" >
                                        <h3>My trips</h3>
                                    </NavLink>
                                    <NavLink to="/profile_edit">
                                        <h3>Edit Profile</h3>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </>
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