import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Theme {
  background: string;
  surface: string;
  primary: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  secondary: string;
}

interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const themes = {
  dark: {
    background: '#1C120F', // Dark background
    surface: '#2C1F1B', // Surface for cards and sections
    primary: '#5D4037', // Primary color (Brown)
    accent: '#BCAAA4', // Accent color (Caramel)
    textPrimary: '#EDE7D9', // Primary text color (Cream)
    textSecondary: '#BCAAA4', // Secondary text color (Caramel)
    border: '#4E342E', // Border color (Dark Brown)
    secondary: '#A1887F', // Secondary button color
  },
  light: {
    background: '#F5F5F5', // Light background
    surface: '#FFFFFF', // Surface for cards and sections
    primary: '#8D6E63', // Primary color (Muted Brown)
    accent: '#D7CCC8', // Accent color (Light Caramel)
    textPrimary: '#212121', // Primary text color (Dark Gray)
    textSecondary: '#757575', // Secondary text color (Gray)
    border: '#E0E0E0', // Border color (Light Gray)
    secondary: '#BCAAA4', // Secondary button color
  },
};

const ThemeContext = createContext<ThemeContextType>({
  theme: themes.dark,
  isDarkMode: true,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  useEffect(() => {
    // Load theme preference from AsyncStorage
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme !== null) {
          setIsDarkMode(savedTheme === 'dark');
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode ? 'dark' : 'light';
      setIsDarkMode(!isDarkMode);
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const theme = isDarkMode ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);