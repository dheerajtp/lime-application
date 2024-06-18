import React from 'react';
import { MapView, Camera, LocationPuck, ShapeSource, SymbolLayer, Images } from '@rnmapbox/maps';
import useMapbox from '../../hooks/useMapBox';
import { Alert } from 'react-native';
import Error from './Error';
import pin from '../../assets/motorbike.png';

const Map = () => {
  const { accessToken, locationPermission, scootersFeatures } = useMapbox();

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
      <ShapeSource id="scooters" shape={scootersFeatures}>
        <SymbolLayer
          id="scooter-icons"
          minZoomLevel={1}
          style={{ iconImage: 'pin', iconAllowOverlap: true, iconSize: 0.05, iconAnchor: 'bottom' }}
        />
        <Images images={{ pin }} />
      </ShapeSource>
    </MapView>
  );
};

export default Map;
