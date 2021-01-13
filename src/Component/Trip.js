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
            <div>
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
            </div>
            )
    }
}


export default withRouter(Trip)
