import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import Mapbox from '@rnmapbox/maps';
import { Alert } from 'react-native';

const useMapbox = () => {
  const [accessToken, setAccessToken] = useState('');
  const [locationPermission, setLocationPermission] = useState(false);

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

  return { accessToken, locationPermission };
};

export default useMapbox;
