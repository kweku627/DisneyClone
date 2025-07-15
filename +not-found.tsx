import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '../theme'; // Adjust path if needed

const defaultTheme = {
  dark: {
    primary: '#5D4037',
    secondary: '#A1887F',
    accent: '#BCAAA4',
    background: '#1C120F',
    surface: '#2C1F1B',
    textPrimary: '#EDE7D9',
    textSecondary: '#BCAAA4',
    border: '#4E342E',
  },
};

export default function NotFound() {
  console.log('Theme in NotFound:', theme); // Debug theme import
  const currentTheme = theme || defaultTheme;
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.dark.background }]}>
      <StatusBar backgroundColor={currentTheme.dark.background} barStyle="light-content" />
      <Text style={[styles.title, { color: currentTheme.dark.textPrimary }]}>
        Page Not Found
      </Text>
      <Text style={[styles.subtitle, { color: currentTheme.dark.textSecondary }]}>
        The page you are looking for does not exist.
      </Text>
      <Text
        style={[styles.link, { color: currentTheme.dark.accent }]}
        onPress={() => router.replace('/Profile')}
      >
        Go to Movies
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  link: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});