import { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import theme from '../theme'; // Adjust path based on your project structure

// Get screen width for responsive design
const { width: screenWidth } = Dimensions.get('window');

// Define the Movie type
interface Movie {
  id: string;
  title: string;
  image: any;
}

// Sample data
const profileImage = require('../assets/images/Background_images/portrait/background_image.jpg');
const profileName = "John Doe";
const totalMoviesWatched = 42;
const totalHoursWatched = 120;
const favoriteMovies: Movie[] = [
  { id: '1', title: 'The Dark Knight', image: require('../assets/images/Background_images/portrait/background_image2.jpg') },
  { id: '2', title: 'Inception', image: require('../assets/images/Background_images/portrait/background_image3.jpg') },
  { id: '3', title: 'Avengers', image: require('../assets/images/Background_images/portrait/background_image4.jpg') },
  { id: '4', title: 'Spider-Man', image: require('../assets/images/Background_images/portrait/background_image5.jpg') },
];
const unfinishedMovies: Movie[] = [
  { id: '5', title: 'Spider-Man', image: require('../assets/images/Background_images/portrait/background_image5.jpg') },
  { id: '6', title: 'Batman', image: require('../assets/images/Background_images/portrait/background_image6.jpg') },
  { id: '7', title: 'Wonder Woman', image: require('../assets/images/Background_images/portrait/background_image3.jpg') },
];
const downloadedMovies: Movie[] = [
  { id: '8', title: 'Moana', image: require('../assets/images/Background_images/portrait/background_image4.jpg') },
  { id: '9', title: 'Frozen', image: require('../assets/images/Background_images/portrait/background_image2.jpg') },
  { id: '10', title: 'The Lion King', image: require('../assets/images/Background_images/portrait/background_image5.jpg') },
];
const savedMovies: Movie[] = [
  { id: '11', title: 'Titanic', image: require('../assets/images/Background_images/portrait/background_image7.jpg') },
  { id: '12', title: 'The Matrix', image: require('../assets/images/Background_images/portrait/background_image8.jpg') },
  { id: '13', title: 'Interstellar', image: require('../assets/images/Background_images/portrait/background_image9.jpg') },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState<'Favorite Movies' | 'Unfinished Movies' | 'Downloads' | 'Saved Movies'>('Favorite Movies');

  const tabs = [
    { name: 'Favorite Movies', icon: 'heart' },
    { name: 'Unfinished Movies', icon: 'pause' },
    { name: 'Downloads', icon: 'download' },
    { name: 'Saved Movies', icon: 'bookmark' },
  ] as const;

  const tabContent: Record<typeof tabs[number]['name'], Movie[]> = {
    'Favorite Movies': favoriteMovies,
    'Unfinished Movies': unfinishedMovies,
    'Downloads': downloadedMovies,
    'Saved Movies': savedMovies,
  };

  const handleEditProfileImage = () => {
    console.log('Edit profile image pressed');
  };

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <View style={styles.movieItem}>
      <Image source={item.image} style={styles.movieImage} />
      <View style={styles.titleOverlay}>
        <Text style={styles.movieTitle} numberOfLines={1} ellipsizeMode="tail">
          {item.title}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View entering={FadeIn.duration(600)} style={styles.header}>
        <View style={styles.avatarContainer}>
          <Animated.Image
            source={profileImage}
            style={styles.avatar}
            entering={FadeInDown.duration(800).delay(200)}
          />
          <TouchableOpacity style={styles.editBadge} onPress={handleEditProfileImage}>
            <FontAwesome name="pencil" size={16} color={theme.dark.textPrimary} />
          </TouchableOpacity>
        </View>
        <Animated.View entering={FadeIn.duration(600).delay(300)} style={styles.profileNameContainer}>
          <Text style={styles.profileName}>{profileName}</Text>
        </Animated.View>
        <View style={styles.metricsContainer}>
          <Animated.View entering={FadeIn.duration(600).delay(400)} style={styles.metricItem}>
            <Text style={styles.metricValue}>{totalMoviesWatched}</Text>
            <Text style={styles.metricLabel}>Total Movies Watched</Text>
          </Animated.View>
          <Animated.View entering={FadeIn.duration(600).delay(400)} style={styles.metricItem}>
            <Text style={styles.metricValue}>{totalHoursWatched}</Text>
            <Text style={styles.metricLabel}>Total Hours Watched</Text>
          </Animated.View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeIn.duration(600).delay(600)} style={styles.tabsContainer}>
        <View style={styles.tabBar}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.name}
              style={[styles.tabButton, activeTab === tab.name && styles.activeTabButton]}
              onPress={() => setActiveTab(tab.name)}
            >
              <FontAwesome
                name={tab.icon}
                size={24}
                color={activeTab === tab.name ? theme.dark.accent : theme.dark.textSecondary}
              />
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={tabContent[activeTab]}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.movieGrid}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.dark.background, // #1C120F
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 15,
    resizeMode: 'cover',
    borderWidth: 3,
    borderColor: theme.dark.accent, // #BCAAA4
  },
  editBadge: {
    position: 'absolute',
    bottom: 15,
    right: 0,
    backgroundColor: theme.dark.secondary, // #A1887F
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.dark.background, // #1C120F
  },
  profileNameContainer: {
    marginBottom: 15,
  },
  profileName: {
    color: theme.dark.textPrimary, // #EDE7D9
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    flexWrap: 'wrap',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    minWidth: 100,
  },
  metricValue: {
    color: theme.dark.textPrimary, // #EDE7D9
    fontSize: 20,
    fontWeight: 'bold',
  },
  metricLabel: {
    color: theme.dark.textSecondary, // #BCAAA4
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
  },
  tabsContainer: {
    flex: 1,
    marginTop: 20,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 15,
    marginBottom: 15,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: theme.dark.primary, // #5D4037
  },
  movieGrid: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  movieItem: {
    flex: 1,
    margin: 5,
    position: 'relative',
  },
  movieImage: {
    width: (screenWidth - 40) / 3,
    height: ((screenWidth - 40) / 3) * 1.5,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  titleOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: `rgba(44, 31, 27, 0.8)`, // Derived from theme.dark.surface with opacity
    padding: 5,
    alignItems: 'center',
  },
  movieTitle: {
    color: theme.dark.textPrimary, // #EDE7D9
    fontSize: 12,
  },
});

export default Profile;