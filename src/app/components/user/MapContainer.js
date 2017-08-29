import React,{Component} from "react";
import { withGoogleMap, GoogleMap, Marker,Polyline } from "react-google-maps";
const GettingStartedGoogleMap = withGoogleMap(props => (
    <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={14}
        defaultCenter={{ lat: 49.444356503879916, lng: 32.05780506134033}}
        onClick={props.onMapClick}
    >
        {props.markers}
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
        this.state = {
            markers: [],
            flightPlanCoordinates:[]
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
        let nextMarkers = this.state.markers;
        nextMarkers.push(
            <Marker draggable ='false'
                    position = {event.latLng}
                    defaultAnimation= {2}
                    key= {Date.now()}
                    onDrag={(e)=>this.markerDrag(e)}
                    onRightClick={(e) => this.handleMarkerRightClick(e)}
            />
        );
        console.log(nextMarkers)
        const nexlines = [...this.state.flightPlanCoordinates,event.latLng];
        this.setState({
            markers: nextMarkers,
            flightPlanCoordinates:nexlines
        });
        console.log(google.maps.geometry.spherical.computeLength(nexlines));

    }
    markerDrag(e){

    }
    handleMarkerRightClick(targetMarker) {
        const nextMarkers = this.state.markers.filter(marker => marker.props.position !== targetMarker.latLng);
        const nextLines = this.state.flightPlanCoordinates.filter(line =>line !== targetMarker.latLng);
        this.setState({
            markers: nextMarkers,
            flightPlanCoordinates:nextLines
        });
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
                markers={this.state.markers}
                flightPlanCoordinates = {this.state.flightPlanCoordinates}
                onMarkerRightClick={this.handleMarkerRightClick}
                MarkerDrag = {this.markerDrag}
            />
        )
    }
}