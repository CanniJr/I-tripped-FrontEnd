import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login'


// users endpoint : http://localhost:4000/api/v1/users
// trips endpoint : http://localhost:4000/api/v1/trips
// places endpoint : http://localhost:4000/api/v1/places


class App extends React.Component{

  // componentDidMount(){
  //   fetch('http://localhost:4000/api/v1/users')
  //   .then(resp => resp.json())
  //   .then(data => console.log(data))
  // }

  homePage = () => {
    return (
      <h1>this is the homepage!</h1>
    )
  }


  render() {
    return (
      <Router>
      <div>
        <Route exact path ="/" component={this.homePage} />
        <Route exact path="/login" component={Login} />
      </div>
      </Router>
      );
    }
  }


export default App
