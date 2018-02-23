import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';


const renderSuggestion = ({ formattedSuggestion }) => (
  <div className="Demo__suggestion-item">
    <i className="fa fa-map-marker Demo__suggestion-icon" />
    <strong>{formattedSuggestion.mainText}</strong>{' '}
    <small className="text-muted">{formattedSuggestion.secondaryText}</small>
  </div>
)

const renderFooter = () => (
  <div className="Demo__dropdown-footer">
    <div>
      Google
    </div>
  </div>
)

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
  )
  clearSuggestions();
}


class GeoLocationSearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: 'Portland, OR',
      geocodeResults: null,
      loading: false,
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSelect(address) {
    this.setState({
      address,
      loading: true,
    })

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('Geocode Success', { lat, lng })
        this.setState({
          geocodeResults: lat, lng,
          loading: false,
        })
      })
      .catch(error => {
        console.log('Geocode Error', error)
        this.setState({
          geocodeResults: error,
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

  // renderGeocodeFailure(err) {
  //   return (
  //     <div className="alert alert-danger" role="alert">
  //       <strong>Error!</strong> {err}
  //     </div>
  //   )
  // }
  //
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

  render() {
    const inputProps = {
      type: 'text',
      value: this.state.address,
      onChange: this.handleChange,
      onBlur: () => {
        console.log('Blur event!')
      },
      onFocus: () => {
        console.log('Focused!')
      },
      autoFocus: true,
      placeholder: 'Your Location',
      name: 'Doctor_Search',
      id: 'my-input-id',
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

export default connect()(GeoLocationSearchForm);
