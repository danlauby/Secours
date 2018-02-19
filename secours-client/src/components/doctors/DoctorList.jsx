import React, { Component } from "react";
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

import DoctorItem from './DoctorItem';


class DoctorList extends Component {

  render() {
    const { doctors, fetchDoctors } = this.props;
    const linkList = doctors.map((doctor, index) => {
      return (
        <DoctorItem doctor={doctor} key={index} />
      );
    });
    return (
      <div>
        {linkList}
      </div>
    );

  }
}

DoctorList.propTypes = {
  doctors: PropTypes.array.isRequired
}

export default DoctorList;
