import React from 'react';
import { MapView, Camera, LocationPuck } from '@rnmapbox/maps';
import useMapbox from '../../hooks/useMapBox';
import { Alert } from 'react-native';
import Error from './Error';
import LineRoute from './LineRoute';
import ScooterMarker from './ScooterMarker';

const Map = () => {
  const { accessToken, locationPermission, directions, onPointPress, scootersFeatures } =
    useMapbox();

  if (!accessToken || !locationPermission) {
    Alert.alert(
      'Location Permission Required',
      'You need to grant location permission to use the application.'
    );
    return <Error />;
  }

  return (
    <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/dark-v11">
      <Camera followUserLocation followZoomLevel={10} />
      <LocationPuck pulsing={{ isEnabled: true }} />
      <ScooterMarker scootersFeatures={scootersFeatures} onPointPress={onPointPress} />
      {directions && <LineRoute directions={directions} />}
    </MapView>
  );
};

export default Map;
