import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import '../style.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class Trip extends React.Component{

    deleteHandler = () => {
        this.props.deleteHandler(this.props.trip)
    }

    
    render(){
        return(
            <>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.props.trip.cover_photo} />
                    <Card.Body>
                    <Card.Title>{this.props.trip.caption}</Card.Title>
                    <NavLink to={`/trips/${this.props.trip.id}`}>
                        <Button variant="primary">Map</Button>
                        <Button onClick={this.deleteHandler} variant="primary">Delete Trip</Button>
                    </NavLink>
                    </Card.Body>
                </Card>
                {/* <div className="card">
                    <NavLink to={`/trips/${this.props.trip.id}`}>
                    <img className="card-img" src={this.props.trip.cover_photo} alt="" />
                    </NavLink>
                    <h3 className="card-text">{this.props.trip.caption}</h3>
                    <button onClick={this.deleteHandler}>X</button>
                    <br></br>
                </div> */}
            </>
            )
    }
}


export default withRouter(Trip)
