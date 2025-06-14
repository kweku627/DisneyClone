import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useNavigation } from 'expo-router';
import { theme } from '../theme';

export default function SignupStep2() {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');

  const  handleContinue = () => {
    if (!firstName.trim() || !lastName.trim() || !dob.trim()) {
      alert('Please fill in all fields');
      return;
    }
    // Basic DOB format validation (MM/DD/YYYY)
    const dobRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/;
    if (!dobRegex.test(dob)) {
      alert('Please enter a valid date of birth (MM/DD/YYYY)');
      return;
    }
    // Navigate to Step 3
    router.push('/signup_screen3')  };

  return (
    <LinearGradient
      colors={[theme.dark.background, theme.dark.surface, theme.dark.background]}
      style={styles.container}
    >
      <StatusBar backgroundColor={theme.dark.background} barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color={theme.dark.textSecondary} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={[styles.stepText, { color: theme.dark.textSecondary }]}>STEP 2 OF 3</Text>
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
            <Text style={[styles.title, { color: theme.dark.textPrimary }]}>PROFILE INFORMATION</Text>
            <View style={styles.formContainer}>
              <Text style={[styles.label, { color: theme.dark.textPrimary }]}>First Name</Text>
              <View style={[styles.inputWrapper, { backgroundColor: theme.dark.surface, borderColor: theme.dark.border }]}>
                <TextInput
                  placeholder="First Name"
                  placeholderTextColor={theme.dark.textSecondary}
                  style={[styles.input, { color: theme.dark.textPrimary }]}
                  value={firstName}
                  onChangeText={setFirstName}
                  autoCapitalize="words"
                />
              </View>
              <Text style={[styles.label, { color: theme.dark.textPrimary }]}>Last Name</Text>
              <View style={[styles.inputWrapper, { backgroundColor: theme.dark.surface, borderColor: theme.dark.border }]}>
                <TextInput
                  placeholder="Last Name"
                  placeholderTextColor={theme.dark.textSecondary}
                  style={[styles.input, { color: theme.dark.textPrimary }]}
                  value={lastName}
                  onChangeText={setLastName}
                  autoCapitalize="words"
                />
              </View>
              <Text style={[styles.label, { color: theme.dark.textPrimary }]}>Date of Birth (MM/DD/YYYY)</Text>
              <View style={[styles.inputWrapper, { backgroundColor: theme.dark.surface, borderColor: theme.dark.border }]}>
                <TextInput
                  placeholder="MM/DD/YYYY"
                  placeholderTextColor={theme.dark.textSecondary}
                  style={[styles.input, { color: theme.dark.textPrimary }]}
                  value={dob}
                  onChangeText={setDob}
                  keyboardType="numeric"
                />
              </View>
              <TouchableOpacity
                style={[styles.continueButton, { backgroundColor: theme.dark.accent }]}
                onPress={handleContinue}
              >
                <Text style={[styles.continueButtonText, { color: theme.dark.textPrimary }]}>CONTINUE</Text>
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
  continueButton: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});