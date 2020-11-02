import React from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
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
    isLoggedIn: false
  } 

  // setUser = inputUser => {
  //   this.setState({user: inputUser})
  // }

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
      this.setState({user: data.user, isLoggedIn: true})
      console.log(this.state)
    })
    .then(this.props.history.push('/dashboard'))
    .catch(console.log)
  }

  logoutHandler = () => {
    localStorage.removeItem('token')
    this.setState({ user: {} })
    this.props.history.push('/login')
  }

  clearLogin = () => {
    localStorage.removeItem('token')
    this.setState({ user: {} })
  }

  render() {
    return (
      <div>
        <Switch>
        {this.state.isLoggedIn ? (
             <Route path="/dashboard" render={() => <Dashboard user={this.state.user}  />
            } />
              ) : (
          <Route path="/login" render={() => <Login loginHandler={this.loginHandler} clearLogin={this.clearLogin} logoutHandler={this.logoutHandler}/>
          } />
              )})
        </Switch>
      </div>
      );
    }
  }


export default withRouter(App)
