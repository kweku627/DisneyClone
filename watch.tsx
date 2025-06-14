import { useRouter, useLocalSearchParams } from 'expo-router';
import { VideoView, useVideoPlayer } from 'expo-video';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, TextInput, FlatList, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../components/ThemeProvider';
import { useEffect, useRef, useMemo, useState, useCallback } from 'react';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  clamp,
} from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';

interface Theme {
  background: string;
  textPrimary: string;
  accent: string;
  textSecondary: string;
  surface: string;
}

interface Comment {
  id: string;
  user: string;
  text: string;
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface RelatedItem {
  id: string;
  title: string;
  image: any;
  videoUri: string;
  views: number;
  rating: number;
  runtime: number;
}

interface MovieData {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  poster_path: string;
  backdrop_path: string;
  cast?: CastMember[];
  runtime?: number;
}

const tabs = ['Description', 'Comments', 'Cast', 'Related'] as const;
type TabType = typeof tabs[number];

const Watch = () => {
  const { background, textPrimary, textSecondary, accent, surface } = useTheme() as Theme;
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{ uri?: string; title?: string; movieData?: string }>();
  const { uri, title, movieData } = params;
  const playerRef = useRef<ReturnType<typeof useVideoPlayer> | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('Description');
  const [newComment, setNewComment] = useState('');
  const [userRating, setUserRating] = useState<number>(0);
  const [snackBarVisible, setSnackBarVisible] = useState<boolean>(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([
    { id: '1', user: 'User1', text: 'Great movie! Loved the action scenes.' },
    { id: '2', user: 'User2', text: 'The plot twist was amazing!' },
  ]);
  const [savedItems, setSavedItems] = useState<string[]>([]);

  // Swipe animation
  const translateX = useSharedValue(0);
  const { width: screenWidth } = Dimensions.get('window');

  // Parse movie data
  const movie: MovieData = movieData
    ? JSON.parse(movieData)
    : {
        id: 1376434,
        title: 'Predator: Killer of Killers',
        overview:
          'This original animated anthology follows three of the fiercest warriors in human history: a Viking raider guiding her young son on a bloody quest for revenge, a ninja in feudal Japan who turns against his Samurai brother in a brutal battle for succession, and a WWII pilot who takes to the sky to investigate an otherworldly threat to the Allied cause.',
        release_date: '2025-06-05',
        vote_average: 8.0,
        genre_ids: [16, 28, 878],
        poster_path: '/lbimIPTVsSlnmqSW5ngEsUxtHLM.jpg',
        backdrop_path: '/a3F9cXjRH488qcOqFmFZwqawBMU.jpg',
        runtime: 135,
      };

  const videoUri = useMemo(() => uri || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', [uri]);
  const videoTitle = title || movie.title;

  const player = useVideoPlayer(videoUri, player => {
    player.loop = true;
    player.play();
    playerRef.current = player;
  });

  // Genre mapping
  const genres: { [key: number]: string } = {
    16: 'Animation',
    28: 'Action',
    878: 'Science Fiction',
  };

  const genreNames = movie.genre_ids.map(id => genres[id] || 'Unknown').join(', ');
  const releaseYear = new Date(movie.release_date).getFullYear().toString();
  const rating = movie.vote_average.toFixed(1);

  // Cast data
  const cast: CastMember[] = movie.cast || [
    {
      id: 6384,
      name: 'Keanu Reeves',
      character: 'Viking Raider',
      profile_path: '/8RZLOyYGsoRe9p44q3xin9QkMHv.jpg',
    },
    {
      id: 1000,
      name: 'Actor 2',
      character: 'Ninja Warrior',
      profile_path: null,
    },
    {
      id: 1001,
      name: 'Actor 3',
      character: 'WWII Pilot',
      profile_path: null,
    },
  ];

  // Related items
  const relatedItems: RelatedItem[] = [
    {
      id: '1',
      title: 'The Matrix',
      image: require('../assets/images/Background_images/portrait/background_image4.jpg'),
      videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      views: 1200000,
      rating: 8.7,
      runtime: 136,
    },
    {
      id: '2',
      title: 'Alien: Romulus',
      image: require('../assets/images/Background_images/portrait/background_image5.jpg'),
      videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      views: 800000,
      rating: 7.5,
      runtime: 119,
    },
    {
      id: '3',
      title: 'Interstellar',
      image: require('../assets/images/Background_images/portrait/background_image6.jpg'),
      videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      views: 2000000,
      rating: 8.6,
      runtime: 169,
    },
  ];

  // Pause video when screen loses focus
  useFocusEffect(
    useCallback(() => {
      return () => {
        if (playerRef.current) {
          try {
            playerRef.current.pause();
          } catch (error) {
            console.warn('Error pausing video on blur:', error);
          }
        }
      };
    }, []),
  );

  // Cleanup player on unmount
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.pause();
          playerRef.current.replace(null); // Clear video source
        } catch (error) {
          console.warn('Error cleaning up video player:', error);
        } finally {
          playerRef.current = null;
        }
      }
    };
  }, []);

  // Snack bar auto-dismiss
  useEffect(() => {
    if (snackBarVisible) {
      const timer = setTimeout(() => {
        setSnackBarVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [snackBarVisible]);

  const showSnackBar = (message: string) => {
    setSnackBarMessage(message);
    setSnackBarVisible(true);
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    const newCommentObj: Comment = {
      id: `${comments.length + 1}`,
      user: 'CurrentUser',
      text: newComment.trim(),
    };
    setComments([...comments, newCommentObj]);
    setNewComment('');
    showSnackBar('Comment sent');
    console.log('Saving comment:', newCommentObj);
  };

  const toggleSaveItem = (id: string) => {
    setSavedItems(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const formatViews = (views: number): string => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Handle star rating click
  const handleRating = (rating: number) => {
    setUserRating(rating);
    console.log(`User selected ${rating} stars (${rating * 20}%)`);
  };

  // Handle rate button click
  const handleRateSubmit = () => {
    showSnackBar('Movie rated');
    console.log(`Movie rated ${userRating} stars (${userRating * 20}%)`);
  };

  // Swipe gesture handler
  const onPanGesture = (event: PanGestureHandlerGestureEvent) => {
    'worklet';
    const { translationX, state } = event.nativeEvent;
    const currentIndex = tabs.indexOf(activeTab);

    if (state === 5) { // State.END
      const swipeThreshold = screenWidth / 4;
      let newIndex = currentIndex;

      if (translationX > swipeThreshold && currentIndex > 0) {
        newIndex = currentIndex - 1;
      } else if (translationX < -swipeThreshold && currentIndex < tabs.length - 1) {
        newIndex = currentIndex + 1;
      }

      translateX.value = withSpring(-newIndex * screenWidth, { stiffness: 100, damping: 15 });
      runOnJS(setActiveTab)(tabs[newIndex]);
    } else if (state === 4) { // State.ACTIVE
      const newTranslateX = -currentIndex * screenWidth + translationX;
      translateX.value = clamp(newTranslateX, -(tabs.length - 1) * screenWidth, 0);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      flexDirection: 'row' as const,
    };
  });

  const renderTabContent = (tab: TabType) => {
    switch (tab) {
      case 'Comments':
        return (
          <View style={[styles.tabContent, { width: screenWidth }]}>
            <View style={styles.contentSection}>
              <View style={styles.commentInputContainer}>
                <TextInput
                  style={[styles.commentInput, {
                    backgroundColor: surface,
                    color: textPrimary,
                    borderColor: textSecondary,
                  }]}
                  placeholder="Add a comment..."
                  placeholderTextColor={textSecondary}
                  value={newComment}
                  onChangeText={setNewComment}
                  multiline
                  maxLength={500}
                />
                <TouchableOpacity
                  style={[styles.postButton, { backgroundColor: accent }]}
                  onPress={handleCommentSubmit}
                >
                  <Text style={[styles.postButtonText, { color: background }]}>Post</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                data={comments}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                style={styles.commentsList}
                renderItem={({ item }) => (
                  <View style={[styles.commentCard, { backgroundColor: surface }]}>
                    <Text style={[styles.commentUsername, { color: accent }]}>{item.user}</Text>
                    <Text style={[styles.commentContent, { color: textPrimary }]}>{item.text}</Text>
                  </View>
                )}
              />
            </View>
          </View>
        );

      case 'Description':
        return (
          <View style={[styles.tabContent, { width: screenWidth }]}>
            <View style={styles.contentSection}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={[styles.descriptionTitle, { color: textPrimary }]}>About {videoTitle}</Text>
                <Text style={[styles.descriptionBody, { color: textSecondary }]}>
                  {movie.overview}
                  {'\n\n'}
                  <Text style={{ fontWeight: 'bold' }}>Genres:</Text> {genreNames}
                  {'\n'}
                  <Text style={{ fontWeight: 'bold' }}>Release Year:</Text> {releaseYear}
                  {'\n'}
                  <Text style={{ fontWeight: 'bold' }}>Rating:</Text> ⭐ {rating}
                </Text>
                {/* Star Rating Component */}
                <View style={styles.ratingContainer}>
                  <Text style={[styles.ratingLabel, { color: textPrimary }]}>Rate this movie</Text>
                  <View style={styles.starsContainer}>
                    <View style={styles.starsWrapper}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <TouchableOpacity
                          key={star}
                          onPress={() => handleRating(star)}
                          activeOpacity={0.7}
                        >
                          <FontAwesome
                            name={star <= userRating ? 'star' : 'star-o'}
                            size={24}
                            color={star <= userRating ? '#FFD700' : textSecondary}
                            style={styles.star}
                          />
                        </TouchableOpacity>
                      ))}
                    </View>
                    {userRating > 0 && (
                      <TouchableOpacity
                        style={[styles.rateButton, { backgroundColor: accent }]}
                        onPress={handleRateSubmit}
                        activeOpacity={0.7}
                      >
                        <Text style={[styles.rateButtonText, { color: background }]}>Rate</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <Text style={[styles.ratingPercentage, { color: textSecondary }]}>
                    {userRating * 20}% ({userRating}/5)
                  </Text>
                </View>
              </ScrollView>
            </View>
          </View>
        );

      case 'Cast':
        return (
          <View style={[styles.tabContent, { width: screenWidth }]}>
            <View style={styles.contentSection}>
              <Text style={[styles.sectionTitle, { color: textPrimary }]}>Cast & Crew</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                {cast.map(member => (
                  <View key={member.id} style={styles.castCard}>
                    <Image
                      source={
                        member.profile_path
                          ? { uri: `https://image.tmdb.org/t/p/w200${member.profile_path}` }
                          : { uri: 'https://via.placeholder.com/80' }
                      }
                      style={styles.castPhoto}
                    />
                    <Text style={[styles.castActorName, { color: textPrimary }]}>{member.name}</Text>
                    <Text style={[styles.castCharacter, { color: textSecondary }]}>as {member.character}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        );

      case 'Related':
        return (
          <View style={[styles.tabContent, { width: screenWidth }]}>
            <View style={styles.contentSection}>
              <Text style={[styles.sectionTitle, { color: textPrimary }]}>You Might Also Like</Text>
              <ScrollView showsVerticalScrollIndicator={false} style={styles.verticalScroll}>
                {relatedItems.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.relatedTile, { backgroundColor: surface }]}
                    onPress={() => {
                      // Pause current video before navigating
                      if (playerRef.current) {
                        try {
                          playerRef.current.pause();
                        } catch (error) {
                          console.warn('Error pausing video before navigation:', error);
                        }
                      }
                      router.replace({ pathname: '/watch', params: { uri: item.videoUri, title: item.title } });
                    }}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                      style={styles.relatedAvatar}
                    />
                    <View style={styles.relatedTextContainer}>
                      <Text style={[styles.relatedTitle, { color: textPrimary }]} numberOfLines={1}>
                        {item.title} ({formatRuntime(item.runtime)})
                      </Text>
                      <Text style={[styles.relatedSubtitle, { color: textSecondary }]} numberOfLines={1}>
                        {formatViews(item.views)} views • ⭐ {item.rating.toFixed(1)}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.saveIcon}
                      onPress={() => toggleSaveItem(item.id)}
                    >
                      <FontAwesome
                        name={savedItems.includes(item.id) ? 'bookmark' : 'bookmark-o'}
                        size={20}
                        color={accent}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  if (!uri) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
        <View style={styles.errorContainer}>
          <FontAwesome name="exclamation-triangle" size={48} color={textSecondary} />
          <Text style={[styles.errorMessage, { color: textPrimary }]}>
            No Video Selected
          </Text>
          <Text style={[styles.errorSubMessage, { color: textSecondary }]}>
            Please select a video from the Movies screen.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
      {/* Video Player with Watermark */}
      <View style={styles.videoContainer}>
        <VideoView
          style={styles.videoPlayer}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          nativeControls={true}
        />
        <View style={styles.watermarkContainer}>
          <View style={styles.watermarkContent}>
            <FontAwesome name="play-circle" size={24} color="rgba(255,255,255,0.9)" />
            <Text style={styles.watermarkTitle} numberOfLines={1}>
              {videoTitle}
            </Text>
          </View>
        </View>
      </View>

      {/* Tabs and Content */}
      <View style={styles.bottomSection}>
        {/* Tab Navigation */}
        <View style={styles.tabNavigation}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabItem,
                activeTab === tab && [styles.activeTabItem, { borderBottomColor: accent }],
              ]}
              onPress={() => {
                const index = tabs.indexOf(tab);
                translateX.value = withSpring(-index * screenWidth, { stiffness: 100, damping: 15 });
                setActiveTab(tab);
              }}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabLabel, { color: activeTab === tab ? accent : textSecondary }]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Swipeable Tab Content */}
        <PanGestureHandler onGestureEvent={onPanGesture}>
          <Animated.View style={[styles.swipeContainer, animatedStyle]}>
            {tabs.map(tab => renderTabContent(tab))}
          </Animated.View>
        </PanGestureHandler>

        {/* Snack Bar */}
        {snackBarVisible && (
          <View style={styles.snackBar}>
            <FontAwesome name="check-circle" size={20} color="#4CAF50" style={styles.snackBarIcon} />
            <Text style={[styles.snackBarText, { color: '#FFFFFF' }]}>{snackBarMessage}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    width: width,
    height: width * 0.5625, // 16:9 aspect ratio
    backgroundColor: '#000',
    position: 'relative',
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
  },
  watermarkContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxWidth: width * 0.7,
  },
  watermarkContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  watermarkTitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  bottomSection: {
    flex: 1,
    position: 'relative',
  },
  tabNavigation: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 6,
  },
  tabItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabItem: {
    borderBottomWidth: 2,
  },
  tabLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  swipeContainer: {
    flex: 1,
    width: width * tabs.length,
  },
  tabContent: {
    flex: 1,
  },
  contentSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 12,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    minHeight: 44,
    maxHeight: 100,
  },
  postButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
    minHeight: 44,
  },
  postButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  commentsList: {
    flex: 1,
  },
  commentCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  commentUsername: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  commentContent: {
    fontSize: 15,
    lineHeight: 20,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  descriptionBody: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  ratingContainer: {
    marginTop: 16,
    marginBottom: 20,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  starsWrapper: {
    flexDirection: 'row',
  },
  star: {
    marginRight: 8,
  },
  rateButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rateButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  ratingPercentage: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  horizontalScroll: {
    flex: 1,
  },
  verticalScroll: {
    flex: 1,
  },
  castCard: {
    width: 100,
    marginRight: 16,
    alignItems: 'center',
  },
  castPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  castActorName: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 16,
  },
  castCharacter: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 14,
  },
  relatedTile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    width: '100%',
    height: 80,
    backgroundColor: "#000",
  },
  relatedAvatar: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  relatedTextContainer: {
    flex: 1,
  },
  relatedTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  relatedSubtitle: {
    fontSize: 13,
  },
  saveIcon: {
    padding: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    gap: 16,
  },
  errorMessage: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  errorSubMessage: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  snackBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  snackBarIcon: {
    marginRight: 8,
  },
  snackBarText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Watch;