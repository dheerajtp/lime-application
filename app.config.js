module.exports = {
  expo: {
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.dheerajtp.limeapplication',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.dheerajtp.limeapplication',
    },
    plugins: [
      [
        '@rnmapbox/maps',
        {
          RNMapboxMapsDownloadToken: process.env.EXPO_PUBLIC_RN_MAP_SECRET_KEY,
          RNMapboxMapsVersion: '11.0.0',
          locationWhenInUsePermission: 'Show current location on map.',
        },
      ],
    ],
  },
};
