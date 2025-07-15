import React from 'react';
import { Button, Text, View } from 'react-native';
import { useAuth } from '../auth/AuthContext';

export default function Login() {
  const { login } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login Screen</Text>
      <Button title="Login" onPress={login} />
    </View>
  );
}
