import React from 'react'
import { withRouter } from 'react-router-dom'

class Dashboard extends React.Component{
   
    handleLogout = (e) => {
        console.log(this.props)
        e.preventDefault();
        this.props.setUser(null);
        this.props.history.push("/login");
    };

    componentDidMount(){
        fetch("http://localhost:3000/api/v1/trips/")
        .then(resp => resp.json())
        .then(data => console.log(data))
    }

    render(){
        return(
    <div className="user-card">
        <h1>Welcome {this.props.user.username}</h1>
        <img src={this.props.user.avatar} alt={this.props.user.username} />
        <button onClick={this.handleLogout}>Log Out</button>
        <div className="trip-list">
            <h1>Your trips:</h1>
        </div>
    </div>

        )
    }

}

export default withRouter(Dashboard)