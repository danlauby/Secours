// import React from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';


// <Link to={{pathname: `doctor/${doctor.last_name}`, query: { id: doctor.uid }}}>
// </Link>
// <Link to={`/doctors/${doctor.id}`}>SEE MORE</Link>
// const DoctorItem = (props) => {
//   const { doctor } = props;
//   console.log('ITEM', props);
//   const mappedSpecialties = Object.entries(doctor.specialties).map(([index, specialty]) => {
//     return <li key={index} id={index}>{specialty.name}</li>;
//     });
//
//     return (
//       <div id={doctor.uid}>
//         <ul>
//           <li className="list-group-item justify-content-between">
//               <img src={doctor.profile.image_url} alt={"Dr." + doctor.profile.first_name + " " + doctor.profile.last_name} />
//               <h5 className="mb-1">{doctor.profile.first_name} {doctor.profile.last_name}</h5>
//               <ul>
//                 {mappedSpecialties}
//               </ul>
//               <Link to={`/doctors/${doctor.id}`}>SEE MORE</Link>
//           </li>
//         </ul>
//       </div>
//     )
//   }
//
//   DoctorItem.propTypes = {
//     doctor: PropTypes.object.isRequired,
//   };
//
//   export default DoctorItem;
