import React, { Component } from 'react';
import moment from 'moment';
import './App.css';
class EmployeeEventsRow extends Component {
  getStyleForEvent (event,calendar){

    const columnWidth=57.14;
    const from=moment(event.from);
    const to=moment(event.to);
    var diff=to.diff(from, 'days');
    if (diff===0) diff=1;
    const awesomeWidth=(diff*columnWidth).toFixed(2)+'px';
    const firstDay=calendar.getFirstDay();
    const diffFirstDay=from.diff(firstDay,'days');
    const awesomeLeft=(diffFirstDay*columnWidth).toFixed(2)+'px';

    return {
      left:awesomeLeft,
      width:awesomeWidth
    }
  }

  render() {
    const employeeEvents=this.props.employee.events;
    //console.log("this.props",this.props);
    const calendar=this.props.calendar;
    const handleOpenModal=this.props.handleOpenModal;
    var printEvents=[];
    var printDays=[];

    for (const i=0;i<35;i++){
      printDays.push(
        <div className="day-element" key={i}>
          <div className="add-shift js-add-shift" onClick={handleOpenModal}>+</div>
        </div>
      )
    }
    const currentEvents=[];
    employeeEvents.forEach(function(event,i){
      const fromDate=moment(event.from);
      const firstDayOfCurrentCalendar=calendar.getFirstDay();
      const lastDayOfCurrentCalendar=calendar.getLastDay();
      if (fromDate.isBetween(firstDayOfCurrentCalendar, lastDayOfCurrentCalendar)){
        currentEvents.push(event);
      }
    })
    const that=this;
    currentEvents.forEach(function(event,i){
      printEvents.push(
        <div className="event bright-green" key={i} style={that.getStyleForEvent(event,calendar)}>
        </div>
      )
    })

    return (
      <div className="cat-row single" key={this.props.employee.firstName}>
        {printDays}
        {printEvents}
      </div>
    );
  }
}

export default EmployeeEventsRow;
