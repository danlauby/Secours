import React from 'react';


const DoctorView = ({ match, data }) => {

    const doctor = data.find(p => p.uid === match.params.doctorUid);

    let doctorData;

    if (doctor) {
      const mappedSpecialties = Object.entries(doctor.specialties).map(([index, specialty]) => {
        return <li key={index} id={index}>{specialty.description}</li>;
        });
      doctorData =
        <div>
          <h5 className="mb-1"><strong>{doctor.profile.first_name} {doctor.profile.last_name}</strong> - {doctor.profile.title}</h5>
          <img src={doctor.profile.image_url} alt={"Dr." + doctor.profile.first_name + " " + doctor.profile.last_name} />
          <ul>{mappedSpecialties}</ul>
          <p>{doctor.profile.bio}</p>
        </div>;
    }
      return (
        <div>
          {doctorData}
        </div>
      )
  }

  export default DoctorView;
