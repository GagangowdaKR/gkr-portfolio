import React from 'react';
import { View, Text, StyleSheet, Platform, Linking, Image } from 'react-native';
import { Spacing, Typography, BorderRadius, lightColors, darkColors } from '@/constants/Theme';
import { useTheme } from '@/contexts/ThemeContext';
import Hoverable from './Hoverable';

type Card = {
  title: string;
  description: string;
  url: string;
  icon: any;
};

const CARDS: Card[] = [
  {
    title: 'LeetCode',
    description:
      'Preferred platform for practical coding with real-world problem solving and a collaborative community.',
    url: 'https://leetcode.com/gagandarshan22/',
    icon: require('../assets/coding-icons/LeetCode.png'),
  },
  {
    title: 'HackerRank',
    description:
      'Excellent track for mastering foundational programming languages, tracking core algorithms, and earning skill badges.',
    url: 'https://www.hackerrank.com/profile/Gagandarshan22',
    icon: require('../assets/coding-icons/HackerRank.png'),
  },
  {
    title: 'CodeChef',
    description:
      'Hands-on coding and competitive programming contests that inspire continuous improvement.',
    url: 'https://www.codechef.com/users/gagan_gowda_kr',
    icon: require('../assets/coding-icons/CodeChef.png'),
  },
  {
    title: 'GeeksforGeeks',
    description:
      'Vast tutorials and challenges that strengthen core concepts and problem-solving skills.',
    url: 'https://www.geeksforgeeks.org/user/gagandar0cy4/',
    icon: require('../assets/coding-icons/GeeksforGeeks.png'),
  },
];

export default function Coding() {
  const { isDark } = useTheme();
  const Colors = isDark ? darkColors : lightColors;
  const open = (url: string) => Linking.openURL(url).catch(() => {});

  return (
    <View nativeID="coding" style={styles.container}>
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
              {/* Header Container */}
              <View style={styles.cardHeader}>
                <Image
                  source={card.icon}
                  style={styles.platformIcon}
                  resizeMode="contain"
                />
                <Text style={[styles.cardTitle, { color: Colors.text }]} numberOfLines={1}>
                  {card.title}
                </Text>
              </View>

              {/* Flex wrapper around the text to force the button below it down evenly */}
              <View style={styles.bodyWrapper}>
                <Text style={[styles.cardDesc, { color: Colors.textLight }]}>
                  {card.description}
                </Text>
              </View>
              
              <Hoverable
                style={[
                  styles.cta,
                  { backgroundColor: Colors.primary + '20' },
                ]}
                onPress={() => open(card.url)}
              >
                <Text style={[styles.ctaText, { color: Colors.primary }]}>View Profile ↗</Text>
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
    width: '100%',
  },
  card: {
    flex: Platform.OS === 'web' ? 1 : undefined,
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    flexDirection: 'column', 
    cursor: 'auto',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  platformIcon: {
    width: 24, 
    height: 24,
  },
  cardTitle: {
    fontSize: Platform.OS === 'web' ? 20 : 18, 
    fontWeight: '700',
    flexShrink: 1,
  },
  bodyWrapper: {
    flex: 1, 
    justifyContent: 'flex-start',
  },
  cardDesc: {
    ...Typography.bodySmall, 
    lineHeight: 22,
    marginBottom: Spacing.lg,
    // Removed textAlign: 'justify' for a natural text layout
  },
  cta: {
    alignSelf: 'flex-start',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.full,
    marginTop: 'auto', 
  },
  ctaText: {
    fontSize: 14,
    fontWeight: '600',
  },
});