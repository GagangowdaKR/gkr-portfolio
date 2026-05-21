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
    <View nativeID="contact" style={styles.container}>
      {/* <LinearGradient
        colors={[Colors.gray600, Colors.gray600]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      > */}
        <View style={[styles.content, { backgroundColor: Colors.background, borderColor: Colors.border, borderWidth: 1 }]}>
          <Text style={styles.title}>Contact Me</Text>
          <View style={styles.divider} />
          <Text style={[styles.subtitle, { color: Colors.textLight }]}>
            I value open communication. For inquiries or collaborations, feel free to reach out.
          </Text>

          <View style={[styles.contactInfo]}>
            <Hoverable
              style={[styles.contactItem, { backgroundColor: Colors.backgroundLight, borderColor: Colors.border, borderWidth: 1  }]}
              onPress={() => openLink('mailto:gagandarshan22@gmail.com')}
            >
              <Text style={styles.contactIcon}>📧</Text>
              <Text style={[styles.contactText, { color: Colors.textLight }]}>gagandarshan22@gmail.com</Text>
            </Hoverable>
            <Hoverable
              style={[styles.contactItem, { backgroundColor: Colors.backgroundLight, borderColor: Colors.border, borderWidth: 1  }]}
              onPress={() => openLink('tel:+916364109281')}
            >
              <Text style={styles.contactIcon}>📱</Text>
              <Text style={[styles.contactText, { color: Colors.textLight }]}>+91 63641 09281</Text>
            </Hoverable>
            <Hoverable
              style={[styles.contactItem, { backgroundColor: Colors.backgroundLight, borderColor: Colors.border, borderWidth: 1  }]}
              onPress={() => openLink('https://github.com/yourusername')}
            >
              <Text style={styles.contactIcon}>💼</Text>
              <Text style={[styles.contactText, { color: Colors.textLight }]}>GitHub</Text>
            </Hoverable>
            <Hoverable
              style={[styles.contactItem, { backgroundColor: Colors.backgroundLight, borderColor: Colors.border, borderWidth: 1  }]}
              onPress={() => openLink('https://linkedin.com/in/yourusername')}
            >
              <Text style={styles.contactIcon}>🔗</Text>
              <Text style={[styles.contactText, { color: Colors.textLight }]}>LinkedIn</Text>
            </Hoverable>
          </View>

          <View style={styles.form}>
            <TextInput
              style={[styles.input, { color: Colors.primary, borderColor: Colors.border, borderWidth: 1 }]}
              placeholder="Your Name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={[styles.input, { color: Colors.primary, borderColor: Colors.border, borderWidth: 1 }]}
              placeholder="Your Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={[styles.input, styles.messageInput, { color: Colors.primary, borderColor: Colors.border, borderWidth: 1 }]}
              placeholder="Your Message"
              placeholderTextColor="#999"
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
            <Hoverable
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Send Message</Text>
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
    color: 'rgba(255, 102, 0, 0.24)',
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  divider: {
    width: 60,
    height: 4,
    backgroundColor: '#ffffff',
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.md,
  },
  subtitle: {
    ...Typography.body,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  contactInfo: {
    flexDirection: Platform.OS === 'web' ? 'column-reverse' : 'column',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
    width: '100%',
    maxWidth: 300,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
    color: '#ffffff',
  },
  form: {
    width: '100%',
    maxWidth: 600,
  },
  input: {
    backgroundColor: 'rgba(163, 125, 125, 0.1)',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    ...Typography.body,
    // color: '#3868aa',
    marginBottom: Spacing.md,
    borderWidth: 2,
    // borderColor: 'rgba(255, 102, 0, 0.15)',
  },
  messageInput: {
    minHeight: 120,
    paddingTop: Spacing.md,
  },
  submitButton: {
    backgroundColor: 'rgba(255, 102, 0, 0.15)',
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

