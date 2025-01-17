import React from 'react'
import { Route, withRouter, NavLink, Redirect } from 'react-router-dom'
import './Dashboard.css'
// import { Map, Marker, Popup } from 'react-leaflet'

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
                    <div>
                        <div className="welcome"> 
                            <h1>Welcome, {this.props.user.username}!</h1>
                        </div>
                        <div className="user-card">
                                        {this.props.user.avatar === null ? <img src="data:image/png;base64,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"
                                                                                alt='' />                   
                                            : 
                                <img src={this.props.user.avatar} alt={this.props.user.username} />
                              }
                                <h3>{this.props.user.username}</h3>
                                <p>{this.props.user.age}</p>
                                <p>{this.props.user.email}</p>
                                <p className="bio">{this.props.user.bio}</p>
                                <div className="socials">
                                    <i className="fab fa-github"></i>
                                </div>
                                <div className="socials">
                                    <i className="fab fa-linkedin-in"></i>
                                </div>
                                <div className="socials">
                                    <i className="fas fa-envelope-square"></i>
                                </div>
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