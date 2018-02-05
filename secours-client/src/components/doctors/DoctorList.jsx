import React from "react";
import { Link, Route } from 'react-router-dom';

import DoctorItem from './DoctorItem';
import DoctorView from './DoctorView';


class DoctorList extends React.Component {
  render() {
    const { doctors, match } = this.props;
    const linkList = doctors.map((doctor, index) => {
      return (
        <DoctorItem doctor={doctor} match={match} key={index} />
      );
    });


    return (
      <div>
        <h3>DoctorList</h3>
        <ul>{linkList}</ul>
        <Route path={`${match.url}/:name`}
          render={ (props) => <DoctorView data= {this.props.doctors} {...props} />}
          />
        </div>
      );
    }
  }

  export default DoctorList;
