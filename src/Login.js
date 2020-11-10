import React from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import './style.css'

class Login extends React.Component{

    state = {
        username: "",
        password: ""
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.props.loginHandler(this.state)
    }

    // componentDidMount() {
    //     this.props.clearLogin()
    // }

    render(){
        return(
            <div className="login">
                <h1>I Tripped!</h1>
                <div className="login-form">
                    <form onSubmit={this.submitHandler}>
                        <div className="textbox">
                         <i className="fas fa-user"></i>   
                        <input type="text" name="username" value={this.state.username} onChange={this.changeHandler} placeholder="Username"></input>
                        </div>
                        <div className="textbox">
                        <i class="fas fa-key"></i>
                        <input type="password" name="password" value={this.state.password} onChange={this.changeHandler} placeholder="Password"></input>
                        </div>
                        <input type="submit" value="Log In"/>
                    </form>
                </div>
                <p>New to this page?
                    <NavLink to="/signup">
                     <button onClick={this.props.signUpHandler}>Sign Up</button>
                    </NavLink>
                </p>
            </div>
        )
    }

}

export default withRouter(Login)