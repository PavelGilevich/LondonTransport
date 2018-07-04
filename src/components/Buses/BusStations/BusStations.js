import React, {Component} from 'react';
import BusStationItem from './BusStationItem';
import './BusStations.scss';

class BusStations extends Component {
    stationClicked(station) {
        this.props.onStationClicked(station);
    }

    render() {
        const stations = this.props.stations.map(station => {
            return <li key={station.id}><BusStationItem station={station} stationClicked={this.stationClicked.bind(this, station)}/></li>
        })
        return (
            <div className="BusStations">
                <ul className="stations">
                    {stations}
                </ul>
            </div>
        )
    }
}

export default BusStations;