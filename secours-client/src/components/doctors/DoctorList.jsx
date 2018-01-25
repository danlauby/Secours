import React from "react";
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';

// import Button from '../Button';
// import DoctorItem from './DoctorItem';
import DoctorView from './DoctorView';


class DoctorList extends React.Component {

  componentDidMount() {
    this.props.fetchDoctors();
  }

  render() {
    const { doctors, match } = this.props;
    var linkList = doctors.map((doctor, index) => {
      return(
        <li key={index}>
          <Link to={{pathname: `${match.url}/${doctor.uid}`, query: { uid: doctor.uid }}}>
            {doctor.profile.first_name} {doctor.profile.last_name}
          </Link>
        </li>
      )
    });

    return(
      <div>
        <div>
            <h3> DoctorsList</h3>
            <ul> {linkList} </ul>
        </div>

        <Route path={`${match.url}/:doctorUid`}
            render={ (props) => <DoctorView data= {this.props.doctors} {...props} />}/>
        <Route exact path={match.url}
          render={() => (
            <div>
              Please select a doctor
            </div>
          )}
          />
      </div>
    );
  }
}

DoctorList.propTypes = {
  fetchDoctors: PropTypes.func.isRequired
}

export default DoctorList;
