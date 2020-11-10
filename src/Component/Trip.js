import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import './TripCard.css'

class Trip extends React.Component{

    // deleteHandler = () => {
    //     this.props.deleteHandler(this.props.trip)
    // }

    deleteHandler = () => {
        let id = window.location.pathname.split('/')[2]
        fetch(`http://localhost:3000/api/v1/trips/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }       
         })
        .then(resp => resp.json())
        .then(data => {
            if(data.success){
                this.props.history.push("/trips")
            } else {
                console.log(data.error)
            }
        })
    }

    
    render(){
        return(
            <>
                <div className="cards_item">
                    <h3 className="cards_item_text">{this.props.trip.caption}</h3>
                    <NavLink to={`/trips/${this.props.trip.id}`}>
                    <img className="cards_item_img" src={this.props.trip.cover_photo} alt="" />
                    </NavLink>
                    <button onClick={this.deleteHandler}>X</button>
                    <br></br>
                </div>
            </>
            )
    }
}


export default withRouter(Trip)
