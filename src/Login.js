import React from 'react'

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


    render(){
        return(
            <div className="login">
                <h1>I Tripped!</h1>
                <div className="Login-form">
                    <form onSubmit={this.submitHandler}>
                        <label>Username:</label>
                        <input type="text" name="username" value={this.state.username} onChange={this.changeHandler} ></input>
                        <label>Password:</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.changeHandler}></input>
                        <input type="submit" value="Log In"/>
                    </form>
                </div>
                <p>New to this page? <button>Sign Up</button></p>
            </div>
        )
    }

}

export default Login