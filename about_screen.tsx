import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text,Button } from 'react-native';

export default function About() {
    const router = useRouter();

    return (
        <View>
            <Text>Home Screen</Text>
            <Button title='Go to Home Screen' onPress={() => router.push('/select_profile_screen')}></Button>
        </View>
    );
    
}

