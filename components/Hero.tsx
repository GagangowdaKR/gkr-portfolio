import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import { Spacing, Typography, BorderRadius, Colors } from '@/constants/Theme';
import { Spacing, Typography, BorderRadius, lightColors, darkColors } from '@/constants/Theme';
import { useTheme } from '@/contexts/ThemeContext';
import Hoverable from './Hoverable';

export default function Hero() {
  const { theme, toggleTheme, isDark } = useTheme();
  const Colors = isDark ? darkColors : lightColors;
  return (
    
    <View style={styles.container}> 
        <View style={[styles.content, { backgroundColor: Colors.backgroundLight, borderColor: Colors.border, borderWidth: 1 }]}>
          <Text style={styles.greeting}>Hello, I'm</Text>
          <Text style={[styles.name, { color: Colors.primary}]}>Gagan Gowda   K  R</Text>
          <Text style={styles.title}>Associate Software Engineer</Text>
          <Text style={[styles.description, {color: Colors.textLight}]}>
            Welcome to my world where kindness guides everything I do. I’m a
            nature enthusiast and a hardworking soul, crafting a future filled
            with dreams and dedication.
          </Text>
          <View style={[styles.buttonContainer, {borderColor : Colors.secondary}]}>
            <Hoverable style={[styles.primaryButton ,{borderColor : Colors.secondary}]}>
              <Text style={styles.primaryButtonText}>Download Resume</Text>
            </Hoverable>
            <Hoverable style={[styles.secondaryButton, {borderColor : Colors.secondary}]}>
              <Text style={styles.secondaryButtonText}>Know more</Text>
            </Hoverable>
          </View>
        </View>
      {/* </LinearGradient> */}
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
  greeting: {
    ...Typography.h4,
    color: 'rgba(135, 135, 135, 0.76)',
    marginBottom: Spacing.sm,
  },
  name: {
    ...Typography.h1,
    // color: 'rgba(255, 102, 0, 0.33)',
    marginBottom: Spacing.sm,
    textAlign: 'center',
    ...(Platform.OS === 'web' && {
      fontSize: 64,
      lineHeight: 72,
    }),
  },
  title: {
    ...Typography.h3,
    color: 'rgba(150, 150, 150, 0.9)',
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  description: {
    ...Typography.body,
    // color: 'rgba(60, 57, 57, 0.9)',
    textAlign: 'center',
    maxWidth: Platform.OS === 'web' ? 600 : '100%',
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.md,
    lineHeight: 28,
  },
  buttonContainer: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    gap: Spacing.md,
    width: Platform.OS === 'web' ? 'auto' : '100%',
    paddingHorizontal: Spacing.md,
  },
  primaryButton: {
    backgroundColor: 'rgba(179, 172, 172, 0.16)',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    // borderColor: 'rgba(255, 102, 0, 0.15)',
    minWidth: Platform.OS === 'web' ? 160 : '100%',
    alignItems: 'center',
  },
  primaryButtonText: {
    ...Typography.body,
    color: 'rgba(157, 142, 142, 0.95)',
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    // borderColor: 'rgba(255, 102, 0, 0.15)',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.full,
    minWidth: Platform.OS === 'web' ? 160 : '100%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    ...Typography.body,
    color: 'rgba(157, 142, 142, 0.95)',
    fontWeight: '600',
  },
});

