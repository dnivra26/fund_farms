import React, {PropTypes, Component} from 'react';
import GoogleMap from 'google-map-react';


export default class Map extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="mapHeight"><GoogleMap
                bootstrapURLKeys={{
                    key: 'FILL_IN_API_KEY',
                    language: 'us'}}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}>
            </GoogleMap>
            </div>
        );
    }
}

Map.defaultProps = {
    center: {lat: 59.938043, lng: 30.337157},
    zoom: 9,
    greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
};