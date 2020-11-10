import React from 'react'

class NewTripForm extends React.Component{

    state = {
        caption: "",
        cover_photo: "",
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.submitHandler(this.state)}

    render(){
        return(
            <form className="new-trip-form" onSubmit={this.submitHandler}>
                <h2>Create Trip</h2>
                <label>Caption</label>
                <input type="text" name="caption" value={this.state.caption} onChange={this.changeHandler}/>
                <label>Trip photo</label>
                <input type="text" name="cover_photo" value={this.state.cover_photo} onChange={this.changeHandler} />
                
                <input type="submit" value="Create Trip" />
            </form>

        )
    }


}

export default NewTripForm