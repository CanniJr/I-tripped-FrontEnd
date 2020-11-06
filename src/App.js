import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Dashboard from './Dashboard'
import NavBar from './Component/NavBar'
import TripList from './Container/TripList'
import Home from './Home'



// users endpoint : http://localhost:4000/api/v1/users
// trips endpoint : http://localhost:4000/api/v1/trips
// places endpoint : http://localhost:4000/api/v1/places


class App extends React.Component{

  state = {
    user: null,
    isLoggedIn: false
  } 


  loginHandler = (loginInput) => {
    fetch('http://localhost:3000/api/v1/login/', {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({ user: loginInput
      })
    })
    .then(resp => resp.json())
    .then(data => {
      localStorage.setItem("token", data.jwt);
      this.setState({user: data.user, isLoggedIn: true}, 
        () => this.props.history.push("/dashboard"))
    })
    .catch(console.log)
  }

  signUpHandler = (userData) => {
    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({ user: userData })
    })
    .then(resp => resp.json())
    .then(newUser => {
      localStorage.setItem("token", newUser.jwt);
      this.setState({ user: newUser.user})
    })
    .then(this.props.history.push('/dashboard'))
    .catch(console.log)
  }
  

  logoutHandler = () => {
    localStorage.removeItem("token")
    this.setState({ user: null })
    this.props.history.push("/login")
  }


  render() {
    return (
      <>
        <NavBar user={this.state.user} logoutHandler={this.logoutHandler} />
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/dashboard" render={() => <Dashboard user={this.state.user} logoutHandler={this.logoutHandler}/> }/>
            <Route path="/login" render={() => <Login loginHandler={this.loginHandler} /> }/>
            <Route path="/signup" render={() => <Signup signUpHandler={this.signUpHandler}/> } />
            <Route path="/trips" render={() => <TripList user={this.state.user}/>}/>
        </Switch>
      </>
      );
    }
  }


export default withRouter(App)
