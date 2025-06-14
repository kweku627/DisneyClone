import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform, Image, AppState } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { Easing, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { Asset } from 'expo-asset';
import { useTheme } from '../../components/ThemeProvider';
import { useFocusEffect } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

interface Trailer {
  id: string;
  title: string;
  genre: string;
  rating: string;
  videoUri: string;
  duration: number;
  description: string;
}

const TrailerScreen: React.FC = () => {
  const { primary, background, textPrimary, textSecondary, accent, border } = useTheme();
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState<boolean>(false);
  const [isScreenFocused, setIsScreenFocused] = useState<boolean>(true);
  const [isFollowing, setIsFollowing] = useState<boolean>(false); // State for follow button

  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight(); // Get tab bar height
  const screenHeight = Dimensions.get('window').height - insets.top - Math.max(insets.bottom, tabBarHeight);

  const flatListRef = useRef<FlatList>(null);
  const videoRefs = useRef<(Video | null)[]>([]);
  const overlayOpacity = useSharedValue(0);
  const descriptionHeight = useSharedValue(0);

  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const descriptionAnimatedStyle = useAnimatedStyle(() => ({
    height: descriptionHeight.value,
  }));

  const trailers: Trailer[] = [
    {
      id: '1',
      title: 'Action Movie 1',
      genre: 'Action',
      rating: '8.5/10',
      videoUri: Asset.fromModule(require('../../assets/videos/trailers/trailer_1.mp4')).uri,
      duration: 15,
      description: 'An explosive action-packed thriller featuring high-stakes chases and intense combat scenes. Follow the hero as he battles a global conspiracy to save the world.',
    },
    {
      id: '2',
      title: 'Comedy Movie 2',
      genre: 'Comedy',
      rating: '7.8/10',
      videoUri: Asset.fromModule(require('../../assets/videos/trailers/trailer_3.mp4')).uri,
      duration: 15,
      description: 'A hilarious comedy about a group of misfits who stumble into absurd situations, delivering laugh-out-loud moments and heartwarming friendships.',
    },
    {
      id: '3',
      title: 'Drama Movie 3',
      genre: 'Drama',
      rating: '9.0/10',
      videoUri: Asset.fromModule(require('../../assets/videos/trailers/trailer_2.mp4')).uri,
      duration: 15,
      description: 'A deeply emotional drama exploring family dynamics and personal redemption, with stunning performances and a powerful narrative.',
    },
  ];

  // Handle screen focus/unfocus
  useFocusEffect(
    React.useCallback(() => {
      setIsScreenFocused(true);
      return () => {
        setIsScreenFocused(false);
        videoRefs.current.forEach((video) => {
          if (video && Platform.OS !== 'web') {
            video.pauseAsync();
          }
        });
      };
    }, [])
  );

  // Handle app state changes
  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        videoRefs.current.forEach((video) => {
          if (video && Platform.OS !== 'web') {
            video.pauseAsync();
          }
        });
      } else if (nextAppState === 'active' && isScreenFocused) {
        const currentVideo = videoRefs.current[currentIndex];
        if (currentVideo && Platform.OS !== 'web') {
          currentVideo.playAsync().catch((error) => console.error('Video play error:', error));
        }
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription?.remove();
  }, [currentIndex, isScreenFocused]);

  useEffect(() => {
    overlayOpacity.value = withTiming(1, { duration: 300, easing: Easing.ease });

    if (Platform.OS !== 'web' && isScreenFocused) {
      const currentVideo = videoRefs.current[currentIndex];
      if (currentVideo) {
        currentVideo.playAsync().catch((error) => console.error('Video play error:', error));
      }

      videoRefs.current.forEach((video, index) => {
        if (index !== currentIndex && video) {
          video.pauseAsync();
        }
      });
    }

    return () => {
      if (Platform.OS !== 'web') {
        const videoToPause = videoRefs.current[currentIndex];
        if (videoToPause) {
          videoToPause.pauseAsync();
        }
      }
    };
  }, [currentIndex, overlayOpacity, isScreenFocused]);

  useEffect(() => {
    descriptionHeight.value = withTiming(
      isDescriptionExpanded ? 80 : 0,
      { duration: 300, easing: Easing.ease }
    );
  }, [isDescriptionExpanded]);

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.height;
    const index = Math.round(event.nativeEvent.contentOffset.y / slideSize);
    if (index !== currentIndex && index >= 0 && index < trailers.length) {
      setCurrentIndex(index);
      setIsDescriptionExpanded(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing); // Toggle follow state
    // Add actual follow logic here (e.g., API call)
  };

  const renderTrailer = ({ item, index }: { item: Trailer; index: number }) => {
    const progressWidth = trailers.length > 1 ? (currentIndex / (trailers.length - 1)) * 100 : 0;

    return (
      <View style={[styles.videoContainer, { height: screenHeight }]}>
        <Video
          ref={(ref: Video | null) => {
            videoRefs.current[index] = ref;
          }}
          style={styles.video}
          source={{ uri: item.videoUri }}
          resizeMode={ResizeMode.COVER}
          isMuted={isMuted}
          shouldPlay={index === currentIndex && isScreenFocused}
          useNativeControls={false}
          onError={(error) => console.error(`Video error for ${item.title}:`, error)}
          onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
            if (status.isLoaded && status.durationMillis && status.positionMillis) {
              if (status.positionMillis >= status.durationMillis) {
                videoRefs.current[index]?.replayAsync().catch((error) => console.error('Replay error:', error));
              }
            }
          }}
        />
        <Animated.View style={[styles.overlay, overlayAnimatedStyle]}>
          <View style={styles.infoOverlay}>
            <Text style={[styles.titleText, { color: textPrimary }]}>{item.title}</Text>
            <Text style={[styles.detailsText, { color: textSecondary }]}>{item.genre} | {item.rating}</Text>
          </View>

          <View style={styles.controls}>
            <TouchableOpacity onPress={toggleMute} style={styles.controlButton}>
              <Ionicons name={isMuted ? 'volume-mute' : 'volume-high'} size={30} color={textPrimary} />
              <Text style={[styles.controlNumber, { color: textSecondary }]}>12</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton}>
              <Ionicons name="heart-outline" size={30} color={textPrimary} />
              <Text style={[styles.controlNumber, { color: textSecondary }]}>45</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton}>
              <Ionicons name="bookmark-outline" size={30} color={textPrimary} />
              <Text style={[styles.controlNumber, { color: textSecondary }]}>23</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton}>
              <Ionicons name="share-social-outline" size={30} color={textPrimary} />
              <Text style={[styles.controlNumber, { color: textSecondary }]}>17</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.bottomSection, { paddingBottom: Math.max(insets.bottom, tabBarHeight) }]}>
            <View style={styles.publisherContainer}>
              <View style={styles.publisherRow}>
                <View style={[styles.thumbnailContainer, { borderColor: border }]}>
                  <Image
                    source={require('../../assets/images/Background_images/portrait/background_image.jpg')}
                    style={styles.thumbnailImage}
                  />
                </View>
                <Text style={[styles.publisherText, { color: textPrimary }]}>Publisher Name</Text>
                <TouchableOpacity onPress={handleFollow} style={[styles.followButton, { borderColor: accent }]}>
                  <Text style={[styles.followButtonText, { color: accent }]}>
                    {isFollowing ? 'Following' : 'Follow'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={toggleDescription} style={styles.descriptionToggle}>
              <Text style={[styles.descriptionToggleText, { color:textSecondary }]}>{isDescriptionExpanded ? 'Collapse' : 'Description'}</Text>
            </TouchableOpacity>

            <Animated.View style={[styles.descriptionContainer, descriptionAnimatedStyle]}>
              {isDescriptionExpanded && (
                <Text style={[styles.descriptionText, { color: textSecondary }]}>{item.description}</Text>
              )}
            </Animated.View>
          </View>

          <View style={[styles.progressBar, { backgroundColor: textSecondary }]}>
            <View style={[styles.progress, { width: `${progressWidth}%`, backgroundColor: accent }]} />
          </View>
        </Animated.View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: background }]} edges={['top', 'bottom']}>
      <FlatList
        ref={flatListRef}
        data={trailers}
        renderItem={renderTrailer}
        keyExtractor={(item) => item.id}
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={3}
        removeClippedSubviews={true}
        initialScrollIndex={0}
        getItemLayout={(data, index) => ({
          length: screenHeight,
          offset: screenHeight * index,
          index,
        })}
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        snapToInterval={screenHeight}
        snapToAlignment="start"
        decelerationRate="fast"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  videoContainer: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    padding: 10,
    zIndex: 1,
  },
  infoOverlay: {
    alignItems: 'flex-start',
    marginTop: 10,
    zIndex: 2,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  detailsText: {
    fontSize: 14,
    marginTop: 5,
  },
  controls: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'absolute',
    zIndex: 3,
    right: 10,
    bottom: 120,
    alignItems: 'center',
  },
  controlButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  controlNumber: {
    fontSize: 12,
    marginTop: 5,
  },
  bottomSection: {
    marginBottom: 20,
    zIndex: 2,
  },
  publisherContainer: {
    marginBottom: 10,
  },
  publisherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  thumbnailContainer: {
    borderWidth: 2,
    height: 50,
    width: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  publisherText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  followButton: {
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  descriptionToggle: {
    marginBottom: 5,
  },
  descriptionToggleText: {
    fontSize: 14,
  },
  descriptionContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 18,
    padding: 8,
  },
  progressBar: {
    height: 3,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    zIndex: 2,
  },
  progress: {
    height: '100%',
  },
});

export default TrailerScreen;