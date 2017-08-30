import React,{Component} from "react";
import { withGoogleMap, GoogleMap, Marker,Polyline } from "react-google-maps";

export default class ViewMarkers extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let list = this.props.markers.map((data) => {
                return (
                    <Marker draggable={false}
                            position={data.position}
                            defaultAnimation={2}
                            key={data.key}
                            onDrag={(e) => this.markerDrag(e)}
                            onRightClick={(e) => this.handleMarkerRightClick(e)}
                    />
                )
            }
        );
        return (
            <div>
                {list}
            </div>
        );
    }
}