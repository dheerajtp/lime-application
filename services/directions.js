import configurations from '../configurations';

const getDirections = async (origin, dest) => {
  try {
    const res = await fetch(
      `${configurations.URL}/walking/${origin[0]},${origin[1]};${dest[0]},${dest[1]}?alternatives=false&annotations=distance%2Cduration&continue_straight=true&geometries=geojson&overview=full&steps=false&access_token=${process.env.EXPO_PUBLIC_RN_ACCESS_TOKEN}`
    );

    const result = await res.json();
    if (result.code == 'Ok') {
      return {
        status: true,
        result,
      };
    }
    return {
      status: false,
      error: result.message ?? 'Some Error Occured',
    };
  } catch (error) {
    console.log({ error });
    return {
      status: false,
      error: error.message ?? 'Some Error Occured',
    };
  }
};

const directionServices = {
  getDirections,
};

export default directionServices;
