import React from 'react'
import { withRouter } from 'react-router-dom'

class EditTripForm extends React.Component{
    
    state = {
        caption: this.props.trip.caption,
        cover_photo: `${this.props.trip.cover_photo}`,
        id: this.props.trip.id
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
                    <label>caption: </label>
                    <input type="text" name="username" value={this.state.caption} onChange={this.changeHandler} placeholder={this.props.trip.caption} /><br></br>
                    <label>Cover Photo:</label>
                    <div className="preview-img">
                        {this.state.cover_photo ? <img src={this.state.cover_photo} alt=""></img>: null}
                    </div><br></br>
                    <label>Photo Url : </label>
                    <input type="text" name="avatar" value={this.state.cover_photo} onChange={this.changeHandler}/><br></br>
                    <input type="submit" value="Save Update" />
                </form>
                <button onClick={this.toDashboard}>Cancel edit</button>
            </div>
        )
    }
}

export default withRouter(EditTripForm)