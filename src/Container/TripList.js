import React from 'react'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Map, TileLayer, Marker, Tooltip, Polyline } from 'react-leaflet'
import Trip from '../Component/Trip'
import NewTripForm from '../Component/NewTripForm'
import '../Component/TripCard.css'
import '../App.css'



class TripList extends React.Component {

    state = {
        trips: [],
        clicked: false
     }

    componentDidMount(){
        fetch("http://localhost:3000/api/v1/trips/", {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(resp => resp.json())
        .then(data => {
            this.setState({ trips: data })
        })
    }

    submitHandler = (trip) => {
        let tripObj = {
            user_id: this.props.user.id,
            caption: trip.caption,
            cover_photo: trip.cover_photo
        }

        fetch("http://localhost:3000/api/v1/trips/", {
            method: "POST",
            headers: {
                Authorization: ` Bearer ${localStorage.getItem("token")}`,
                "content-type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify({ trip: tripObj })
        })
        .then(resp => resp.json())
        .then(newTrip => {
            let newTrips = [...this.state.trips, newTrip]
            this.setState({ trips: newTrips }, () => console.log(this.state.trips))
        })
        .then(this.props.history.push('/dashboard'))
        .catch(console.log)
    }

    deleteHandler = (tripObj) => {
        let id = tripObj.id
        fetch(`http://localhost:3000/api/v1/trips/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "content-type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify({
                trip: tripObj
            })
        })
        .then(resp => resp.json())
        this.setState({ trips: this.state.trips.filter(trip => trip.id !== id)})
        .then(this.props.history.push('/dashboard'))
        console.log(this.state)
            // if(data.success){
            //     this.props.history.push("/trips")
            // } else {
            //     console.log(data.error)
            // }
    }

    // deleteHandler = (id) => {
    //     fetch(`http://localhost:3000/api/v1/trips/${id}`, {
    //         method: "DELETE",
    //         headers: { 
    //             "Authorization": `Bearer ${localStorage.getItem("token")}`,
    //             "content-type": "application/json",
    //             "Accepts": "application/json"
    //         }})
    //     .then(resp => resp.json())
    //     this.setState({ trips: this.state.trips.filter(trip => trip.id !== id)})
    //     console.log(this.state)
    // }

    

    formHandler = () => {
        this.setState((prevState) => ({clicked: !prevState.clicked}))
    }


    renderTrips = () => {
                                                 // if user.id is not the same as trip.user.id, it will not show any trips \\
        return (this.state.trips.map(tripObj => (this.props.user.id === tripObj.user.id ? <Trip key={tripObj.id} trip={tripObj} deleteHandler={this.deleteHandler} user={this.props.user}/>
            : null ))
        )}

    render(){

        const positionCor = [[40.712776, -74.005974], [42.443962, -76.501884], [42.910450, -76.862400] ]
        const tileLayerURL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        const tileLayerAtt = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

        const redOptions = { color: 'red' }

        return(
            <div className='cards'>
                <div className="cards_container">
                    <div className="cards_wrapper">
                        <>
                        {this.props.user ? 
                            <>
                            {this.state.trips.length === 0 ? <h3>loading trips</h3> : 
                                <> 
                                    <Switch>
                                    <Route path ="/trips/:id" render={({ match }) => {
                                        let id = parseInt(match.params.id)
                                        let foundTrip = this.state.trips.find((trip) => trip.id === id)
                                        return (
                                            <>
                                                <Trip trip={foundTrip} deleteHandler={this.deleteHandler} />
                                                <Map center={positionCor[0]} zoom={6}>
                                                    <TileLayer 
                                                    url={tileLayerURL}
                                                    attribution={tileLayerAtt}
                                                    />
                                                    <Marker position={positionCor[0]} > 
                                                        <Tooltip>New York, NY</Tooltip>
                                                    </Marker>
                                                    <Marker position={positionCor[1]}>
                                                        <Tooltip>Ithaca, NY</Tooltip>
                                                    </Marker>
                                                    <Marker position={positionCor[2]}>
                                                        <Tooltip>Virginia, NY</Tooltip>
                                                    </Marker>
                                                    <Polyline pathOptions={redOptions} positions={positionCor} />
                    
                                                </Map>
                                                {/* <EditTripForm trip={foundTrip} /> */}
                                            </>
                                        )
                                    }}/>
                                    <Route path="/trips" render={() => {
                                        return(
                                            <>
                                                <h1>Trips</h1>
                                                <ul className="cards_items">
                                                {this.renderTrips()}
                                                </ul>
                                            </>
                                         )
                                        }}/>
                                    </Switch>
                                    {this.state.clicked ? <NewTripForm submitHandler={this.submitHandler} /> : null }
                                    <button onClick={this.formHandler}>New Trip</button>
                                </>
                            } 
                            </>
            
                        :
                        <Redirect to="/login" />
                        } </> 
                    </div>
                </div>
         </div>
        )
    }
}

export default withRouter (TripList)
