import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, ListRenderItem, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../../components/ThemeProvider';

interface FeaturedSeries {
  id: string;
  title: string;
  genre: string;
  rating: string;
  seasons: string;
  status: string;
  image: any;
  videoUri: string;
}

interface SeriesCategory {
  id: string;
  title: string;
  series: {
    id: string;
    title: string;
    image: any;
    rating?: string;
    seasons?: string;
    videoUri: string;
    genre?: string;
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
  name: string;
}

const Series = () => {
  const { primary, background, textPrimary, textSecondary, accent, surface, border } = useTheme() as Theme;
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null); // Store genre name or null for "All"
  const router = useRouter();

  const genres: Genre[] = [
    { name: 'Action' },
    { name: 'Comedy' },
    { name: 'Drama' },
    { name: 'Sci-Fi' },
    { name: 'Crime' },
    { name: 'Fantasy' },
    { name: 'Mystery' },
    { name: 'Thriller' },
  ];

  const featuredSeries: FeaturedSeries[] = [
    {
      id: '1',
      title: 'Stranger Things',
      genre: 'Sci-Fi',
      rating: '8.7',
      seasons: '4 Seasons',
      status: 'Ongoing',
      image: require('../../assets/images/Background_images/LandScape/stranger_things.jpg'),
      videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      id: '2',
      title: 'The Witcher',
      genre: 'Fantasy',
      rating: '8.2',
      seasons: '3 Seasons',
      status: 'Ongoing',
      image: require('../../assets/images/Background_images/LandScape/background_image.jpg'),
      videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    },
    {
      id: '3',
      title: 'Breaking Bad',
      genre: 'Crime',
      rating: '9.5',
      seasons: '5 Seasons',
      status: 'Completed',
      image: require('../../assets/images/Background_images/LandScape/moana.jpg'),
      videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
  ];

  const seriesCategories: SeriesCategory[] = [
    {
      id: '1',
      title: 'Trending Series',
      series: [
        {
          id: '1',
          title: 'House of the Dragon',
          image: require('../../assets/images/Background_images/portrait/background_image.jpg'),
          rating: '8.5',
          seasons: '2',
          videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
          genre: 'Fantasy',
        },
        {
          id: '2',
          title: 'The Boys',
          image: require('../../assets/images/Background_images/portrait/background_image2.jpg'),
          rating: '8.7',
          seasons: '4',
          videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
          genre: 'Action',
        },
        {
          id: '3',
          title: 'Wednesday',
          image: require('../../assets/images/Background_images/portrait/background_image3.jpg'),
          rating: '8.1',
          seasons: '1',
          videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
          genre: 'Mystery',
        },
        {
          id: '4',
          title: 'Euphoria',
          image: require('../../assets/images/Background_images/portrait/background_image4.jpg'),
          rating: '8.4',
          seasons: '2',
          videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
          genre: 'Drama',
        },
        {
          id: '5',
          title: 'The Crown',
          image: require('../../assets/images/Background_images/portrait/background_image5.jpg'),
          rating: '8.6',
          seasons: '6',
          videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
          genre: 'Drama',
        },
        {
          id: '6',
          title: 'Ozark',
          image: require('../../assets/images/Background_images/portrait/background_image6.jpg'),
          rating: '8.5',
          seasons: '4',
          videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
          genre: 'Crime',
        },
      ],
    },
    {
      id: '2',
      title: 'Action & Adventure',
      series: [
        {
          id: '7',
          title: 'The Mandalorian',
          image: require('../../assets/images/Background_images/portrait/background_image7.jpg'),
          rating: '8.7',
          seasons: '3',
          videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
          genre: 'Action',
        },
        {
          id: '8',
          title: 'Vikings',
          image: require('../../assets/images/Background_images/portrait/background_image8.jpg'),
          rating: '8.5',
          seasons: '6',
          videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
          genre: 'Action',
        },
        {
          id: '9',
          title: 'The Walking Dead',
          image: require('../../assets/images/Background_images/portrait/background_image9.jpg'),
          rating: '8.2',
          seasons: '11',
          videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
          genre: 'Action',
        },
        {
          id: '10',
          title: 'Game of Thrones',
          image: require('../../assets/images/Background_images/portrait/background_image.jpg'),
          rating: '9.3',
          seasons: '8',
          videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
          genre: 'Fantasy',
        },
        {
          id: '11',
          title: 'Peaky Blinders',
          image: require('../../assets/images/Background_images/portrait/background_image2.jpg'),
          rating: '8.8',
          seasons: '6',
          videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          genre: 'Crime',
        },
      ],
    },
    {
      id: '3',
      title: 'Comedy Series',
      series: [
        {
          id: '12',
          title: 'The Office',
          image: require('../../assets/images/Background_images/portrait/background_image3.jpg'),
          rating: '9.0',
          seasons: '9',
          videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          genre: 'Comedy',
        },
        {
          id: '13',
          title: 'Friends',
          image: require('../../assets/images/Background_images/portrait/background_image4.jpg'),
          rating: '8.9',
          seasons: '10',
          videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          genre: 'Comedy',
        },
        {
          id: '14',
          title: 'Brooklyn Nine-Nine',
          image: require('../../assets/images/Background_images/portrait/background_image5.jpg'),
          rating: '8.4',
          seasons: '8',
          videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
          genre: 'Comedy',
        },
        {
          id: '15',
          title: 'Parks and Recreation',
          image: require('../../assets/images/Background_images/portrait/background_image6.jpg'),
          rating: '8.6',
          seasons: '7',
          videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
          genre: 'Comedy',
        },
      ],
    },
    {
      id: '4',
      title: 'Mystery & Thriller',
      series: [
        {
          id: '16',
          title: 'Dark',
          image: require('../../assets/images/Background_images/portrait/background_image7.jpg'),
          rating: '8.8',
          seasons: '3',
          videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
          genre: 'Mystery',
        },
        {
          id: '17',
          title: 'Sherlock',
          image: require('../../assets/images/Background_images/portrait/background_image8.jpg'),
          rating: '9.1',
          seasons: '4',
          videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
          genre: 'Mystery',
        },
        {
          id: '18',
          title: 'Mindhunter',
          image: require('../../assets/images/Background_images/portrait/background_image9.jpg'),
          rating: '8.6',
          seasons: '2',
          videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
          genre: 'Thriller',
        },
        {
          id: '19',
          title: 'True Detective',
          image: require('../../assets/images/Background_images/portrait/background_image.jpg'),
          rating: '8.9',
          seasons: '4',
          videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
          genre: 'Mystery',
        },
      ],
    },
    {
      id: '5',
      title: 'Recently Added',
      series: [
        {
          id: '20',
          title: 'The Last of Us',
          image: require('../../assets/images/Background_images/portrait/background_image2.jpg'),
          rating: '8.9',
          seasons: '1',
          videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
          genre: 'Drama',
        },
        {
          id: '21',
          title: 'House of Cards',
          image: require('../../assets/images/Background_images/portrait/background_image3.jpg'),
          rating: '8.7',
          seasons: '6',
          videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
          genre: 'Drama',
        },
        {
          id: '22',
          title: 'Narcos',
          image: require('../../assets/images/Background_images/portrait/background_image4.jpg'),
          rating: '8.8',
          seasons: '3',
          videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
          genre: 'Crime',
        },
        {
          id: '23',
          title: 'Black Mirror',
          image: require('../../assets/images/Background_images/portrait/background_image5.jpg'),
          rating: '8.8',
          seasons: '6',
          videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
          genre: 'Sci-Fi',
        },
      ],
    },
  ];

  const flatListRef = useRef<FlatList<FeaturedSeries>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % featuredSeries.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 8000);

