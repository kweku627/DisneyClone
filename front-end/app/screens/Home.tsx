// Home.tsx
import React from 'react';
import { Button, Text, View } from 'react-native';
import { useAuth } from '../auth/AuthContext';

export default function Home() {
  const { logout } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome Home</Text>
      <Button title="Log Out" onPress={logout} />
    </View>
  );
}
