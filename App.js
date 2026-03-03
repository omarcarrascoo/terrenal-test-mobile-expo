import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Colors, Spacing } from './theme';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
    // In a real application, you would send these credentials to your backend API
    // For this example, we'll just show an alert
    Alert.alert('Login Attempt', `Email: ${email}\nPassword: ${password}`);
    console.log('Login attempt:', { email, password });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Login to your account</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={Colors.placeholder}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={Colors.placeholder}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => Alert.alert('Navigate', 'Go to Sign Up screen')}>
              <Text style={styles.signUpLink}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.large,
  },
  content: {
    width: '100%',
    maxWidth: 400, // Maximum width for better readability on larger screens
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.small,
    shadowColor: '#000', // A generic black for shadow, as background is dark
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Spacing.small,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: Spacing.xl,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.background,
    borderRadius: Spacing.small,
    paddingHorizontal: Spacing.medium,
    color: Colors.text,
    marginBottom: Spacing.medium,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.background, // Match input border to its background
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.large,
  },
  forgotPasswordText: {
    color: Colors.link,
    fontSize: 14,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: Spacing.small,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  loginButtonText: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: Spacing.medium,
  },
  signUpText: {
    color: Colors.text,
    fontSize: 14,
  },
  signUpLink: {
    color: Colors.link,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default App;