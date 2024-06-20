import { LineLayer, ShapeSource } from '@rnmapbox/maps';

const LineRoute = ({ directions }) => {
  const directionCoordinate = directions?.routes?.[0]?.geometry?.coordinates;
  return (
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
  );
};

export default LineRoute;