    return () => clearInterval(timer);
  }, [currentIndex, featuredSeries.length]);

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / screenWidth);
    setCurrentIndex(newIndex);
  };

  const renderFeaturedSeries: ListRenderItem<FeaturedSeries> = ({ item }) => (
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
          <Text style={[styles.featuredSeasons, { color: textSecondary }]}>{item.seasons}</Text>
        </View>
        <View style={styles.featuredButtons}>
          <TouchableOpacity
            style={[styles.playButton, { backgroundColor: accent }]}
            onPress={() => router.push({ pathname: '/WatchSeries', params: { uri: item.videoUri, title: item.title } })}
          >
            <FontAwesome name="play" color="white" size={16} />
            <Text style={[styles.playButtonText, { color: textPrimary }]}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton}>
            <FontAwesome name="plus" color={textPrimary} size= {16} />
            <Text style={[styles.addButtonText, { color: textPrimary }]}>My List</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderSeriesItem = (series: SeriesCategory['series'][number]) => (
    <TouchableOpacity
      key={series.id}
      style={styles.seriesItem}
      onPress={() => router.push({ pathname: '/WatchSeries', params: { uri: series.videoUri, title: series.title } })}
    >
      <Image source={series.image} style={styles.seriesImage} />
      <LinearGradient colors={['transparent', 'rgba(0,0,0,0.9)']} style={styles.seriesGradient} />
      <View style={styles.seriesInfo}>
        <Text style={[styles.seriesTitle, { color: textPrimary }]}>{series.title}</Text>
        {series.rating && <Text style={styles.seriesRating}>⭐ {series.rating}</Text>}
        {series.seasons && <Text style={[styles.seriesSeasons, { color: textSecondary }]}>{series.seasons} Seasons</Text>}
      </View>
    </TouchableOpacity>
  );

  const filteredCategories = seriesCategories.map((category) => ({
    ...category,
    series: selectedGenre === null ? category.series : category.series.filter((series) => series.genre === selectedGenre),
  }));

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: background }]} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/downloadscreen')}>
            <FontAwesome name="download" size={20} color={textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: textPrimary }]}>Series</Text>
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
              key={genre.name}
              style={[styles.genreButton, { backgroundColor: surface }, selectedGenre === genre.name && { backgroundColor: accent }]}
              onPress={() => setSelectedGenre(genre.name)}
            >
              <Text style={[styles.genreText, { color: textSecondary }, selectedGenre === genre.name && { color: textPrimary, fontWeight: 'bold' }]}>
                {genre.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.featuredSection}>
          <Text style={[styles.sectionTitle, { color: textPrimary }]}>Featured Series</Text>
          <FlatList
            ref={flatListRef}
            data={featuredSeries}
            renderItem={renderFeaturedSeries}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleMomentumScrollEnd}
            style={styles.featuredCarousel}
          />
          <View style={styles.indicators}>
            {featuredSeries.map((_, index: number) => (
              <View
                key={index}
                style={[styles.indicator, { backgroundColor: currentIndex === index ? accent : textSecondary }]}
              />
            ))}
          </View>
        </View>

        {filteredCategories.map((category) => (
          <View key={category.id} style={styles.categorySection}>
            <View style={styles.categoryHeader}>
              <Text style={[styles.sectionTitle, { color: textPrimary }]}>{category.title}</Text>
              <TouchableOpacity>
                <Text style={[styles.seeAllText, { color: accent }]}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll} contentContainerStyle={styles.categoryContent}>
              {category.series.map(renderSeriesItem)}
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
  featuredSeasons: { fontSize: 14 },
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
  seriesItem: { width: 120, height: 180, borderRadius: 10, overflow: 'hidden', marginRight: 15, position: 'relative' },
  seriesImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  seriesGradient: { position: 'absolute', bottom: 0, width: '100%', height: 60 },
  seriesInfo: { position: 'absolute', bottom: 8, left: 8, right: 8 },
  seriesTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 2 },
  seriesRating: { color: '#FFD700', fontSize: 10, marginBottom: 2 },
  seriesSeasons: { fontSize: 10 },
});

export default Series;