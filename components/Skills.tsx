import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import {
  Spacing,
  Typography,
  BorderRadius,
  lightColors,
  darkColors,
} from '@/constants/Theme';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

// ✅ PNG URLs (compatible with Android & iOS)
const skillIcons = [
  {
    name: 'Java',
    icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968282.png',
  },
  {
    name: 'DSA',
    icon: 'https://cdn-icons-png.flaticon.com/512/906/906324.png',
  },
  {
    name: 'MySQL',
    icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968313.png',
  },
  {
    name: 'HTML/CSS',
    icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968267.png',
  },
  {
    name: 'Spring Boot',
    icon: 'https://cdn-icons-png.flaticon.com/512/1183/1183672.png',
  },
];

export default function Skills() {
  const { isDark } = useTheme();
  const Colors = isDark ? darkColors : lightColors;

  const animations = useRef(skillIcons.map(() => new Animated.Value(0))).current;

  // Floating animation
  useEffect(() => {
    const loops = animations.map((anim) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 4000 + Math.random() * 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 4000 + Math.random() * 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      )
    );

    loops.forEach((loop) => loop.start());
    return () => loops.forEach((loop) => loop.stop());
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.content,
          {
            backgroundColor: Colors.background,
            borderColor: Colors.border,
          },
        ]}
      >
        <Text style={[styles.title, { color: Colors.text }]}>
          Technical Skills
        </Text>
        <View style={[styles.divider, { backgroundColor: Colors.primary }]} />
        <Text style={[styles.subtitle, { color: Colors.textLight }]}>
          Tools and technologies I use
        </Text>

        {/* Floating icons */}
        <View style={styles.iconGrid}>
          {skillIcons.map((skill, index) => {
            const translateY = animations[index].interpolate({
              inputRange: [0, 1],
              outputRange: [0, -8],
            });

            return (
              <Animated.View
                key={skill.name}
                style={[
                  styles.iconWrapper,
                  { transform: [{ translateY }] },
                ]}
              >
                <Image
                  source={{ uri: skill.icon }}
                  style={styles.skillIcon}
                  resizeMode="contain"
                />
                <Text style={[styles.iconLabel, { color: Colors.text }]}>
                  {skill.name}
                </Text>
              </Animated.View>
            );
          })}
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
    borderWidth: 1,
    overflow: 'hidden',
    alignItems: 'center',
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
    marginBottom: Spacing.md,
  },
  subtitle: {
    ...Typography.body,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    marginTop: Spacing.md,
    rowGap: 20,
    columnGap: 25,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
  },
  skillIcon: {
    width: 55,
    height: 55,
    borderRadius: 10,
  },
  iconLabel: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
});
