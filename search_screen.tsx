import React, { useState } from 'react';
import { View, TextInput, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../../components/ThemeProvider'; // Import useTheme

const SearchScreen = ({ navigation }: any) => {
  const { primary, background, textPrimary, textSecondary, accent, surface, border } = useTheme();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (text: string) => {
    setQuery(text);

    // Dummy data filtering
    const dummyData = ['Breaking Bad', 'Black Mirror', 'Inception', 'Interstellar', 'Dark', 'Stranger Things'];
    const filtered = dummyData.filter(item => item.toLowerCase().includes(text.toLowerCase()));
    setResults(filtered);
  };

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <TextInput
        style={[styles.searchInput, { backgroundColor: surface, color: textPrimary }]}
        placeholder="Search movies, series..."
        placeholderTextColor={textSecondary}
        value={query}
        onChangeText={handleSearch}
      />

      {results.length === 0 && query.length > 0 ? (
        <Text style={[styles.noResults, { color: textSecondary }]}>No results found</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item }) => <Text style={[styles.resultItem, { color: textPrimary, borderBottomColor: border }]}>{item}</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  searchInput: {
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
  },
  resultItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    fontSize: 16,
  },
});

export default SearchScreen;