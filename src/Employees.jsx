import React, { Component } from 'react';
import './App.css';
import { FixedSizeList as List } from "react-window";

import { WindowScroller } from "react-virtualized";
class Employees extends Component {
  constructor(props) { 
    super();

    var searchText = props.searchText;
    this.lcSearchText=searchText.toLowerCase();
 
  }
    handleListRef = component => {
    this.list = component;
  };

  handleScroll = ({ scrollTop }) => {
    if (this.list) {
      this.list.scrollTo(scrollTop);
    }
  };
  render() {
    const renderRow = ({ index, style })  => {
      return (
        <div style={style} className="person">
           <span >{this.props.employees[index].firstName} {this.props.employees[index].lastName}</span>
        </div>
      );
    }

    return (
      <div className="people">
          <WindowScroller onScroll={this.handleScroll}>
          {() => <div />}
        </WindowScroller>
     
        <List
            ref={this.handleListRef}
            height={1000}
            width={300}
            itemSize={50}
            itemCount={this.props.employees.length}
            className="window-scroller-override"
          >
            {renderRow}
          </List>
       
      </div>
    );
  }
}

export default Employees;
