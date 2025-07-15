import React from 'react';
import { Button, Text, View } from 'react-native';
import { useAuth } from '../auth/AuthContext';

export default function Signup() {
  const { login } = useAuth(); // simulate login after signup

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Signup Screen</Text>
      <Button title="Sign Up" onPress={login} />
    </View>
  );
}
