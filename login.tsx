import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation,useRouter } from 'expo-router';
import { useTheme } from '../components/ThemeProvider';
import { RootStackParamList } from '../types'; // Corrected path

export default function Login() {
  const navigation = useNavigation<RootStackParamList>();
  const { primary, secondary, accent, background, surface, textPrimary, textSecondary, border } = useTheme();
  const [isPressed, setIsPressed] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  useEffect(() => {
    NavigationBar.setVisibilityAsync('visible');
    NavigationBar.setBackgroundColorAsync(background);
  }, [background]);

  return (
    <LinearGradient colors={[background, surface, background]} style={styles.container}>
      <StatusBar backgroundColor={background} barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={styles.keyboardAvoid}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 20}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {/* Back Button */}
              <View style={styles.backContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="chevron-back" size={30} color={textSecondary} />
                </TouchableOpacity>
              </View>

              {/* Logo */}
              <View style={styles.logoContainer}>
                <Image source={require('../assets/logo/logo2.png')} style={styles.logo} />
              </View>

              {/* Sign In Header */}
              <Text style={[styles.signInLabel, { color: primary }]}>SIGN IN</Text>

              {/* Form */}
              <View style={styles.formContainer}>
                <Text style={[styles.label, { color: textPrimary }]}>Log in with your email</Text>
                <View style={styles.inputWrapper}>
                  <FontAwesome name="user" size={20} color={textSecondary} style={styles.iconLeft} />
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor={textSecondary}
                    style={[styles.inputWithIcon, { backgroundColor: surface, color: textPrimary, borderColor: border }]}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <Text style={[styles.label, { color: textPrimary }]}>Password</Text>
                <View style={styles.inputWrapper}>
                  <TouchableOpacity style={styles.eyeButton} onPress={() => setIsPressed(!isPressed)}>
                    <FontAwesome name={isPressed ? 'eye' : 'eye-slash'} size={20} color={textSecondary} />
                  </TouchableOpacity>
                  <TextInput
                    placeholder="Write a password"
                    placeholderTextColor={textSecondary}
                    secureTextEntry={!isPressed}
                    style={[styles.inputWithIcon, { backgroundColor: surface, color: textPrimary, borderColor: border }]}
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>

                {/* Sign In Button */}
                <TouchableOpacity style={[styles.loginButton, { backgroundColor: accent }]}>
                  <Text style={styles.loginButtonText}>SIGN IN</Text>
                </TouchableOpacity>

                {/* Sign Up Link */}
                <View style={styles.row}>
                  <Text style={[styles.newText, { color: textSecondary }]}>New to Disney+? </Text>
                  <TouchableOpacity onPress={() => router.push('/signup_screen')}>
                    <Text style={[styles.signUpText, { color: primary }]}>Sign Up</Text>
                  </TouchableOpacity>
                </View>

                {/* Divider */}
                <View style={[styles.hr, { borderBottomColor: border }]} />

                {/* Account Info */}
                <View style={styles.row}>
                  <Image source={require('../assets/logo/logo2.png')} style={styles.smallLogo} />
                  <Text style={[styles.accountLabel, { color: textSecondary }]}>account</Text>
                </View>
                <Text style={[styles.bottomText, { color: textSecondary }]}>
                  With this account, you can access: Disney+, Star Wars, Marvel,{"\n"}
                  and other Walt Disney Company services.
                </Text>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  keyboardAvoid: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    minHeight: '100%',
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  backContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 5,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    height: 160,
    width: 160,
    resizeMode: 'contain',
  },
  signInLabel: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  formContainer: {
    marginTop: 30,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 20,
  },
  iconLeft: {
    position: 'absolute',
    top: 15,
    left: 12,
  },
  eyeButton: {
    position: 'absolute',
    top: 15,
    right: 12,
    zIndex: 2,
  },
  inputWithIcon: {
    height: 50,
    width: '100%',
    borderRadius: 4,
    paddingLeft: 40,
    paddingRight: 40,
    fontSize: 16,
    borderWidth: 1,
  },
  loginButton: {
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  loginButtonText: {
    color: '#1C2526',
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  newText: {
    fontSize: 14,
  },
  signUpText: {
    fontWeight: '500',
    fontSize: 14,
  },
  hr: {
    borderBottomWidth: 1,
    marginVertical: 20,
    width: '100%',
  },
  smallLogo: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  accountLabel: {
    marginLeft: 10,
    fontSize: 10,
  },
  bottomText: {
    marginTop: 10,
    lineHeight: 18,
    fontSize: 12,
  },
});