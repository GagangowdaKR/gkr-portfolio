import React from 'react';
import { View, Text, StyleSheet, Platform, Linking, Image, ScrollView, useWindowDimensions } from 'react-native';
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
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  // Compute card width dynamically for mobile so it never exceeds screen bounds
  const mobileCardWidth = Math.min(width * 0.72, 280);

  const open = (url: string) => Linking.openURL(url).catch(() => {});

  const renderCards = () => (
    <>
      {CARDS.map((card) => (
        <Hoverable
          key={card.title}
          style={[
            styles.card,
            { 
              backgroundColor: Colors.backgroundLight, 
              borderColor: Colors.border, 
              borderWidth: 1,
              width: isMobile ? mobileCardWidth : 'calc(25% - 18px)',
              marginRight: isMobile ? Spacing.md : 0,
            },
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

          {/* Flex wrapper around text */}
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
    </>
  );

  return (
    <View nativeID="coding" style={styles.container}>
      <View style={[styles.content, { backgroundColor: Colors.background, borderColor: Colors.border, borderWidth: 1 }]}>
        <Text style={[styles.title, { color: Colors.text }]}>Coding</Text>
        <View style={[styles.divider, { backgroundColor: Colors.primary }]} />

        {isMobile ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.mobileScrollView}
            contentContainerStyle={styles.mobileScrollContainer}
            decelerationRate="fast"
            snapToInterval={mobileCardWidth + 16}
          >
            {renderCards()}
          </ScrollView>
        ) : (
          <View style={styles.grid}>
            {renderCards()}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xxl,
    boxSizing: 'border-box' as any,
    ...(Platform.OS === 'web' && {
      maxWidth: 1200,
      alignSelf: 'center',
    }),
  },
  content: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden', // Clips overflowing scroll components cleanly inside the card boundary
    boxSizing: 'border-box' as any,
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
    flexDirection: 'row',
    gap: Spacing.lg,
    width: '100%',
    justifyContent: 'center',
  },
  mobileScrollView: {
    width: '100%',
    alignSelf: 'stretch',
  },
  mobileScrollContainer: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.xs,
  },
  card: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    flexDirection: 'column', 
    cursor: 'auto',
    boxSizing: 'border-box' as any,
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