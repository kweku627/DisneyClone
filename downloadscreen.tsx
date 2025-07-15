import React, { FC, useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../components/ThemeProvider';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define navigation types for Expo Router
type RootStackParamList = {
  '(tabs)': undefined;
  '(tabs)/index': undefined;
  '(tabs)/seriesScreen': undefined;
  '(tabs)/search_screen': undefined;
  '(tabs)/trailer': undefined;
  login: undefined;
  Profile: undefined;
  settings: undefined;
  downloadscreen: undefined;
  Watch: { uri: string; title: string };
};

interface DownloadItem {
  id: string;
  title: string;
  image: string; // URI for thumbnail
  filePath: string; // Local file path for video
  genre?: string;
  rating?: string;
  duration?: number;
}

const Downloads: React.FC = () => {
  const {
    primary,
    background,
    textPrimary,
    textSecondary,
    accent,
    surface,
    border,
  } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortByGenreAsc, setSortByGenreAsc] = useState<boolean>(true);

  // Load downloads from AsyncStorage
  useEffect(() => {
    const loadDownloads = async () => {
      try {
        const storedDownloads = await AsyncStorage.getItem('downloads');
        if (storedDownloads) {
          const parsedDownloads: DownloadItem[] = JSON.parse(storedDownloads);
          // Verify files exist
          const validDownloads = await Promise.all(
            parsedDownloads.map(async (item) => {
              const fileInfo = await FileSystem.getInfoAsync(item.filePath);
              return fileInfo.exists ? item : null;
            })
          );
          setDownloads(validDownloads.filter((item): item is DownloadItem => item !== null));
        }
      } catch (error) {
        console.error('Error loading downloads:', error);
        Alert.alert('Error', 'Failed to load downloads.');
      } finally {
        setIsLoading(false);
      }
    };

    loadDownloads();
  }, []);

  // Toggle sorting order for genre
  const toggleSort = () => {
    setSortByGenreAsc(prev => !prev);
  };

  // Sorted downloads by genre
  const sortedDownloads = useMemo(() => {
    return [...downloads].sort((a, b) => {
      const genreA = a.genre?.toLowerCase() || '';
      const genreB = b.genre?.toLowerCase() || '';
      if (genreA === genreB) return 0;
      if (!genreA) return 1; // items without genre go last
      if (!genreB) return -1;
      return sortByGenreAsc ? genreA.localeCompare(genreB) : genreB.localeCompare(genreA);
    });
  }, [downloads, sortByGenreAsc]);

  // Delete a single download
  const deleteDownload = async (id: string) => {
    Alert.alert(
      'Delete Download',
      'Are you sure you want to delete this download?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const item = downloads.find((d: DownloadItem) => d.id === id);
              if (item) {
                await FileSystem.deleteAsync(item.filePath, { idempotent: true });
                const updatedDownloads = downloads.filter((d) => d.id !== id);
                setDownloads(updatedDownloads);
                await AsyncStorage.setItem('downloads', JSON.stringify(updatedDownloads));
              }
            } catch (error) {
              console.error('Error deleting download:', error);
              Alert.alert('Error', 'Failed to delete download.');
            }
          },
        },
      ]
    );
  };

  // Clear all downloads
  const clearAllDownloads = async () => {
    Alert.alert(
      'Clear All Downloads',
      'Are you sure you want to delete all downloads?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              for (const item of downloads) {
                await FileSystem.deleteAsync(item.filePath, { idempotent: true });
              }
              setDownloads([]);
              await AsyncStorage.setItem('downloads', JSON.stringify([]));
            } catch (error) {
              console.error('Error clearing downloads:', error);
              Alert.alert('Error', 'Failed to clear all downloads.');
            }
          },
        },
      ]
    );
  };

  // Navigate to play video
  const playVideo = (item: DownloadItem) => {
    navigation.navigate('Watch', { uri: item.filePath, title: item.title });
  };

  const renderDownloadItem = ({ item }: { item: DownloadItem }) => (
    <View style={[styles.itemContainer, { backgroundColor: surface }]}>  
      <Image
        source={{ uri: item.image || 'https://via.placeholder.com/150' }}
        style={styles.itemImage}
        onError={() => console.error(`Failed to load image: ${item.image}`)}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.gradient}
      />
      <View style={styles.textContainer}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { color: textPrimary }]} numberOfLines={1}>{item.title}</Text>
          <Text style={[styles.genreText, { color: textSecondary }]} numberOfLines={1}>{item.genre || 'Unknown Genre'}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => playVideo(item)}
            style={[styles.playButton, { backgroundColor: accent }]}
          >
            <FontAwesome name='play' size={18} color='#fff' />
            <Text style={[styles.playText, { color: '#fff' }]}>Watch</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteDownload(item.id)}
            style={styles.deleteButton}
          >
            <FontAwesome name='trash' size={18} color={textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <FontAwesome name='cloud-download' size={80} color={textSecondary} />
      <Text style={[styles.emptyTitle, { color: textPrimary }]}>No Downloads Yet</Text>
      <Text style={[styles.emptyText, { color: textSecondary }]}>Download movies or series from the Home tab to watch offline.</Text>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.actionButton, { borderColor: accent }]}
      >
        <Text style={[styles.actionButtonText, { color: accent }]}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: background }]}
      edges={['top', 'bottom']}
    >
      {/* Header with sort toggle */}
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: textPrimary }]}>Downloads</Text>
        <TouchableOpacity onPress={toggleSort} style={styles.sortButton}>
          <FontAwesome
            name={sortByGenreAsc ? 'sort-alpha-asc' : 'sort-alpha-desc'}
            size={24}
            color={primary}
          />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: textPrimary }]}>Loading...</Text>
        </View>
      ) : sortedDownloads.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={sortedDownloads}
          keyExtractor={(item) => item.id}
          renderItem={renderDownloadItem}
          contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default Downloads;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sortButton: {
    padding: 8,
  },
  itemContainer: {
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
  },
  textContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  genreText: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  playText: {
    marginLeft: 8,
    fontSize: 14,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
  },
});
