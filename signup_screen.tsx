import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
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
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '../theme';

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
  '(tabs)/index': undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Signup() {
  console.log('Theme in Signup:', theme); // Debug theme import
  const currentTheme = theme || defaultTheme;
  const navigation = useNavigation<NavigationProp>();
  const [isPasswordPressed, setIsPasswordPressed] = useState(false);
  const [isConfirmPressed, setIsConfirmPressed] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  const handleSignup = () => {
    if (!email.includes('@') || !email.includes('.')) {
      alert('Please enter a valid email address');
      return;
    }
    if (password.length < 6 || !/[0-9!@#$%^&*]/.test(password)) {
      alert('Password must be at least 6 characters and include a number or special character');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
router.push('/signup_screen2')  };

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
        <Text style={[styles.stepText, { color: currentTheme.dark.textSecondary }]}>STEP 1 OF 3</Text>
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
            <Text style={[styles.signInLabel, { color: currentTheme.dark.textPrimary }]}>SIGN UP</Text>
            <View style={styles.formContainer}>
              <Text style={[styles.label, { color: currentTheme.dark.textPrimary }]}>Enter your email Address</Text>
              <View style={[styles.inputWrapper, { backgroundColor: currentTheme.dark.surface, borderColor: currentTheme.dark.border }]}>
                <FontAwesome
                  name="user"
                  size={20}
                  color={currentTheme.dark.textSecondary}
                  style={styles.iconLeft}
                />
                <TextInput
                  placeholder="Email"
                  placeholderTextColor={currentTheme.dark.textSecondary}
                  style={[styles.inputWithIcon, { color: currentTheme.dark.textPrimary }]}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <Text style={[styles.label, { color: currentTheme.dark.textPrimary }]}>Create a Password</Text>
              <View style={[styles.inputWrapper, { backgroundColor: currentTheme.dark.surface, borderColor: currentTheme.dark.border }]}>
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setIsPasswordPressed(!isPasswordPressed)}
                >
                  <FontAwesome
                    name={isPasswordPressed ? 'eye' : 'eye-slash'}
                    size={20}
                    color={currentTheme.dark.textSecondary}
                  />
                </TouchableOpacity>
                <TextInput
                  placeholder="Create a password"
                  placeholderTextColor={currentTheme.dark.textSecondary}
                  secureTextEntry={!isPasswordPressed}
                  style={[styles.inputWithIcon, { color: currentTheme.dark.textPrimary }]}
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
              <Text style={[styles.hintText, { color: currentTheme.dark.textSecondary }]}>
                Use a minimum of 6 characters (case sensitive) with at least one number or special character.
              </Text>
              <Text style={[styles.label, { color: currentTheme.dark.textPrimary }]}>Confirm Password</Text>
              <View style={[styles.inputWrapper, { backgroundColor: currentTheme.dark.surface, borderColor: currentTheme.dark.border }]}>
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setIsConfirmPressed(!isConfirmPressed)}
                >
                  <FontAwesome
                    name={isConfirmPressed ? 'eye' : 'eye-slash'}
                    size={20}
                    color={currentTheme.dark.textSecondary}
                  />
                </TouchableOpacity>
                <TextInput
                  placeholder="Confirm password"
                  placeholderTextColor={currentTheme.dark.textSecondary}
                  secureTextEntry={!isConfirmPressed}
                  style={[styles.inputWithIcon, { color: currentTheme.dark.textPrimary }]}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>
              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={styles.checkboxWrapper}
                  onPress={() => setChecked(!checked)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      { borderColor: currentTheme.dark.textSecondary },
                      checked && { backgroundColor: currentTheme.dark.accent },
                    ]}
                  >
                    {checked && (
                      <Ionicons name="checkmark" size={18} color={currentTheme.dark.textPrimary} />
                    )}
                  </View>
                  <Text style={[styles.checkboxText, { color: currentTheme.dark.textSecondary }]}>
                    Yes! I would like to receive updates, special offers, and other information from
                    Disney+ and The Walt Disney Family of Companies.
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={[styles.termsContainer, { backgroundColor: currentTheme.dark.surface, borderColor: currentTheme.dark.border }]}
              >
                <Text style={[styles.termsText, { color: currentTheme.dark.textSecondary }]}>
                  Disney will use your data to personalise and improve your Disney+ experience and to
                  send you information about Disney+. You can change your communication preferences at
                  any time. We may use your data as described in our{' '}
                  <Text style={{ color: currentTheme.dark.accent, textDecorationLine: 'underline' }}>
                    Privacy Policy
                  </Text>
                  , including sharing it with The Walt Disney Family of Companies. By clicking Agree
                  and Continue, you are agreeing to our{' '}
                  <Text style={{ color: currentTheme.dark.accent, textDecorationLine: 'underline' }}>
                    Subscriber Agreement
                  </Text>
                  , and acknowledging that you have read our{' '}
                  <Text style={{ color: currentTheme.dark.accent, textDecorationLine: 'underline' }}>
                    Privacy Policy
                  </Text>{' '}
                  and{' '}
                  <Text style={{ color: currentTheme.dark.accent, textDecorationLine: 'underline' }}>
                    Supplemental Privacy Policy
                  </Text>{' '}
                  for Singapore.
                </Text>
                <TouchableOpacity style={[styles.loginButton, { backgroundColor: currentTheme.dark.accent }]} onPress={handleSignup}>
                  <Text style={[styles.loginButtonText, { color: currentTheme.dark.textPrimary }]}>AGREE & CONTINUE</Text>
                </TouchableOpacity>
              </View>
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
  signInLabel: {
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
  iconLeft: {
    position: 'absolute',
    top: 15,
    left: 12,
    zIndex: 2,
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
    borderRadius: 10,
    paddingLeft: 40,
    paddingRight: 40,
    fontSize: 16,
  },
  hintText: {
    fontSize: 12,
    marginBottom: 20,
    lineHeight: 18,
  },
  checkboxContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 6,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxText: {
    fontSize: 12,
    lineHeight: 18,
  },
  termsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
  },
  termsText: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  loginButton: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});