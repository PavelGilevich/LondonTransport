import React, {Component} from 'react';
import Api from '../../api/api';
import BusStations from './BusStations/BusStations';
import BusSchedule from './BusSchedule/BusSchedule';
import Autocomplete from 'react-autocomplete';
import {debounce} from 'throttle-debounce';
import './Buses.scss';

const API = new Api();

class Buses extends Component {
    static get METERS_PER_DEGREE() { return 71695.8; }
    static get RADIUS() { return 200; }

    constructor(props) {
        super(props);
        this.state = {
            stations: [],
            nearbyStations: [],
            selectedStation: null,
            activeStation: null,
            filterValue: ''
        };

        this.renderAutocompleteItem = this.renderAutocompleteItem.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.setActiveStation = this.setActiveStation.bind(this);
        this.loadStations = debounce(300, this._loadStations);
    }

    setActiveStation(station) {
        this.setState({
            activeStation: station
        });
    }

    onSearchChange(e) {
        let value = e.target.value;
        this.setState({
            filterValue: value
        });
        this.loadStations(value);
    }

    onSelect(value, item) {
        this.setState({
            filterValue: value,
            selectedStation: item,
            activeStation: item
        });
        this.loadNearbyStations(item);
    }

    _loadStations(query) {
        if (!query) {
            this.setState({
                stations: []
            });
            return;
        }

        API.getBusStationsByQuery(query)
            .then(response => {
                this.setState({
                    stations: response.data.matches
                });
            })
            .catch(error => {
                console.error(error);
            })
    }

    loadNearbyStations(station) {
        if(!station) {
            return;
        }
        let borderCoords = this.calculateBorderCoordinates(station.lat, station.lon);
        API.getBusStationsByBorderCoords(borderCoords)
            .then(response => {
                this.setState({
                    nearbyStations: response.data
                });
            })
    }

    calculateBorderCoordinates(lat, lon) {
        let degreeDiff = Buses.RADIUS / Buses.METERS_PER_DEGREE;
        return {
            neLat: lat + degreeDiff,
            neLon: lon + degreeDiff,
            swLat: lat - degreeDiff,
            swLon: lon - degreeDiff
        };
    }

    renderAutocompleteItem(item, isHighlighted) {
        return <div className="row-autocomplete" key={item.id} style={{background: isHighlighted ? 'lightgray' : 'white'}}>{item.name}</div>
    }

    render() {
        return (
            <div className="Buses">
                <div className="search-block">
                    <div className="search-wrapper">
                        <div>Enter bus station name to search: </div>
                        <Autocomplete items = {this.state.stations}
                                    getItemValue = {item => item.name}
                                    renderItem = {this.renderAutocompleteItem}
                                    value = {this.state.filterValue}
                                    onChange = {this.onSearchChange}
                                    onSelect = {this.onSelect}
                                    inputProps={{ placeholder: 'Search bus station...' }}
                        />
                        {this.state.selectedStation && (
                            <div className="label">
                                Bus stations near <b>{this.state.selectedStation.name}</b>
                            </div>
                        )}
                    </div>
                    <BusStations stations={this.state.nearbyStations} onStationClicked = {this.setActiveStation}/>
                </div>
                <div className="schedule-block">
                    <BusSchedule station = {this.state.activeStation}/>
                </div>
            </div>
        )
    }
}

export default Buses;