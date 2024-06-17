import Mapbox, { MapView } from '@rnmapbox/maps';

const accessToken = process.env.EXPO_PUBLIC_RN_ACCESS_TOKEN ?? '';

Mapbox.setAccessToken(accessToken);

const Map = () => {
  return <MapView />;
};

export default Map;
