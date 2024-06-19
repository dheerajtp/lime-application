import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import Mapbox from '@rnmapbox/maps';
import { Alert } from 'react-native';
import { featureCollection, point } from '@turf/helpers';
import scooters from '../data/scooters.json';
import directionServices from '../services/directions';

const useMapbox = () => {
  const [accessToken, setAccessToken] = useState('');
  const [locationPermission, setLocationPermission] = useState(false);
  const [directions, setDirections] = useState(null);
  const [selectedScooter, setSelectedScooter] = useState(null);

  const points = scooters.map((scooter) => point([scooter.long, scooter.lat], { scooter }));
  const scootersFeatures = featureCollection(points);
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === 'granted');

      const accessToken = process.env.EXPO_PUBLIC_RN_ACCESS_TOKEN ?? '';
      if (accessToken) {
        setAccessToken(accessToken);
        Mapbox.setAccessToken(accessToken);
      } else {
        Alert.alert('Mapbox access token is missing');
      }
    })();
  }, []);

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return {
          status: false,
          error: "Permission denied', 'Allow the app to use the location services",
        };
      }
      const { coords } = await Location.getCurrentPositionAsync();
      return {
        status: true,
        coords,
      };
    } catch (error) {
      return {
        status: false,
        error: error.message ?? 'Please Allow Location Permission',
      };
    }
  };
  const onPointPress = async (event) => {
    setDirections(null);
    if (event.features[0].properties?.scooter) {
      setSelectedScooter(event.features[0].properties.scooter);
    }
    let currentLocationResult = await getCurrentLocation();
    if (!currentLocationResult.status) {
      return Alert.alert(currentLocationResult.error ?? 'Some Error Occured');
    }
    let directionsResult = await directionServices.getDirections(
      [currentLocationResult.coords.longitude, currentLocationResult.coords.latitude],
      [event.coordinates.longitude, event.coordinates.latitude]
    );

    if (!directionsResult.status) {
      return Alert.alert(directionsResult.error ?? 'Some Error Occured');
    }
    console.log(' === directions result === ');
    console.log(JSON.stringify(directionsResult.result));
    setDirections(directionsResult.result);
  };
  return {
    accessToken,
    locationPermission,
    scootersFeatures,
    onPointPress,
    directions,
    selectedScooter,
  };
};

export default useMapbox;
