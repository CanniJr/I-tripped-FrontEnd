import React from 'react'

class Signup extends React.Component{
    state ={

    }

    render(){

        return(
            <div className="signup">
                <div className="signup-form">
                    <form >
                        <label>Username:</label>
                        <input type="text" name="username" value={this.state.username} onChange={this.changeHandler} ></input>
                        <label>Password:</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.changeHandler}></input>
                        <input />
                        <input type="submit" value="Log In"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default Signup