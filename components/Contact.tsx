import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Spacing, Typography, BorderRadius, lightColors, darkColors } from '@/constants/Theme';
import { useTheme } from '@/contexts/ThemeContext';
import Hoverable from './Hoverable';

export default function Contact() {
  const { isDark } = useTheme();
  const Colors = isDark ? darkColors : lightColors;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    // Here you would typically send the data to your backend
    Alert.alert(
      'Success',
      'Thank you for your message! I will get back to you soon.',
      [
        {
          text: 'OK',
          onPress: () => {
            setName('');
            setEmail('');
            setMessage('');
          },
        },
      ]
    );
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error('Failed to open URL:', err)
    );
  };

  return (
    <View style={styles.container}>

        <View style={[styles.content, { backgroundColor: Colors.backgroundLight, borderColor: Colors.border, borderWidth: 1 }]}>
          <Text style={[styles.title, { color: Colors.text }]}>Contact Me</Text>
          <View style={[styles.divider, {backgroundColor: Colors.secondary}]} />
          <Text style={[styles.subtitle,{color: Colors.textLight}]}>
            I value open communication. For inquiries or collaborations, feel free to reach out.
          </Text>

          <View style={styles.contactInfo}>
            <Hoverable
              style={styles.contactItem}
              onPress={() => openLink('mailto:gagandarshan22@gmail.com')}
            >
              <Text style={styles.contactIcon}>📧</Text>
              <Text style={styles.contactText}>E-mail</Text>
            </Hoverable>
            <Hoverable
              style={styles.contactItem}
              onPress={() => openLink('tel:+916364109281')}
            >
              <Text style={styles.contactIcon}>📱</Text>
              <Text style={styles.contactText}>Call</Text>
            </Hoverable>
            <Hoverable
              style={styles.contactItem}
              onPress={() => openLink('https://github.com/yourusername')}
            >
              <Text style={styles.contactIcon}>💼</Text>
              <Text style={styles.contactText}>GitHub</Text>
            </Hoverable>
            <Hoverable
              style={styles.contactItem}
              onPress={() => openLink('https://linkedin.com/in/yourusername')}
            >
              <Text style={styles.contactIcon}>🔗</Text>
              <Text style={styles.contactText}>LinkedIn</Text>
            </Hoverable>
          </View>

          <View style={styles.form}>
            <TextInput
              style={[styles.input,{borderColor: Colors.border}]}
              placeholder="Your Name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={[styles.input,{borderColor: Colors.border}]}
              placeholder="Your Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={[styles.input, styles.messageInput, {borderColor: Colors.border}]}
              placeholder="Your Message"
              placeholderTextColor="#999"
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
            <Hoverable
              style={[styles.submitButton,{backgroundColor: Colors.secondary}]}
              onPress={handleSubmit}
            >
              <Text style={[styles.submitButtonText, {color : Colors.primary}]}>Send Message</Text>
            </Hoverable>
          </View>
        </View>
      {/* </LinearGradient> */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: Colors.textLight }]}>
          © 2024 Gagan Gowda K R
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: Spacing.sm,
    minHeight: Platform.OS === 'web' ? 600 : 500,
    marginBottom: Spacing.xl,
    ...(Platform.OS === 'web' && {
      maxWidth: 1175,
      alignSelf: 'center',
    }),
  },
  gradient: {
    flex: 1,
    width: '100%',
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    ...(Platform.OS === 'web' && {
      maxWidth: 1200,
      alignSelf: 'center',
    }),
  },
  content: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  title: {
    ...Typography.h2,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  divider: {
    width: 60,
    height: 4,
    // backgroundColor: '#rgba(88, 68, 237, 0.18)',
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.md,
  },
  subtitle: {
    ...Typography.body,
    // color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  contactInfo: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
    // width: '100%',
    width: Platform.OS === 'web' ? '100%' : '50%',
    maxWidth: 600,
  },
  contactItem: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    flex: Platform.OS === 'web' ? 1 : undefined,
    ...(Platform.OS !== 'web' && {
      width: '100%',
    }),
  },
  
  contactIcon: {
    fontSize: 24,
    marginRight: Spacing.sm,
  },
  contactText: {
    ...Typography.body,
    color: 'rgba(5, 5, 5, 0.55)',
  },
  form: {
    width: '100%',
    maxWidth: 600,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    ...Typography.body,
    color: '#1f2937',
    marginBottom: Spacing.md,
    borderWidth: 2,
  },
  messageInput: {
    minHeight: 120,
    paddingTop: Spacing.md,
  },
  submitButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  submitButtonText: {
    ...Typography.body,
    color: '#6366f1',
    fontWeight: '600',
  },
  footer: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  footerText: {
    ...Typography.bodySmall,
  },
});

