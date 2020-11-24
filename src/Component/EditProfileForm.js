import React from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
                <Form className="profile-edit-form" onSubmit={this.submitHandler}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Username: </Form.Label>
                        <Form.Control type="text" name="username" value={this.state.username} onChange={this.changeHandler} placeholder={this.props.user.username} /><br></br>
                    </Form.Group>
                        <label>Profile Photo:</label>
                        <div className="preview-img">
                            {this.state.avatar ? <img src={this.state.avatar} alt=""></img>: null}
                        </div><br></br>
                    <Form.Group>
                        <Form.Label>Photo Url : </Form.Label>
                        <Form.Control type="text" name="avatar" value={this.state.avatar} onChange={this.changeHandler}/><br></br>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>bio: </Form.Label>
                        <Form.Control type="textarea" name="bio" value={this.state.bio} onChange={this.changeHandler} placeholder={this.props.user.bio}/><br></br>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Age: </Form.Label>
                        <Form.Control type="number" name="age" value={this.state.age} onChange={this.changeHandler} placeholder={this.props.user.age}/><br></br>
                    </Form.Group>
                        <Button type="submit">Save Update</Button>
                </Form>
                <Button onClick={this.toDashboard}>Cancel edit</Button>
            </div>
        )
    }
}

export default withRouter(EditProfileForm)