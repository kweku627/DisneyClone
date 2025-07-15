import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useRef } from 'react';
import { FlatList, ListRenderItem, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video, ResizeMode } from 'expo-av';

interface Season {
  season: number;
  episodes: {
    id: string;
    title: string;
    uri: string;
    description: string;
  }[];
}

const WatchSeries = () => {
  const router = useRouter();
  const { uri, title } = useLocalSearchParams<{ uri?: string; title?: string }>();
  const videoRef = useRef<Video>(null);
  const [selectedSeason, setSelectedSeason] = useState<number>(1);
  const [selectedEpisode, setSelectedEpisode] = useState<string>('1');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const seasons: Season[] = [
    {
      season: 1,
      episodes: [
        {
          id: '1',
          title: 'Episode 1',
          uri: uri || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          description: 'The adventure begins.',
        },
        {
          id: '2',
          title: 'Episode 2',
          uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          description: 'The journey continues.',
        },
      ],
    },
    {
      season: 2,
      episodes: [
        {
          id: '3',
          title: 'Episode 1',
          uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          description: 'A new chapter unfolds.',
        },
        {
          id: '4',
          title: 'Episode 2',
          uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
          description: 'Challenges arise.',
        },
      ],
    },
  ];

  const currentSeason = seasons.find((s) => s.season === selectedSeason);
  const currentEpisode = currentSeason?.episodes.find((e) => e.id === selectedEpisode);

  const renderSeason: ListRenderItem<Season> = ({ item }) => (
    <TouchableOpacity
      style={[styles.seasonButton, selectedSeason === item.season && styles.selectedSeasonButton]}
      onPress={() => {
        setSelectedSeason(item.season);
        setSelectedEpisode(item.episodes[0].id);
      }}
    >
      <Text style={[styles.seasonText, selectedSeason === item.season && styles.selectedSeasonText]}>
        Season {item.season}
      </Text>
    </TouchableOpacity>
  );

  const renderEpisode: ListRenderItem<Season['episodes'][number]> = ({ item }) => (
    <TouchableOpacity
      style={[styles.episodeButton, selectedEpisode === item.id && styles.selectedEpisodeButton]}
      onPress={() => setSelectedEpisode(item.id)}
    >
      <Text style={[styles.episodeText, selectedEpisode === item.id && styles.selectedEpisodeText]}>{item.title}</Text>
      <Text style={styles.episodeDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
       <Video
  ref={videoRef}
  source={{ uri: currentEpisode?.uri || uri || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
  style={styles.video}
  useNativeControls
  resizeMode={ResizeMode.CONTAIN}
  isLooping
  shouldPlay={isPlaying}
  onPlaybackStatusUpdate={(status) => {
    if ('isPlaying' in status) {
      setIsPlaying(status.isPlaying);
    }
  }}
/>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.selectorContainer}>
            <Text style={styles.selectorTitle}>Select Season</Text>
            <FlatList
              data={seasons}
              renderItem={renderSeason}
              keyExtractor={(item) => item.season.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.seasonList}
              contentContainerStyle={styles.seasonListContent}
            />
          </View>
          <View style={styles.episodeContainer}>
            <Text style={styles.selectorTitle}>Episodes</Text>
            <FlatList
              data={currentSeason?.episodes}
              renderItem={renderEpisode}
              keyExtractor={(item) => item.id}
              style={styles.episodeList}
              contentContainerStyle={styles.episodeListContent}
            />
          </View>
        </ScrollView>
      </View>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  container: { flex: 1 },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * (9 / 16),
    backgroundColor: '#000',
  },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 20 },
  selectorContainer: { paddingHorizontal: 20, paddingVertical: 15 },
  selectorTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  seasonList: { flexGrow: 0 },
  seasonListContent: { paddingRight: 20 },
  seasonButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#333',
    borderRadius: 20,
    marginRight: 10,
  },
  selectedSeasonButton: { backgroundColor: '#e50914' },
  seasonText: { color: '#fff', fontSize: 14 },
  selectedSeasonText: { fontWeight: 'bold' },
  episodeContainer: { paddingHorizontal: 20 },
  episodeList: { flexGrow: 0 },
  episodeListContent: { paddingBottom: 20 },
  episodeButton: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#333' },
  selectedEpisodeButton: { borderLeftWidth: 4, borderLeftColor: '#e50914', paddingLeft: 6 },
  episodeText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  selectedEpisodeText: { color: '#e50914' },
  episodeDescription: { color: '#aaa', fontSize: 12, marginTop: 5 },
});

export default WatchSeries;