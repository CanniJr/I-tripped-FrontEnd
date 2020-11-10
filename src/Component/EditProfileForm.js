import React from 'react'
import { withRouter } from 'react-router-dom'

class EditProfileForm extends React.Component{
    
    state = {
        username: this.props.user.username,
        avatar: `${this.props.user.avatar}`,
        bio: this.props.user.bio,
        age: this.props.user.age,
        id: this.props.user.id
        }

    changeHandler = (e) => {
        e.persist()
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)
        this.props.profileEditHandler(this.state)
    }

    toDashboard = () => {
        this.props.history.push("/dashboard")
    }

    render(){
        console.log(this.state)
        return(
            <div className="profile-edit">
                <form className="profile-edit-form" onSubmit={this.submitHandler}>
                    <label>Username: </label>
                    <input type="text" name="username" value={this.state.username} onChange={this.changeHandler} placeholder={this.props.user.username} /><br></br>
                    <label>Profile Photo:</label>
                    <div className="preview-img">
                        {this.state.avatar ? <img src={this.state.avatar} alt=""></img>: null}
                    </div><br></br>
                    <label>Photo Url : </label>
                    <input type="text" name="avatar" value={this.state.avatar} onChange={this.changeHandler}/><br></br>
                    <label>Age: </label>
                    <input type="number" name="age" value={this.state.age} onChange={this.changeHandler} placeholder={this.props.user.age}/><br></br>
                    <label>bio: </label>
                    <input type="textarea" name="bio" value={this.state.bio} onChange={this.changeHandler} placeholder={this.props.user.bio}/><br></br>
                    <input type="submit" value="Save Update" />
                </form>
                <button onClick={this.toDashboard}>Cancel edit</button>
            </div>
        )
    }
}

export default withRouter(EditProfileForm)