
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, ListRenderItem, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../../components/ThemeProvider';

interface FeaturedMovie {
  id: string;
  title: string;
  genre: string;
  rating: string;
  year: string;
  image: any;
  videoUri: string;
}

interface MovieCategory {
  id: string;
  title: string;
  movies: {
    id: string;
    title: string;
    image: any;
    rating?: string;
    year?: string;
    videoUri: string;
  }[];
}

interface Theme {
  primary: string;
  background: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  surface: string;
  border: string;
}

interface Genre {
  id: number;
  name: string;
}

const Movies = () => {
  const { primary, background, textPrimary, textSecondary, accent, surface, border } = useTheme() as Theme;
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null); // Store genre id or null for "All"
  const router = useRouter();

  const genres: Genre[] = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
  ];

  const featuredMovies: FeaturedMovie[] = [
    {
      id: '1',
      title: 'The Dark Knight',
      genre: 'Action',
      rating: '9.0',
      year: '2008',
      image: require('../../assets/images/Background_images/LandScape/background_image.jpg'),
      videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      id: '2',
      title: 'Inception',
      genre: 'Science Fiction',
      rating: '8.8',
      year: '2010',
      image: require('../../assets/images/Background_images/LandScape/stranger_things.jpg'),
      videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    },
    {
      id: '3',
      title: 'Avengers: Endgame',
      genre: 'Action',
      rating: '8.4',
      year: '2019',
      image: require('../../assets/images/Background_images/LandScape/moana.jpg'),
      videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
  ];

  const movieCategories: MovieCategory[] = [
    {
      id: '1',
      title: 'Trending Now',
      movies: [
        { id: '1', title: 'Spider-Man', image: require('../../assets/images/Background_images/portrait/background_image.jpg'), rating: '8.2', year: '2021', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
        { id: '2', title: 'Batman', image: require('../../assets/images/Background_images/portrait/background_image2.jpg'), rating: '7.8', year: '2022', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
        { id: '3', title: 'Wonder Woman', image: require('../../assets/images/Background_images/portrait/background_image3.jpg'), rating: '7.4', year: '2020', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
        { id: '4', title: 'Aquaman', image: require('../../assets/images/Background_images/portrait/background_image4.jpg'), rating: '6.8', year: '2018', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
        { id: '5', title: 'Flash', image: require('../../assets/images/Background_images/portrait/background_image5.jpg'), rating: '6.9', year: '2023', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' },
        { id: '6', title: 'Superman', image: require('../../assets/images/Background_images/portrait/background_image6.jpg'), rating: '7.1', year: '2025', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' },
      ],
    },
    {
      id: '2',
      title: 'Now Playing',
      movies: [
        { id: '7', title: 'Deadpool & Wolverine', image: require('../../assets/images/Background_images/portrait/background_image.jpg'), rating: '8.0', year: '2024', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
        { id: '8', title: 'Joker: Folie à Deux', image: require('../../assets/images/Background_images/portrait/background_image2.jpg'), rating: '7.5', year: '2024', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4' },
        { id: '9', title: 'Mufasa: The Lion King', image: require('../../assets/images/Background_images/portrait/background_image3.jpg'), rating: '7.2', year: '2024', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4' },
        { id: '10', title: 'Kraven the Hunter', image: require('../../assets/images/Background_images/portrait/background_image4.jpg'), rating: '6.5', year: '2024', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4' },
      ],
    },
    {
      id: '3',
      title: 'Popular',
      movies: [
        { id: '11', title: 'Dune: Part Two', image: require('../../assets/images/Background_images/portrait/background_image5.jpg'), rating: '8.9', year: '2024', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        { id: '12', title: 'Oppenheimer', image: require('../../assets/images/Background_images/portrait/background_image6.jpg'), rating: '8.6', year: '2023', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
        { id: '13', title: 'Barbie', image: require('../../assets/images/Background_images/portrait/background_image.jpg'), rating: '7.8', year: '2023', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
        { id: '14', title: 'Avatar: The Way of Water', image: require('../../assets/images/Background_images/portrait/background_image2.jpg'), rating: '7.6', year: '2022', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
      ],
    },
    {
      id: '4',
      title: 'Top Rated',
      movies: [
        { id: '15', title: 'The Shawshank Redemption', image: require('../../assets/images/Background_images/portrait/background_image3.jpg'), rating: '9.3', year: '1994', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
        { id: '16', title: 'The Godfather', image: require('../../assets/images/Background_images/portrait/background_image4.jpg'), rating: '9.2', year: '1972', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
        { id: '17', title: 'Pulp Fiction', image: require('../../assets/images/Background_images/portrait/background_image5.jpg'), rating: '8.9', year: '1994', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
        { id: '18', title: 'Fight Club', image: require('../../assets/images/Background_images/portrait/background_image6.jpg'), rating: '8.8', year: '1999', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' },
      ],
    },
    {
      id: '5',
      title: 'Upcoming',
      movies: [
        { id: '19', title: 'Avatar 3', image: require('../../assets/images/Background_images/portrait/background_image.jpg'), rating: 'N/A', year: '2025', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' },
        { id: '20', title: 'Captain America: Brave New World', image: require('../../assets/images/Background_images/portrait/background_image2.jpg'), rating: 'N/A', year: '2025', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
        { id: '21', title: 'Thunderbolts', image: require('../../assets/images/Background_images/portrait/background_image3.jpg'), rating: 'N/A', year: '2025', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4' },
        { id: '22', title: 'Mission: Impossible 8', image: require('../../assets/images/Background_images/portrait/background_image4.jpg'), rating: 'N/A', year: '2025', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4' },
      ],
    },
    {
      id: '6',
      title: 'Latest',
      movies: [
        { id: '23', title: 'Wicked', image: require('../../assets/images/Background_images/portrait/background_image5.jpg'), rating: '7.4', year: '2024', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4' },
        { id: '24', title: 'Gladiator II', image: require('../../assets/images/Background_images/portrait/background_image6.jpg'), rating: '7.1', year: '2024', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        { id: '25', title: 'Moana 2', image: require('../../assets/images/Background_images/portrait/background_image.jpg'), rating: '7.0', year: '2024', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
        { id: '26', title: 'Red One', image: require('../../assets/images/Background_images/portrait/background_image2.jpg'), rating: '6.8', year: '2024', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      ],
    },
    {
      id: '7',
      title: 'Recommendations',
      movies: [
        { id: '27', title: 'Interstellar', image: require('../../assets/images/Background_images/portrait/background_image3.jpg'), rating: '8.6', year: '2014', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
        { id: '28', title: 'The Matrix', image: require('../../assets/images/Background_images/portrait/background_image4.jpg'), rating: '8.7', year: '1999', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
        { id: '29', title: 'Parasite', image: require('../../assets/images/Background_images/portrait/background_image5.jpg'), rating: '8.5', year: '2019', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
        { id: '30', title: 'Mad Max: Fury Road', image: require('../../assets/images/Background_images/portrait/background_image6.jpg'), rating: '8.1', year: '2015', videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
      ],
    },
  ];

  const flatListRef = useRef<FlatList<FeaturedMovie>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % featuredMovies.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 8000);

    return () => clearInterval(timer);
  }, [currentIndex, featuredMovies.length]);

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / screenWidth);
    setCurrentIndex(newIndex);
  };

  const renderFeaturedMovie: ListRenderItem<FeaturedMovie> = ({ item }) => (
    <View style={[styles.featuredContainer, { width: screenWidth }]}>
      <Image
        source={item.image}
        style={styles.featuredImage}
        defaultSource={{ uri: 'https://via.placeholder.com/300x300' }}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)', background]}
        style={styles.featuredGradient}
      />
      <View style={styles.featuredTextContainer}>
        <Text style={[styles.featuredTitle, { color: textPrimary }]}>{item.title}</Text>
        <View style={styles.featuredInfo}>
          <Text style={[styles.featuredGenre, { color: textSecondary }]}>{item.genre}</Text>
          <Text style={styles.featuredRating}>⭐ {item.rating}</Text>
          <Text style={[styles.featuredYear, { color: textSecondary }]}>{item.year}</Text>
        </View>
        <View style={styles.featuredButtons}>
          <TouchableOpacity
            style={[styles.playButton, { backgroundColor: accent }]}
            onPress={() => router.push({ pathname: '/watch', params: { uri: item.videoUri, title: item.title } })}
          >
            <FontAwesome name="play" color="white" size={16} />
            <Text style={[styles.playButtonText, { color: textPrimary }]}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton}>
            <FontAwesome name="plus" color={textPrimary} size={16} />
            <Text style={[styles.addButtonText, { color: textPrimary }]}>My List</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderMovieItem = (movie: MovieCategory['movies'][number]) => (
    <TouchableOpacity
      key={movie.id}
      style={styles.movieItem}
      onPress={() => router.push({ pathname: '/watch', params: { uri: movie.videoUri, title: movie.title } })}
    >
      <Image source={movie.image} style={styles.movieImage} />
      <LinearGradient colors={['transparent', 'rgba(0,0,0,0.9)']} style={styles.movieGradient} />
      <View style={styles.movieInfo}>
        <Text style={[styles.movieTitle, { color: textPrimary }]}>{movie.title}</Text>
        {movie.rating && <Text style={styles.movieRating}>⭐ {movie.rating}</Text>}
        {movie.year && <Text style={[styles.movieYear, { color: textSecondary }]}>{movie.year}</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: background }]} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/downloadscreen')}>
            <FontAwesome name="download" size={20} color={textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: textPrimary }]}>Movies</Text>
          <TouchableOpacity onPress={() => router.push('/Profile')}>
            <View style={[styles.profileContainer, { backgroundColor: surface, borderColor: border }]}>
              <Image style={styles.profileImage} source={require('../../assets/images/Background_images/portrait/background_image.jpg')} />
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreContainer} contentContainerStyle={styles.genreContent}>
          <TouchableOpacity
            style={[styles.genreButton, { backgroundColor: surface }, selectedGenre === null && { backgroundColor: accent }]}
            onPress={() => setSelectedGenre(null)}
          >
            <Text style={[styles.genreText, { color: textSecondary }, selectedGenre === null && { color: textPrimary, fontWeight: 'bold' }]}>
              All
            </Text>
          </TouchableOpacity>
          {genres.map((genre) => (
            <TouchableOpacity
              key={genre.id}
              style={[styles.genreButton, { backgroundColor: surface }, selectedGenre === genre.id && { backgroundColor: accent }]}
              onPress={() => setSelectedGenre(genre.id)}
            >
              <Text style={[styles.genreText, { color: textSecondary }, selectedGenre === genre.id && { color: textPrimary, fontWeight: 'bold' }]}>
                {genre.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.featuredSection}>
          <Text style={[styles.sectionTitle, { color: textPrimary }]}>Featured Movies</Text>
          <FlatList
            ref={flatListRef}
            data={featuredMovies}
            renderItem={renderFeaturedMovie}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleMomentumScrollEnd}
            style={styles.featuredCarousel}
          />
          <View style={styles.indicators}>
            {featuredMovies.map((_, index: number) => (
              <View
                key={index}
                style={[styles.indicator, { backgroundColor: currentIndex === index ? accent : textSecondary }]}
              />
            ))}
          </View>
        </View>

        {movieCategories.map((category) => (
          <View key={category.id} style={styles.categorySection}>
            <View style={styles.categoryHeader}>
              <Text style={[styles.sectionTitle, { color: textPrimary }]}>{category.title}</Text>
              <TouchableOpacity>
                <Text style={[styles.seeAllText, { color: accent }]}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll} contentContainerStyle={styles.categoryContent}>
              {category.movies.map(renderMovieItem)}
            </ScrollView>
          </View>
        ))}
      </ScrollView>

      <StatusBar backgroundColor={background} barStyle="light-content" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  profileContainer: { overflow: 'hidden', width: 30, height: 30, borderRadius: 50, borderWidth: 2 },
  profileImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  genreContainer: { marginBottom: 20 },
  genreContent: { paddingHorizontal: 20 },
  genreButton: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, marginRight: 10 },
  genreText: { fontSize: 14 },
  featuredSection: { marginBottom: 25 },
  featuredCarousel: { height: 250 },
  featuredContainer: { height: 250, position: 'relative' },
  featuredImage: { height: '100%', width: '100%', resizeMode: 'cover' },
  featuredGradient: { position: 'absolute', bottom: 0, width: '100%', height: 120 },
  featuredTextContainer: { position: 'absolute', bottom: 15, left: 20, right: 20 },
  featuredTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  featuredInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  featuredGenre: { fontSize: 14, marginRight: 15 },
  featuredRating: { color: '#FFD700', fontSize: 14, marginRight: 15 },
  featuredYear: { fontSize: 14 },
  featuredButtons: { flexDirection: 'row', alignItems: 'center' },
  playButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 5, marginRight: 15 },
  playButtonText: { fontSize: 14, fontWeight: 'bold', marginLeft: 5 },
  addButton: { flexDirection: 'row', alignItems: 'center' },
  addButtonText: { fontSize: 14, marginLeft: 5 },
  indicators: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  indicator: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 3 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 20, marginBottom: 15 },
  categorySection: { marginBottom: 25 },
  categoryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 15 },
  seeAllText: { fontSize: 14 },
  categoryScroll: { paddingLeft: 20 },
  categoryContent: { paddingRight: 20 },
  movieItem: { width: 120, height: 180, borderRadius: 10, overflow: 'hidden', marginRight: 15, position: 'relative' },
  movieImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  movieGradient: { position: 'absolute', bottom: 0, width: '100%', height: 60 },
  movieInfo: { position: 'absolute', bottom: 8, left: 8, right: 8 },
  movieTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 2 },
  movieRating: { color: '#FFD700', fontSize: 10, marginBottom: 2 },
  movieYear: { fontSize: 10 },
});

export default Movies;
