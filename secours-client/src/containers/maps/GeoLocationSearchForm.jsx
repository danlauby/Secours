import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { setGeoLocation } from '../../actions/geoLocationsActions';


const renderSuggestion = ({ formattedSuggestion }) => (
  <div className="Demo__suggestion-item">
    <i className="fa fa-map-marker Demo__suggestion-icon" />
    <strong>{formattedSuggestion.mainText}</strong>{' '}
    <small className="text-muted">{formattedSuggestion.secondaryText}</small>
  </div>
);

const renderFooter = () => (
  <div className="Demo__dropdown-footer">
    <div>
      Google
    </div>
  </div>
);

// const cssClasses = {
//   root: 'form-Geoup',
//   input: 'Doctor_Search',
//   autocompleteContainer: 'Demo__autocomplete-container',
// }

const shouldFetchSuggestions = ({ value }) => value.length > 2

const onError = (status, clearSuggestions) => {
  console.log(
    'Error happened while fetching suggestions from Google Maps API',
    status
  );
  clearSuggestions();
}


class GeoLocationSearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      geocodeResults: null,
      loading: false,
    }
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSelect(address) {
    this.setState({
      address,
      loading: true,
    })

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        this.props.setGeoLocation({ lat, lng });
        this.setState({
          // geocodeResults: this.renderGeocodeSuccess(lat, lng),
          loading: false,
        })
      })
      .catch(error => {
        console.log('Geocode Error', error); // eslint-disable-line no-console
        this.setState({
          geocodeResults: this.renderGeocodeFailure(error),
          loading: false,
        })
      })
  }

  handleChange(address) {
    this.setState({
      address,
      geocodeResults: null,
    })
  }

  renderGeocodeFailure(err) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>There was an error, no suggestions found</strong> {err}
      </div>
    );
  }

  // renderGeocodeSuccess(lat, lng) {
  //   return (
  //     <div className="alert alert-success" role="alert">
  //       <strong>Success!</strong> Geocoder found latitude and longitude:{' '}
  //       <strong>
  //         {lat}, {lng}
  //       </strong>
  //     </div>
  //   )
  // }

  displayError() {
    this.setState({
      geocodeResults: 'Please enter your location',
      loading: true,
    });
  }

  render() {
    const inputProps = {
      type: 'text',
      value: this.state.address,
      onChange: this.handleChange,
      autoFocus: false,
      placeholder: 'Your Location',
      name: 'Doctor_Search',
      id: 'geo-location-input',
      onBlur: () => {
        if (!this.state.address) {
          this.displayError();
        }
      },
      // onFocus: () => {
      //   console.log('Focused!')
      // }
    }

    return (
      <div>
        <PlacesAutocomplete
          renderSuggestion={renderSuggestion}
          renderFooter={renderFooter}
          inputProps={inputProps}
          onSelect={this.handleSelect}
          onEnterKeyDown={this.handleSelect}
          onError={onError}
          shouldFetchSuggestions={shouldFetchSuggestions}
        />
        {this.state.loading && (
          <div>
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" />
          </div>
        )}
        {this.state.geocodeResults && (
          <div className="geocoding-results">{this.state.geocodeResults}</div>
        )}
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    currentUser: state.auth.user
  };
}

export default connect(mapStateToProps, { setGeoLocation })(GeoLocationSearchForm);
