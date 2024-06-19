import React from 'react';
import {
  MapView,
  Camera,
  LocationPuck,
  ShapeSource,
  SymbolLayer,
  Images,
  CircleLayer,
  LineLayer,
} from '@rnmapbox/maps';
import useMapbox from '../../hooks/useMapBox';
import { Alert } from 'react-native';
import Error from './Error';
import pin from '../../assets/motorbike.png';

const Map = () => {
  const {
    accessToken,
    locationPermission,
    scootersFeatures,
    onPointPress,
    directions,
    selectedScooter,
  } = useMapbox();

  if (!accessToken || !locationPermission) {
    Alert.alert(
      'Location Permission Required',
      'You need to grant location permission to use the application.'
    );
    return <Error />;
  }

  const directionCoordinate = directions?.routes?.[0]?.geometry?.coordinates;
  return (
    <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/dark-v11">
      <Camera followUserLocation followZoomLevel={10} />
      <LocationPuck pulsing={{ isEnabled: true }} />
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
        {directionCoordinate && (
          <ShapeSource
            id="routeSource"
            lineMetrics
            shape={{
              properties: {},
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: directionCoordinate,
              },
            }}>
            <LineLayer
              id="exampleLineLayer"
              style={{
                lineColor: '#42A2D9',
                lineCap: 'round',
                lineJoin: 'round',
                lineWidth: 7,
              }}
            />
          </ShapeSource>
        )}
      </ShapeSource>
    </MapView>
  );
};

export default Map;
