import React from 'react'
import { NavLink } from 'react-bootstrap'

class Trip extends React.Component{

    deleteHandler = () => {
        this.props.deleteHandler(this.props.trip.id)
    }

    render(){
        return(
                <div className="trip-card">
                    <h3>Caption: {this.props.trip.caption}</h3>
                    <NavLink to={`/trips/${this.props.trip.id}`}>
                    <img src={this.props.trip.cover_photo} alt="" />
                    </NavLink>
                    <button onClick={this.deleteHandler}>X</button>
                </div>
            )
    }
}



export default Trip
