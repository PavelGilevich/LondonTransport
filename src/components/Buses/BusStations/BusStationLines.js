import React, {Component} from 'react';
import './BusStationLines.scss';

class BusStationTitle extends Component {
    renderLines() {
        return this.props.lines.map(line => {
            return <li key={line.id}>{line.name}</li>;
        })
    }
    render() {
        const lines = this.renderLines();
        return (
            <div className="BusStationLines">
                <ul className="lines">
                    {lines}
                </ul>
            </div>
        )
    }
}

export default BusStationTitle;