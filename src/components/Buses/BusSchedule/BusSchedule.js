import React, {Component} from 'react';
import Loader from 'react-loader-spinner';
import Api from '../../../api/api';
import './BusSchedule.scss';
import ScheduleTable from './ScheduleTable';

const API = new Api();
class BusSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            station: null,
            line: null,
            schedules: [],
            isTimetableLoadingActive: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.station && nextProps.station.id && (!this.props.station || this.props.station.id !== nextProps.station.id)) {
            this.loadStation(nextProps.station.id);
        }
    }

    loadStation(id) {
        API.getBusStationById(id)
            .then(response => {
                let station = response.data;
                if (!!station.lines.length) {
                    this.setActiveLine(station.lines[0]);
                }
                this.setState({
                    station: station
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    loadTimetable(line, station) {
        if (!line || !station) {
            return false;
        }

        this.setState({
            isTimetableLoadingActive: true
        });

        API.getTimetable(line.id, station.id)
            .then(response => {
                let timetable = response.data.timetable.routes[0];
                timetable.schedules.forEach(schedule => {
                    schedule.groupedJourney = this._groupJourneyByHours(schedule.knownJourneys);
                });
                this.setState({
                    schedule: timetable.schedules[0],
                    isTimetableLoadingActive: false
                });
            })
            .catch(error => {
                this.setState({
                    isTimetableLoadingActive: false
                });
            })
    }

    _groupJourneyByHours(journey) {
        let groupedJourney = {};
        journey.forEach(journeyItem => {
            if (!groupedJourney[journeyItem.hour]) {
                groupedJourney[journeyItem.hour] = [];
            }
            groupedJourney[journeyItem.hour].push(journeyItem.minute);
        });

        return groupedJourney;
    }

    setActiveLine(line) {
        this.setState({
            line: line
        });
        this.loadTimetable(line, this.state.station);
    }

    isLineActive(line) {
        return !!this.state.line && line.id === this.state.line.id;
    }

    onLineClicked(line) {
        if (!this.isLineActive(line)) {
            this.setActiveLine(line);
        }
    }

    renderLinesItems() {
        return this.state.station.lines.map(line => {
            return <li className={this.isLineActive(line) ? 'active' : ''} key={line.id} onClick={this.onLineClicked.bind(this, line)}>{line.name}</li>
        })
    }

    render() {
        return (
            <div className="BusSchedule">
                {!this.state.station && (
                    <div className="placeholder">
                        <span>No station selected</span>
                    </div>
                )}
                {this.state.station && (
                    <div className="schedule">
                        <div className="name">{this.state.station.commonName}</div>
                        <div className="wrapper-lines">
                            {!!this.state.station.lines.length ? 'Lines Available:' : 'No Lines Available'}
                            {!!this.state.station.lines.length && (
                                <ul className="lines">
                                    {this.renderLinesItems()}
                                </ul>
                            )}
                        </div>
                        {this.state.schedule && !this.state.isTimetableLoadingActive && (
                            <ScheduleTable schedule = {this.state.schedule} isLoading = {this.state.isTimetableLoadingActive}/>
                        )}

                        {!this.state.schedule && !this.state.isTimetableLoadingActive && (
                             <div className="placeholder">
                                <span>No Timetable</span>
                            </div>
                        )}

                        {this.state.isTimetableLoadingActive && (
                            <Loader 
                            type="ThreeDots"
                            color="#343a40"
                            height="50"	
                            width="50"/>
                        )}
                    </div>
                )}
            </div>
        )
    }
}

export default BusSchedule;