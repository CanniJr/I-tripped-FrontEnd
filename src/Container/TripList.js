import React from 'react'
import Trip from '../Component/Trip'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import NewTripForm from '../Component/NewTripForm'

class TripList extends React.Component {

    state = {
        user: null,
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

    submitHandler = (tripObj) => {
        fetch("http://localhost:3000/api/v1/trips/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
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
        .catch(console.log)
    }

    deleteHandler = (id) => {
        fetch(`http://localhost:3000/api/v1/trips/${id}`, {
            method: "DELETE",
            headers: { 
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "content-type": "application/json",
                "Accepts": "application/json"
            }})
        .then(resp => resp.json())
        this.setState({ trips: this.state.trips.filter(trip => trip.id !== id)})
        console.log(this.state)
    }

    formHandler = () => {
        this.setState((prevState) => ({clicked: !prevState.clicked}))
    }


    renderTrips = () => {
                                                 // if user.id is not the same as trip.user.id, it will not show any trips \\
        return (this.state.trips.map(tripObj => (this.props.user.id === tripObj.user.id ? <Trip key={tripObj.id} trip={tripObj} deleteHandler={this.deleteHandler} user={this.props.user}/>
            : null ))
        )}

    render(){
        return(
            <>
             {this.props.user ? 
                <>
                {this.state.trips.length === 0 ? <h3>loading trips</h3> : 
                     <> 
                        <Switch>
                        <Route path="/trips" render={() => {
                            return(
                            <div>
                            {this.renderTrips()}
                            </div>
                            )
                        }}/>
                        </Switch>
                        <button onClick={this.formHandler}>New Trip</button>
                        {this.state.clicked ? <NewTripForm submitHandler={this.submitHandler} /> : null }
                    </>
                } 
                </>

             :
         
        <Redirect to="/login" />
     } </> )
    }
}

export default withRouter (TripList)

/* <Route path ="/dashboard/trips/:id" render={({ match }) => {
                            let id = parseInt(match.params.id)
                            let foundTrip = this.state.trips.find((trip) => trip.id === id)
                            return <Trip trip={foundTrip} deleteHandler={this.deleteHandler}/>
                        }}/> */