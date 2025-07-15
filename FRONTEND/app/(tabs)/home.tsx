import * as ScreenCapture from 'expo-screen-capture'; // ✅ import
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  // ✅ Prevent screenshots & recordings
  useEffect(() => {
    ScreenCapture.preventScreenCaptureAsync();

    return () => {
      ScreenCapture.allowScreenCaptureAsync();
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Disney+ Clone</Text>

      {/* Hero Banner */}
      <View style={styles.hero}>
        <Text style={styles.heroText}>Hero Banner</Text>
      </View>

      {/* Scrollable Rows */}
      <View style={styles.row}>
        <Text style={styles.rowTitle}>Trending</Text>
        {/* Add horizontal scroll cards here */}
      </View>

      <View style={styles.row}>
        <Text style={styles.rowTitle}>Marvel Originals</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.rowTitle}>Star Wars</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    padding: 16,
  },
  hero: {
    height: 200,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroText: {
    color: '#fff',
    fontSize: 18,
  },
  row: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  rowTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 8,
  },
});
