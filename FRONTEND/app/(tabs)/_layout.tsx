import { Redirect, Tabs } from 'expo-router';
import * as ScreenCapture from 'expo-screen-capture'; // ✅ import
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; // ✅ FIXED

export default function ProtectedLayout() {
  const { isAuthenticated } = useAuth();

  // ✅ Prevent screenshots/recordings on all tab screens
  useEffect(() => {
    ScreenCapture.preventScreenCaptureAsync();

    return () => {
      ScreenCapture.allowScreenCaptureAsync();
    };
  }, []);

  if (!isAuthenticated) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#000',
        },
      }}
    />
  );
}
