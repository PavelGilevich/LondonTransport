import React, {Component} from 'react';
import BusStationLines from './BusStationLines';
import './BusStationItem.scss';

class BusStationItem extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.stationClicked();
    }

    render() {
        const stationName = this.props.station ? this.props.station.commonName : '';
        const stationLetter = this.props.station && this.props.station.stopLetter ? this.props.station.stopLetter : '';
        const lines = this.props.station ? this.props.station.lines : [];
        return (
            <div className="BusStationItem">
                <div className="stop-icon">
                    <span className="icon">{stationLetter}</span>
                </div>
                <div className="info" onClick={this.handleClick}>
                    <span className="title">{stationName || 'No title'}</span>
                    <BusStationLines lines={lines}/>
                </div>
                <button>></button>
            </div>
        );
    }
}

export default BusStationItem;