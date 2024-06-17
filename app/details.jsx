import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';

import { Container } from '../components/Container';
import { ScreenContent } from '../components/ScreenContent';

export default function Details() {
  const { name } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ title: 'Details' }} />
      <Container>
        <ScreenContent path="screens/details.js" title={`Showing details for user ${name}`} />
      </Container>
    </>
  );
}
