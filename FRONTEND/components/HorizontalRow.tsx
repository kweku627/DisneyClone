import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Card from './ui/Card'; // Adjust path if needed

const dummyData = [
  { id: 1, title: 'Loki', image: 'https://image.tmdb.org/t/p/w500/voHUmluYmKyleFkTu3lOXQG702u.jpg' },
  { id: 2, title: 'Moana', image: 'https://image.tmdb.org/t/p/w500/4JeeFqJbX9KFYtW4zWcX2gYdMmv.jpg' },
  { id: 3, title: 'The Mandalorian', image: 'https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg' },
  { id: 4, title: 'Turning Red', image: 'https://image.tmdb.org/t/p/w500/qsdjk9oAKSQMWs0Vt5Pyfh6O4GZ.jpg' },
];

export default function HorizontalRow({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {dummyData.map((item) => (
          <Card key={item.id} title={item.title} image={item.image} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 10,
  },
});
