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
    <View nativeID="about" style={styles.container}>
      <View style={[styles.content, { backgroundColor: Colors.backgroundLight, borderColor: Colors.border, borderWidth: 1 }]}>
        <Text style={[styles.title, { color: Colors.text }]}>About Me</Text>
        <View style={[styles.divider, { backgroundColor: Colors.primary }]} />
        <Text style={[styles.description, { color: Colors.textLight }]}>
          I am a Junior Software Engineer based in Bengaluru, passionate about designing and developing robust 
          backend applications. With a solid foundation in Design Principles, SOLID Principles, Object-Oriented Programming (OOP) and 
          Data Structures & Algorithms (DSA), I specialize in building scalable RESTful APIs and working within microservices environments.
        </Text>
        <Text style={[styles.description, { color: Colors.textLight }]}>
          I thrive on solving complex problems, a passion backed by successfully tackling 1000+ coding problems across
          competitive programming platforms like LeetCode, GeeksforGeeks, and CodeChef. Whether optimizing system performance 
          or collaborating across cross-functional teams, I am always eager to enhance my technical expertise and deliver high-quality 
          software solutions.
        </Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: Colors.primary }]}>Java</Text>
            <Text style={[styles.statLabel, { color: Colors.textLight }]}>Versions :  Java - 8 / 17 / 21 / 25</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: Colors.primary }]}>Spring Boot</Text>
            <Text style={[styles.statLabel, { color: Colors.textLight }]}>Versions :  Spring Boot - 3.0 / 4.0</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: Colors.primary }]}>Microservices</Text>
            <Text style={[styles.statLabel, { color: Colors.textLight }]}>Distributed System Architecture</Text>
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

