import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

export const Container = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
