import React,{Component} from "react";
import { withGoogleMap, GoogleMap, Marker,Polyline } from "react-google-maps";
import ViewMarkers from './ViewMarkers'
import {RouteInfoDisplay} from '../requestFunction';
const GettingStartedGoogleMap = withGoogleMap(props => (
    <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={14}
        center={props.centerMap}
        onClick={props.onMapClick}
    >
        <ViewMarkers
            markers = {props.markers}
            onMarkerRightClick = {props.onMarkerRightClick}
        />
        <Polyline
            path={props.flightPlanCoordinates}
            geodesic={true}
            options={{
                strokeColor:'#FF0000',
                strokeOpacity:1.0,
                strokeWeight:2
            }}
        />
    </GoogleMap>
));

export default class MapContainer extends Component {
    constructor(props){
        super(props);
        this.handleMapLoad = this.handleMapLoad.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
        this.markerDrag = this.markerDrag.bind(this);
    }
    handleMapLoad(map) {
        this.mapComponent = map;
        if (map) {}
    }

    handleMapClick(event) {
        RouteInfoDisplay(false);
        let nextMarkers = this.props.markers;
        nextMarkers.push(
            {
                position: {"lat":event.latLng.lat(),"lng":event.latLng.lng()},
                key:Date.now()
            }
        );
        const nextLines = [...this.props.flightPlanCoordinates,event.latLng];
        try
        {
            let url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&key=AIzaSyDDknyoXs5_BqbIdLGt__Zm5yitRp-Hhus";
            gapi.load('client:auth2', this.initClient);
        }
        catch(error){}
        this.props.routeData(nextMarkers,nextLines);
    }
    initClient() {
        // Initialize the client with API key and People API, and initialize OAuth with an
        // OAuth 2.0 client ID and scopes (space delimited string) to request access.
        gapi.client.init({
            apiKey: 'AIzaSyDDknyoXs5_BqbIdLGt__Zm5yitRp-Hhus',
        }).then(function () {
            var user = gapi.client.getAuthInstance().currentUser.get();
            var oauthToken = user.getAuthResponse().access_token;
            var xhr = new XMLHttpRequest();
            xhr.open('GET',
                'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&key=AIzaSyDDknyoXs5_BqbIdLGt__Zm5yitRp-Hhus')
            xhr.send();
        });
    }
    markerDrag(e){}
    handleMarkerRightClick(targetMarker) {
        const nextMarkers = this.props.markers.filter(marker => marker.position !== targetMarker.latLng);
        const nextLines = this.props.flightPlanCoordinates.filter(line =>line !== targetMarker.latLng);
        this.props.routeData(nextMarkers,nextLines);
    }
    render(){
        return(
            <GettingStartedGoogleMap
                containerElement={
                    <div style={{ height: `100%` }} />
                }
                mapElement={
                    <div style={{ height: `100%` }} />
                }
                onMapLoad={this.handleMapLoad}
                onMapClick={this.handleMapClick}
                markers={this.props.markers}
                flightPlanCoordinates = {this.props.flightPlanCoordinates}
                onMarkerRightClick={this.handleMarkerRightClick}
                MarkerDrag = {this.markerDrag}
                centerMap = {this.props.centerMap}
            />
        )
    }
}