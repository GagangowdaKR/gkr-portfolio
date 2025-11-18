import React from 'react';
import { View, Text, StyleSheet, Platform, Linking } from 'react-native';
import { Spacing, Typography, BorderRadius, lightColors, darkColors } from '@/constants/Theme';
import { useTheme } from '@/contexts/ThemeContext';
import Hoverable from './Hoverable';

type Card = {
  title: string;
  description: string;
  url: string;
};

const CARDS: Card[] = [
  {
    title: 'LeetCode',
    description:
      'Preferred platform for practical coding with real-world problem solving and a collaborative community.',
    url: 'https://leetcode.com/',
  },
  {
    title: 'CodeChef',
    description:
      'Hands-on coding and competitive programming contests that inspire continuous improvement.',
    url: 'https://www.codechef.com/',
  },
  {
    title: 'GeeksforGeeks',
    description:
      'Vast tutorials and challenges that strengthen core concepts and problem-solving skills.',
    url: 'https://www.geeksforgeeks.org/',
  },
];

export default function Coding() {
  const { isDark } = useTheme();
  const Colors = isDark ? darkColors : lightColors;
  const open = (url: string) => Linking.openURL(url).catch(() => {});

  return (
    <View style={styles.container}>
      <View style={[styles.content, { backgroundColor: Colors.background, borderColor: Colors.border, borderWidth: 1 }]}>
      <Text style={[styles.title, { color: Colors.text }]}>Coding</Text>
      <View style={[styles.divider, { backgroundColor: Colors.secondary }]} />
      <View style={styles.grid}>
        {CARDS.map((card) => (
          <Hoverable
            key={card.title}
            style={[
              styles.card,
              { backgroundColor: Colors.backgroundLight, borderColor: Colors.border, borderWidth: 1 },
            ]}
          >
            <Text style={[styles.cardTitle, { color: Colors.text }]}>
              {card.title}
            </Text>
            <Text style={[styles.cardDesc, { color: Colors.textLight }]}>
              {card.description}
            </Text>
            <Hoverable
              style={[
                styles.cta,
                { backgroundColor: Colors.primary + '20' },
              ]}
              onPress={() => open(card.url)}
            >
              <Text style={[styles.ctaText, { color: Colors.primary }]}>Learn more</Text>
              
            </Hoverable>
          </Hoverable>
        ))}
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    // paddingHorizontal: Spacing.lg,
    // marginBottom: Spacing.xxl,
    // ...(Platform.OS === 'web' && { maxWidth: 1200, alignSelf: 'center' }),
    width: '100%',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xxl,
    ...(Platform.OS === 'web' && {
      maxWidth: 1200,
      alignSelf: 'center',
    }),
  },content: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  title: {
    ...Typography.h2,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  divider: {
    width: 60,
    height: 4,
    alignSelf: 'center',
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.xl,
  },
  grid: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    gap: Spacing.lg,
  },
  card: {
    flex: Platform.OS === 'web' ? 1 : undefined,
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
  },
  cardTitle: {
    ...Typography.h3,
    marginBottom: Spacing.sm,
  },
  cardDesc: {
    ...Typography.body,
    lineHeight: 24,
    marginBottom: Spacing.lg,
  },
  cta: {
    alignSelf: 'flex-start',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.full,
  },
  ctaText: {
    ...Typography.body,
    // color: '#ffffff',
    fontWeight: '600',
  },
});


