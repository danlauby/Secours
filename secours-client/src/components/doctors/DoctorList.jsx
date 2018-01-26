import React from "react";
import { Link, Route } from 'react-router-dom';

import DoctorItem from './DoctorItem';
import DoctorView from './DoctorView';
import DoctorSearchForm from '../../containers/doctors/DoctorSearchForm';


class DoctorList extends React.Component {
  render() {
    const { doctors, match } = this.props;
    var linkList = doctors.map((doctor, index) => {
      return (
        <DoctorItem doctor={doctor} match={match} key={index} />
      )
    });

    return (
      <div>
        <DoctorSearchForm />
        <div>
            <h3> DoctorList</h3>
            <ul> {linkList} </ul>
        </div>

        <Route path={`${match.url}/:doctorUid`}
            render={ (props) => <DoctorView data= {this.props.doctors} {...props} />}
        />
      </div>
    );
  }
}

export default DoctorList;
