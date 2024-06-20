import { CircleLayer, Images, ShapeSource, SymbolLayer } from '@rnmapbox/maps';
import pin from '../../assets/motorbike.png';

const ScooterMarker = ({ scootersFeatures, onPointPress }) => {
  return (
    <ShapeSource id="scooters" shape={scootersFeatures} cluster onPress={(e) => onPointPress(e)}>
      <SymbolLayer
        id="clusterCount"
        style={{
          textField: ['get', 'point_count'],
          textSize: 16,
          textColor: '#ffffff',
          textPitchAlignment: 'map',
        }}
      />
      <CircleLayer
        id="clusteredScooters"
        filter={['has', 'point_count']}
        style={{
          circlePitchAlignment: 'map',
          circleColor: '#42E100',
          circleRadius: 10,
          circleOpacity: 0.7,
          circleStrokeWidth: 0.2,
          circleStrokeColor: 'white',
        }}
      />
      <SymbolLayer
        id="scooter-icons"
        filter={['!', ['has', 'point_count']]}
        minZoomLevel={1}
        style={{ iconImage: 'pin', iconAllowOverlap: true, iconSize: 0.05, iconAnchor: 'bottom' }}
      />
      <Images images={{ pin }} />
    </ShapeSource>
  );
};

export default ScooterMarker;
