import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { fetchDoctors } from "../../actions/doctorsActions";


class DoctorsList extends React.Component {

  componentWillMount() {
    this.props.fetchDoctors();
  }

  render() {
    const { doctors } = this.props;
    console.log(doctors);

    const mappedDoctors = doctors.map(function(doctor, index) {
      return (
        <div key={index} className="card" style={{width: 20 + 'rem'}}>
          <img className="card-img-top" src={doctor.profile.image_url} alt={"Dr. " + doctor.profile.first_name + ' ' + doctor.profile.last_name} />
          <div className="card-block">
            <h4 className="card-title"><strong>{doctor.profile.first_name} {doctor.profile.last_name}</strong> {doctor.profile.title}</h4>
            <p className="card-text">{doctor.profile.bio}</p>
            <a href="#" className="btn btn-primary">More Details</a>
          </div>
        </div>
      );
    });


    if (!doctors.length) {
      return (
        <div>
          <button onClick={this.props.fetchDoctors} className="btn btn-primary btn-lg">Get Doctors</button>
        </div>
      );
    }


    return (
      <div>
        <div>{mappedDoctors}</div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    doctors: state.doctors.doctors
  }
}

export default connect(mapStateToProps, { fetchDoctors })(DoctorsList);
