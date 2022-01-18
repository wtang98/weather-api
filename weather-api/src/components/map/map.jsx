import React,{Component} from 'react'
import './map.scss'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

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
    
    // state = {
    // };

    // onMarkerClick = (props, marker, e) =>
    //     this.setState({
    //         selectedPlace: props,
    //         activeMarker: marker,
    //         showingInfoWindow: true
    //     });

    // onMapClicked = (props) => {
    //     if (this.state.showingInfoWindow) {
    //         this.setState({
    //         showingInfoWindow: false,
    //         activeMarker: null
    //         })
    //     }
    // };
    handleChange = address => {
        this.setState({ address });
    };
    handleSelect = address => {
        geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => console.log('Success', latLng))
        .catch(error => console.error('Error', error));
    };

    render() {
        return (
            <div className="container">
                <div className="container__placesAutoComplete">
                    <PlacesAutocomplete
                        value={this.state.address}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <input
                            {...getInputProps({
                                placeholder: 'Search Places ...',
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
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
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
                <div className="container__map">
                    <Map google={this.props.google}
                    initialCenter={{
                        lat: this.props.latitude,
                        lng: this.props.longitude,
                    }}
                    center={{
                        lat: this.props.latitude,
                        lng: this.props.longitude,
                    }}
                        // onClick={this.onMapClicked}
                        >
                    <Marker 
                    // onClick={this.onMarkerClick}
                        position={{
                            lat: this.props.latitude,
                            lng: this.props.longitude,
                        }}
                        name={'Current location'} />
                    {/* <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow> */}
                    </Map>
                </div>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyCnotSqEXpjngEPB2Ij5f9THDXgWJXjN58')
})(MapContainer)