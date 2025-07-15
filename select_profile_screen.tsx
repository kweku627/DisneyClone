import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {

  // Different profile images
  const johnImg = require('../assets/images/Background_images/LandScape/background_image.jpg');
  const janeImg = require('../assets/images/Background_images/portrait/background_image2.jpg');
  const mikeImg = require('../assets/images/Background_images/portrait/background_image3.jpg');
  const annaImg = require('../assets/images/Background_images/portrait/background_image4.jpg');
  const chrisImg = require('../assets/images/Background_images/portrait/background_image5.jpg');

  return (
    <LinearGradient colors={['#1A1C29', '#202333', '#1A1C29']} style={styles.container}>
      
      <Text style={styles.title}>{"Who's Watching?"}</Text>

      {/* Row 1 */}
      <View style={styles.row}>
        <View style={styles.profileContainer}>
          <Image source={johnImg} style={styles.image} />
          <Text style={styles.username}>John</Text>
          <Icon name="lock" size={20} color="white" />
        </View>
        <View style={styles.profileContainer}>
          <Image source={janeImg} style={styles.image} />
          <Text style={styles.username}>Jane</Text>
        </View>
      </View>

      {/* Row 2 */}
      <View style={styles.row}>
        <View style={styles.profileContainer}>
          <Image source={mikeImg} style={styles.image} />
          <Text style={styles.username}>Mike</Text>
        </View>
        <View style={styles.profileContainer}>
          <Image source={annaImg} style={styles.image} />
          <Text style={styles.username}>Anna</Text>
        </View>
      </View>

      {/* Row 3 */}
      <View style={styles.row}>
        <View style={styles.profileContainer}>
          <Image source={chrisImg} style={styles.image} />
          <Text style={styles.username}>Chris</Text>
          <Icon name="lock" size={20} color="white" />
        </View>
        <View style={styles.profileContainer}>
          <TouchableOpacity style={styles.plusContainer}>
            <Icon name="plus" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.username}>Add Profile</Text>
        </View>
      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginTop: 50,
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  profileContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 10,
  },
  plusContainer: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  username: {
    color: 'white',
    fontSize: 16,
  },
});
