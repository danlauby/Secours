import React, { Component } from "react";
import PropTypes from 'prop-types';
import { List, AutoSizer } from "react-virtualized";

import DoctorItem from './DoctorItem';


class DoctorList extends Component {

  renderRow = ({ index, isScrolling, key, style}) => {
    const { doctors } = this.props;
    const listStyle = {
      width: '25px',
      borderRadius: '50%',
      marginRight: '5px'
    };
    return (
      <div key={key} style={style}>
        <DoctorItem doctors={doctors} index={index} listStyle={listStyle} />
      </div>
    )
  }
  render() {
    return (
      <AutoSizer>
      {
        ({ width, height }) => {
          return <List
            rowCount={this.props.doctors.length}
            width={width}
            height={height}
            rowHeight={100}
            rowRenderer={this.renderRow}
          />
        }
      }
      </AutoSizer>
    );
  }
}

DoctorList.propTypes = {
  doctors: PropTypes.array.isRequired
}

export default DoctorList;
