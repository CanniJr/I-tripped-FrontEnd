import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Dashboard from './Dashboard'
import TripList from './Container/TripList'
// import Home from './Home'



// users endpoint : http://localhost:4000/api/v1/users
// trips endpoint : http://localhost:4000/api/v1/trips
// places endpoint : http://localhost:4000/api/v1/places


class App extends React.Component{

  state = {
    user: "",
    signUp: false
  } 

  setUser = inputUser => {
    this.setState({user: inputUser})
  }

  loginHandler = (loginInput) => {
    fetch('http://localhost:3000/api/v1/login/', {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({ user: loginInput
      })
    })
    .then(resp => resp.json())
    .then(data => {
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("userId", data.user.id);
      this.setState({user: data.user})
      this.props.history.push('/dashboard')
    })
  }

  render() {
    return (
      <Router>
        <Switch>
        {this.state.user === "" ? (
          <Route path="/login" render={() => {
            return (
              <div>
                <Login user={this.state.user} setUser={this.setUser} loginHandler={this.loginHandler} />
              </div>
            )
          }} />
        ) : (
          <Route path="/dashboard" render={() => {
            return (
              <div>
                <Dashboard user={this.state.user} setUser={this.setUser} />
              </div>
            )
          }} />)}
          <Route path="/trips" component={TripList}/>
        </Switch>
      </Router>
      );
    }
  }


export default App
