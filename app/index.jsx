import React from 'react';
import { Stack } from 'expo-router';

import { Container } from '../components/Container';
import Map from '../components/Maps/Map';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <Container>
        <Map />
      </Container>
    </>
  );
}
