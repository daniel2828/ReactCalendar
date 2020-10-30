import React, { Component } from 'react';
import './App.css';
import Week from './Week.jsx';
import Columns from './Columns.jsx';
import EmployeeEventsRow from './EmployeeEventsRow.jsx';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";

import { WindowScroller } from "react-virtualized";
class GanttChart extends Component {
   handleListRef = component => {
    this.list = component;
  };

  handleScroll = ({ scrollTop }) => {
    if (this.list) {
      this.list.scrollTo(scrollTop);
    }
  };
  render() {
    var employees=this.props.employees;
    var calendar= this.props.weeklyCalendar;
    var handleOpenModal=this.props.handleOpenModal;
    const renderRow = ({ index, style })  => {
      return (
        <div  style={style}>
          {
            <EmployeeEventsRow employee={employees[index]} key={index} handleOpenModal={handleOpenModal} calendar={calendar} />
          }
           
        </div>
      );
    }
    return (
      <div className="chart">
        <div className="content">
            <Week weeklyCalendar={this.props.weeklyCalendar}></Week>
        </div>
        <Columns weeklyCalendar={this.props.weeklyCalendar} employees={this.props.employees} handleUpdate={this.props.handleUpdate}></Columns>
        <div className="rows">
            <WindowScroller onScroll={this.handleScroll}>
          {() => <div />}
        </WindowScroller>
          <List
                ref={this.handleListRef}
                height={1000}
                width={"100%"}
                itemSize={50}
                itemCount={employees.length}
                className="window-scroller-override"
              >
                {renderRow}
                  </List>
               )
        </div>
      </div>
    );
  }
}

export default GanttChart;
