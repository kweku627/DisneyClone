import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Card({ title, image }: { title: string; image: string }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginRight: 16,
    width: 120,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 6,
  },
  title: {
    color: '#ccc',
    fontSize: 12,
    textAlign: 'center',
  },
});
