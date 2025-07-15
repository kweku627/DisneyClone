import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#888',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="seriesScreen"
        options={{
          title: 'Series',
          tabBarIcon: ({ color }) => <FontAwesome name="film" size={24} color={color} />,
        }}
      />
     
      <Tabs.Screen
        name="search_screen"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <FontAwesome name="search" size={24} color={color} />,
        }}
      /> <Tabs.Screen
        name="trailer"
        options={{
          title: 'Trailer',
          tabBarIcon: ({ color }) => <FontAwesome name="film" size={24} color={color} />,
        }}
      /> 
      
    </Tabs>
  );
}
