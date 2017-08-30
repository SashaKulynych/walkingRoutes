import React,{Component} from "react";
import { withGoogleMap, GoogleMap, Marker,Polyline } from "react-google-maps";
import ViewMarkers from './ViewMarkers'
const GettingStartedGoogleMap = withGoogleMap(props => (
    <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={14}
        center={props.centerMap}
        onClick={props.onMapClick}
    >
        <ViewMarkers
            markers = {props.markers}
        />
        {props.markersView}
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
        this.state ={
            markersView:[]
        };
        this.handleMapLoad = this.handleMapLoad.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
        this.markerDrag = this.markerDrag.bind(this);
    }
    handleMapLoad(map) {
        this.mapComponent = map;
        if (map) {
        }
    }

    handleMapClick(event) {
        document.getElementsByClassName('card')[0].style.opacity = '0';
        document.getElementsByClassName('card')[0].style.visibility = 'hidden';
        document.getElementsByClassName('card')[0].style.transition = 'opacity 0.3s, visibility 0s linear 0.3s';
        let nextMarkers = this.props.markers;
        console.log(nextMarkers);
        nextMarkers.push(
            {
                position: event.latLng,
                key:Date.now()
            }
        );
        const nextLines = [...this.props.flightPlanCoordinates,event.latLng];
        this.props.routeData(nextMarkers,nextLines);
    }
    markerDrag(e){

    }
    handleMarkerRightClick(targetMarker) {
        const nextMarkers = this.props.markers.filter(marker => marker.props.position !== targetMarker.latLng);
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
                markersView = {this.state.markersView}
            />
        )
    }
}