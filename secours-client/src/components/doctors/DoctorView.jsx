import React from 'react';


const DoctorView = ({ match, data }) => {

    const doctor = data.find(p => p.uid === match.params.doctorUid);

    let doctorData;

    if (doctor) {
      doctorData =
        <div>
          <img src={doctor.profile.image_url} alt={"Dr." + doctor.profile.first_name + " " + doctor.profile.last_name} />
          <h5 className="mb-1">{doctor.profile.first_name} {doctor.profile.last_name}</h5>
        </div>;
    } else {
      doctorData = <p>Loading...</p>;
      }
      return (
        <div>
          {doctorData}
        </div>
      )
  }

  export default DoctorView;
