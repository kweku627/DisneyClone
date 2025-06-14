import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';
import { useColorScheme } from '../hooks/useColorScheme';
import { ThemeProvider } from '../components/ThemeProvider';

function SettingsButton() {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push('/settings')} style={{ marginRight: 15 }}>
      <FontAwesome name="cog" size={20} color="white" />
    </TouchableOpacity>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <NavigationThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: '#272a3d' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" options={{ title: 'Not Found' }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
             <Stack.Screen name="signup" options={{ headerShown: false }} />
            <Stack.Screen
              name="Profile"
              options={{
                title: 'Profile',
                headerRight: () => <SettingsButton />,
              }}
            />
            <Stack.Screen name="settings" options={{ title: 'Settings' }} />
            <Stack.Screen name="downloadscreen" options={{ title: 'Downloads' }} />
            <Stack.Screen
              name="watch"
              options={{
                title: 'Watch Video',
                // Dynamic title handled in watch.tsx via useLocalSearchParams
              }}
            /><Stack.Screen
              name="watch-series"
              options={{
                title: 'Watch Series',
                // Dynamic title handled in watch.tsx via useLocalSearchParams
              }}
            />
          </Stack>
          <StatusBar style="light" />
        </NavigationThemeProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}