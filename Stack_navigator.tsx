import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import WatchMovie from './(tabs)';
import SearchScreen from './(tabs)/search_screen';
import Series from './(tabs)/seriesScreen';
import TrailerScreen from './(tabs)/trailer';
import ProfileScreen from './Profile'; // ✅ Import your profile screen
import Login from './login';
import Downloads from './downloadscreen';
import Signup from './signup_screen';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={WatchMovie} 
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Series" 
        component={Series} 
        options={{ headerShown: false }}
      />
      
      <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Trailer" 
        component={TrailerScreen} 
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Main" 
          component={MainTabs} 
          options={{ headerShown: false }}
        />

        {/* ✅ Profile screen is only in stack, not tabs */}
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="login" 
          component={Login} 
          options={{ headerShown: false }}
        />
         <Stack.Screen 
          name="signup" 
          component={Signup} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="downloadscreen" 
          component={Downloads} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
