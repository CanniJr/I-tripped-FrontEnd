import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Dashboard from './Dashboard'
import NavBar from './Component/NavBar'
import TripList from './Container/TripList'
import Home from './Home'
import EditProfileForm from './Component/EditProfileForm'


class App extends React.Component{

  state = {
    user: null,
    isLoggedIn: false
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

  profileEditHandler = (userData) => {
    console.log(userData)
    let id = userData.id
    fetch(`http://localhost:3000/api/v1/users/${id}`, {
      method: 'PATCH',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({ user: userData })
    })
    .then(resp => resp.json())
    .then(editedUser => {
      this.setState({ user: editedUser.user })
    })
    .then(this.props.history.push('/dashboard'))
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
      <div className='main'>
        <NavBar user={this.state.user} logoutHandler={this.logoutHandler} />
        <Switch>
            <Route path="/dashboard" render={() => <Dashboard user={this.state.user} logoutHandler={this.logoutHandler}/> }/>
            <Route path="/login" render={() => <Login loginHandler={this.loginHandler} /> }/>
            <Route path="/signup" render={() => <Signup signUpHandler={this.signUpHandler}/> } />
            <Route path="/trips" render={() => <TripList user={this.state.user}/>}/>
            <Route path="/profile_edit" render={() => <EditProfileForm user={this.state.user} profileEditHandler={this.profileEditHandler}/>}/>
            <Route path="/" component={Home}/>
        </Switch>
      </div>
      );
    }
  }


export default withRouter(App)
