import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Image, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../components/ThemeText';

// Mock Auth Context
const AuthContext = React.createContext({
  logout: () => {},
});

const useAuth = () => React.useContext(AuthContext);

interface SettingsItem {
  type: 'section' | 'option' | 'profile' | 'logout';
  title?: string;
  subtitle?: string;
  hasSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  onPress?: () => void;
}

const Settings: React.FC = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const flatListRef = useRef<FlatList>(null);
  const [pushNotifications, setPushNotifications] = useState<boolean>(true);
  const [emailNotifications, setEmailNotifications] = useState<boolean>(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState<boolean>(false);
  const [downloadOverWifi, setDownloadOverWifi] = useState<boolean>(true);

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            logout();
            navigation.navigate('login' as never);
          },
        },
      ]
    );
  };

  const navigateToSubScreen = (screen: string) => {
    navigation.navigate(screen as never);
  };

  const settingsData: SettingsItem[] = [
    // Profile
    {
      type: 'profile',
      title: 'Jane Doe',
      onPress: () => navigateToSubScreen('editProfile'),
    },
    // Account Settings
    { type: 'section', title: 'Account Settings' },
    {
      type: 'option',
      subtitle: 'Two-Factor Authentication',
      hasSwitch: true,
      switchValue: twoFactorAuth,
      onSwitchChange: setTwoFactorAuth,
    },
    {
      type: 'option',
      subtitle: 'Change Password',
      onPress: () => navigateToSubScreen('changePassword'),
    },
    {
      type: 'option',
      subtitle: 'Sign Out of All Devices',
      onPress: () => navigateToSubScreen('signOutAll'),
    },
    // Subscription & Billing
    { type: 'section', title: 'Subscription & Billing' },
    {
      type: 'option',
      subtitle: 'Current Plan: Free',
      onPress: () => navigateToSubScreen('subscription'),
    },
    {
      type: 'option',
      subtitle: 'Payment Method',
      onPress: () => navigateToSubScreen('paymentMethod'),
    },
    {
      type: 'option',
      subtitle: 'Billing History',
      onPress: () => navigateToSubScreen('billingHistory'),
    },
    // Playback Preferences
    { type: 'section', title: 'Playback Preferences' },
    {
      type: 'option',
      subtitle: 'Streaming Quality',
      onPress: () => navigateToSubScreen('streamingQuality'),
    },
    {
      type: 'option',
      subtitle: 'Language Preferences',
      onPress: () => navigateToSubScreen('languagePrefs'),
    },
    // Notification Preferences
    { type: 'section', title: 'Notification Preferences' },
    {
      type: 'option',
      subtitle: 'Push Notifications',
      hasSwitch: true,
      switchValue: pushNotifications,
      onSwitchChange: setPushNotifications,
    },
    {
      type: 'option',
      subtitle: 'Email Notifications',
      hasSwitch: true,
      switchValue: emailNotifications,
      onSwitchChange: setEmailNotifications,
    },
    // Download Settings
    { type: 'section', title: 'Download Settings' },
    {
      type: 'option',
      subtitle: 'Download Over Wi-Fi Only',
      hasSwitch: true,
      switchValue: downloadOverWifi,
      onSwitchChange: setDownloadOverWifi,
    },
    {
      type: 'option',
      subtitle: 'Manage Downloaded Content',
      onPress: () => navigateToSubScreen('manageDownloads'),
    },
    // Privacy & Security
    { type: 'section', title: 'Privacy & Security' },
    {
      type: 'option',
      subtitle: 'Clear Watch History',
      onPress: () => navigateToSubScreen('clearHistory'),
    },
    {
      type: 'option',
      subtitle: 'Delete Account',
      onPress: () => navigateToSubScreen('deleteAccount'),
    },
    // App Preferences
    { type: 'section', title: 'App Preferences' },
    {
      type: 'option',
      subtitle: 'Dark Mode',
      hasSwitch: true,
      switchValue: isDarkMode,
      onSwitchChange: toggleTheme,
    },
    {
      type: 'option',
      subtitle: 'Language/Region',
      onPress: () => navigateToSubScreen('languageRegion'),
    },
    // Support & Legal
    { type: 'section', title: 'Support & Legal' },
    {
      type: 'option',
      subtitle: 'Terms of Service',
      onPress: () => navigateToSubScreen('terms'),
    },
    {
      type: 'option',
      subtitle: 'Privacy Policy',
      onPress: () => navigateToSubScreen('privacy'),
    },
    {
      type: 'option',
      subtitle: 'Help Center',
      onPress: () => navigateToSubScreen('help'),
    },
    {
      type: 'option',
      subtitle: 'Contact Support',
      onPress: () => navigateToSubScreen('contact'),
    },
    // Logout
    { type: 'logout', onPress: handleLogout },
  ];

  const ITEM_HEIGHTS = {
    profile: 80,
    section: 50,
    option: 60,
    logout: 60,
  };

  const getItemLayout = (
    data: ArrayLike<SettingsItem> | null | undefined,
    index: number
  ): { length: number; offset: number; index: number } => {
    let offset = 60;
    for (let i = 0; i < index; i++) {
      const item = data?.[i];
      if (item) {
        offset += ITEM_HEIGHTS[item.type];
      }
    }
    const item = data?.[index];
    const length = item ? ITEM_HEIGHTS[item.type] : 0;
    return { length, offset, index };
  };

  const onScrollToIndexFailed = (info: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
  }) => {
    console.warn('Scroll to index failed:', info);
    flatListRef.current?.scrollToIndex({
      index: info.highestMeasuredFrameIndex,
      animated: true,
    });
  };

  const renderItem = ({ item }: { item: SettingsItem }) => {
    if (item.type === 'profile') {
      return (
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/50' }}
            style={[styles.profilePic, { borderColor: theme.border }]}
          />
          <View>
            <Text style={[styles.profileName, { color: theme.textPrimary }]}>{item.title}</Text>
            <TouchableOpacity style={[styles.editButton, { backgroundColor: theme.secondary }]} onPress={item.onPress}>
              <Text style={[styles.editButtonText, { color: theme.textPrimary }]}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    if (item.type === 'section') {
      return (
        <View style={[styles.section, { backgroundColor: theme.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>{item.title}</Text>
        </View>
      );
    }

    if (item.type === 'option') {
      return (
        <TouchableOpacity style={[styles.option, { backgroundColor: theme.surface, borderBottomColor: theme.border }]} onPress={item.onPress}>
          <Text style={[styles.optionText, { color: theme.textPrimary }]}>{item.subtitle}</Text>
          {item.hasSwitch ? (
            <Switch
              value={item.switchValue}
              onValueChange={item.onSwitchChange}
              trackColor={{ false: theme.border, true: theme.accent }}
              thumbColor={item.switchValue ? theme.surface : theme.textSecondary}
            />
          ) : (
            <Text style={[styles.arrow, { color: theme.textSecondary }]}>›</Text>
          )}
        </TouchableOpacity>
      );
    }

    if (item.type === 'logout') {
      return (
        <TouchableOpacity style={[styles.logoutButton, { backgroundColor: theme.accent }]} onPress={item.onPress}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      );
    }

    return null;
  };

  return (
    <AuthContext.Provider value={{ logout: () => console.log('Logout triggered') }}>
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>Settings</Text>
        <FlatList
          data={settingsData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.type}-${index}`}
          getItemLayout={getItemLayout}
          onScrollToIndexFailed={onScrollToIndexFailed}
          ref={flatListRef}
          style={styles.container}
        />
      </SafeAreaView>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  section: {
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  editButtonText: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  optionText: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 18,
  },
  logoutButton: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 15,
  },
  logoutText: {
    color: '#1C2526',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Settings;