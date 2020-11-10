import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import '../style.css'

class Trip extends React.Component{

    deleteHandler = () => {
        this.props.deleteHandler(this.props.trip.id)
    }

    
    render(){
        return(
            <>
                <div className="card">
                    <NavLink to={`/trips/${this.props.trip.id}`}>
                    <img className="card-img" src={this.props.trip.cover_photo} alt="" />
                    </NavLink>
                    <h3 className="card-text">{this.props.trip.caption}</h3>
                    <button onClick={this.deleteHandler}>X</button>
                    <br></br>
                </div>
            </>
            )
    }
}


export default withRouter(Trip)
