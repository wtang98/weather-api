import React,{ Component } from 'react'
import './searchBar.scss'
import { GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            address: '',
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            mapCenter :{
                lat: this.props.latitude,
                lng: this.props.longitude,
            }
        };
    }
    handleChange = address => {
        this.setState({ address });
    };
    handleSelect = address => {
        geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
            console.log('Success', latLng)
            this.setState({ address })
            this.setState({ mapCenter: latLng})
            this.props.handleLat(latLng.lat)
            this.props.handleLon(latLng.lng)
        })
        .catch(error => console.error('Error', error));
    };
    
    render() {
        return (
            <div className="container">
                <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                    className="container__placesAutoComplete"
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input
                        {...getInputProps({
                            placeholder: 'Click Here to search',
                            className: 'location-search-input',
                        })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                ? { backgroundColor: 'black', cursor: 'pointer', width:200, padding:7}
                                : { backgroundColor: 'black', cursor: 'pointer', width:200, padding:7};
                                return (
                                <div
                                    {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style,
                                    })}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                                );
                            })}
                        </div>
                    </div>
                    )}
                </PlacesAutocomplete>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyCnotSqEXpjngEPB2Ij5f9THDXgWJXjN58')
})(MapContainer)