import React from 'react'
import Trip from '../Component/Trip'

class TripList extends React.Component {

    state = {
        trips: []
     }

    componentDidMount(){
        fetch("http://localhost:3000/api/v1/trips/", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-type': 'application/json',
                accepts: 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => {
            this.setState({ trips: data })
        })
    }

    renderTrips = () => {
        return this.state.trips.map(tripObj => <Trip key={tripObj.id} trip={tripObj}/>)
    }

    render(){
        return(
        <div>
            {this.renderTrips()}
        </div>
        )}
}

export default TripList