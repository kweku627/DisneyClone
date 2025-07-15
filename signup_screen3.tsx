import { LinearGradient } from 'expo-linear-gradient';
import { router, useNavigation } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '../theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Fallback theme
const defaultTheme = {
  dark: {
    primary: '#5D4037',
    secondary: '#A1887F',
    accent: '#BCAAA4',
    background: '#1C120F',
    surface: '#2C1F1B',
    textPrimary: '#EDE7D9',
    textSecondary: '#BCAAA4',
    border: '#4E342E',
  },
};

// Define route params
type RootStackParamList = {
  Signup: undefined;
  SignupStep2: undefined;
  SignupStep3: undefined;
  '(tabs)/search_screen': undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Sample avatar data (replace with actual Disney+ avatar URLs or assets)
const avatars = [
  { id: '1', uri: 'https://via.placeholder.com/100?text=Mickey' },
  { id: '2', uri: 'https://via.placeholder.com/100?text=Minnie' },
  { id: '3', uri: 'https://via.placeholder.com/100?text=Donald' },
  { id: '4', uri: 'https://via.placeholder.com/100?text=Goofy' },
];

export default function SignupStep3() {
  console.log('Theme in SignupStep3:', theme); // Debug theme import
  const currentTheme = theme || defaultTheme;
  const navigation = useNavigation<NavigationProp>();
  const [profileName, setProfileName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0].uri);

  const handleFinish = () => {
    if (!profileName.trim()) {
      alert('Please enter a profile name');
      return;
    }
    router.push('/(tabs)/search_screen');
  };

  const renderAvatar = ({ item }: { item: { id: string; uri: string } }) => (
    <TouchableOpacity
      style={[
        styles.avatarButton,
        selectedAvatar === item.uri && { borderColor: currentTheme.dark.accent, borderWidth: 3 },
      ]}
      onPress={() => setSelectedAvatar(item.uri)}
    >
      <Image source={{ uri: item.uri }} style={styles.avatarImage} />
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={[currentTheme.dark.background, currentTheme.dark.surface, currentTheme.dark.background]}
      style={styles.container}
    >
      <StatusBar backgroundColor={currentTheme.dark.background} barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color={currentTheme.dark.textSecondary} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={[styles.stepText, { color: currentTheme.dark.textSecondary }]}>STEP 3 OF 3</Text>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 20}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={[styles.title, { color: currentTheme.dark.textPrimary }]}>SET UP YOUR PROFILE</Text>
            <View style={styles.formContainer}>
              <Text style={[styles.label, { color: currentTheme.dark.textPrimary }]}>Profile Name</Text>
              <View style={[styles.inputWrapper, { backgroundColor: currentTheme.dark.surface, borderColor: currentTheme.dark.border }]}>
                <TextInput
                  placeholder="Profile Name"
                  placeholderTextColor={currentTheme.dark.textSecondary}
                  style={[styles.input, { color: currentTheme.dark.textPrimary }]}
                  value={profileName}
                  onChangeText={setProfileName}
                  autoCapitalize="words"
                />
              </View>
              <Text style={[styles.label, { color: currentTheme.dark.textPrimary }]}>Choose an Avatar</Text>
              <FlatList
                data={avatars}
                renderItem={renderAvatar}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.avatarList}
                contentContainerStyle={styles.avatarListContent}
              />
              <TouchableOpacity
                style={[styles.finishButton, { backgroundColor: currentTheme.dark.accent }]}
                onPress={handleFinish}
              >
                <Text style={[styles.finishButtonText, { color: currentTheme.dark.textPrimary }]}>FINISH</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardAvoid: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  backIcon: {
    marginHorizontal: 10,
  },
  stepText: {
    marginLeft: 90,
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
  input: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  avatarList: {
    marginBottom: 20,
  },
  avatarListContent: {
    paddingRight: 20,
  },
  avatarButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  finishButton: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  finishButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});