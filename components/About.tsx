import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { Spacing, Typography, BorderRadius, lightColors, darkColors } from '@/constants/Theme';
import { useTheme } from '@/contexts/ThemeContext';

export default function About() {
  const { isDark } = useTheme();
  const Colors = isDark ? darkColors : lightColors;

  return (
    <View style={styles.container}>
      <View style={[styles.content, { backgroundColor: Colors.backgroundLight }]}>
        <Text style={[styles.title, { color: Colors.text }]}>About Me</Text>
        <View style={[styles.divider, { backgroundColor: Colors.primary }]} />
        <Text style={[styles.description, { color: Colors.textLight }]}>
          Step Into My World! Welcome to the enchanting realm I call my own,
          where kindness is not just a choice but a way of life. I am a
          simple-hearted soul, navigating the twists and turns of life with a
          genuine passion for spreading warmth and positivity.
        </Text>
        <Text style={[styles.description, { color: Colors.textLight }]}>
          As a fervent lover of nature, I find solace in its embrace, drawing
          inspiration from the delicate dance of leaves and the symphony of
          birdsong. In the tapestry of my life, each thread is woven with the
          qualities of a hard worker, diligently crafting a future filled with
          dreams and aspirations.
        </Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: Colors.primary }]}>Java</Text>
            <Text style={[styles.statLabel, { color: Colors.textLight }]}>Technical Skill</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: Colors.primary }]}>DSA</Text>
            <Text style={[styles.statLabel, { color: Colors.textLight }]}>Technical Skill</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: Colors.primary }]}>MySQL</Text>
            <Text style={[styles.statLabel, { color: Colors.textLight }]}>Technical Skill</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xxl,
    ...(Platform.OS === 'web' && {
      maxWidth: 1200,
      alignSelf: 'center',
    }),
  },
  content: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
  },
  title: {
    ...Typography.h2,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  divider: {
    width: 60,
    height: 4,
    alignSelf: 'center',
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.xl,
  },
  description: {
    ...Typography.body,
    lineHeight: 28,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    justifyContent: 'space-around',
    marginTop: Spacing.xl,
    gap: Spacing.lg,
  },
  statItem: {
    alignItems: 'center',
    flex: Platform.OS === 'web' ? 1 : undefined,
  },
  statNumber: {
    ...Typography.h2,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    ...Typography.bodySmall,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

