import React from 'react'

function Trip(props){
    console.log(props)
    return(
        <div className="trip-card">
            <h3>Caption: {props.trip.caption}</h3>
            <img src={props.trip.cover_photo} alt="" />
        </div>
    )
}

export default Trip