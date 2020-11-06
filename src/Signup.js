import React from 'react'
import { NavLink } from 'react-router-dom'

class Signup extends React.Component{
    state ={
        username: "",
        password: "",
        password_confirmation: ""
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.signUpHandler(this.state)
    }

    render(){

        return(
            <div className="signup">
                <div className="signup-form">
                    <form onSubmit={this.submitHandler}>
                        <label>Username:</label>
                        <input type="text" name="username" value={this.state.username} onChange={this.changeHandler} ></input><br></br>
                        <label>Password:</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.changeHandler}></input><br></br>
                        <label>Confirm Password:</label>
                        <input type="password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.changeHandler}></input><br></br>
                        <input type="submit" value="Sign Up"/>
                    </form>
                    <p>Already Signed up?
                        <NavLink to="/login">
                        <button>Log In</button>
                        </NavLink>
                    </p>
                </div>
            </div>
        )
    }
}

export default Signup