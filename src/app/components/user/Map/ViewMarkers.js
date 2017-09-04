import React,{Component} from "react";
import { Marker } from "react-google-maps";

export default class ViewMarkers extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let list = this.props.markers.map((data) => {
                return (
                    <Marker
                        draggable={false}
                        position={data.position}
                        defaultAnimation={0}
                        key={data.key}
                        onDrag={(e) => this.props.markerDrag(e)}
                        onRightClick={(e) => this.props.onMarkerRightClick(e)}
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