import React, {Component} from 'react';
import './ScheduleTable.scss';

class ScheduleTable extends Component {
    renderRows() {
        const groupedJourney = this.props.schedule.groupedJourney;
        return Object.keys(groupedJourney).map(hour => {
            return <tr key = {hour}>
                    <td className="hours">{hour % 24}</td>
                    <td className="minutes">{this.renderMinutes(groupedJourney[hour])}</td>
                </tr>
        })
    }
    renderMinutes(items) {
        return items.map(item => {
            return <span key = {item}>{item.length === 1 ? `0${item}` : item}</span>
        });
    }

    render() {
        return (
            <div className="ScheduleTable">
                <table>
                    <thead>
                        <tr>
                            <td className="hours">Hours</td>
                            <td className="minutes">Minutes</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ScheduleTable;