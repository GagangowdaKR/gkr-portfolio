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

// ✅ Local static asset references using require()
const skillIcons = [
  { name: 'Java', icon: require('../assets/skill-icons/Java.png') },
  { name: 'Spring Boot', icon: require('../assets/skill-icons/Spring Boot.png') },
  { name: 'Microservices', icon: require('../assets/skill-icons/Microservices.png') },
  { name: 'RabbitMQ', icon: require('../assets/skill-icons/RabbitMQ.png') },
  { name: 'Spring Security', icon: require('../assets/skill-icons/Spring Security.png') },
  { name: 'MySQL', icon: require('../assets/skill-icons/MySQL.png') },
  { name: 'MariaDB', icon: require('../assets/skill-icons/MariaDB.png') },
  { name: 'MongoDB', icon: require('../assets/skill-icons/MongoDB.png') },
  { name: 'PostgreSQL', icon: require('../assets/skill-icons/Postgresql.png') },
  { name: 'Spring Mail', icon: require('../assets/skill-icons/Spring Mail.png') },
  { name: 'Redis Cache', icon: require('../assets/skill-icons/Redis.png') },
  { name: 'Elastic Search', icon: require('../assets/skill-icons/Elastic Search.png') },
  { name: 'JQuery', icon: require('../assets/skill-icons/JQuery.png') },
  { name: 'JUnit', icon: require('../assets/skill-icons/JUnit.png') },
  { name: 'JWT', icon: require('../assets/skill-icons/JWT.png') },
  { name: 'OAuth2', icon: require('../assets/skill-icons/OAuth2.png') },
  { name: 'Maven', icon: require('../assets/skill-icons/Maven.png') },
  { name: 'Gradle', icon: require('../assets/skill-icons/Gradle.png') },
  { name: 'Rest API', icon: require('../assets/skill-icons/RestAPI.png') },
  { name: 'SFTP', icon: require('../assets/skill-icons/SFTP.png') },
  { name: 'Linux', icon: require('../assets/skill-icons/Linux.png') },
  { name: 'Docker', icon: require('../assets/skill-icons/Docker.png') },
  { name: 'CICD', icon: require('../assets/skill-icons/CICD.png') },
  { name: 'Jenkins', icon: require('../assets/skill-icons/Jenkins.png') },
  { name: 'Portainer', icon: require('../assets/skill-icons/Portainer.png') },
  { name: 'Git', icon: require('../assets/skill-icons/Git.png') },
  { name: 'Github', icon: require('../assets/skill-icons/Github.png') },
  { name: 'Bitbucket', icon: require('../assets/skill-icons/Bitbucket.png') },
  { name: 'Jira', icon: require('../assets/skill-icons/Jira.png') },
  { name: 'React Native', icon: require('../assets/skill-icons/React Native.png') },
  { name: 'Cross Platform', icon: require('../assets/skill-icons/Cross-Platform.png') },
  { name: 'HTML', icon: require('../assets/skill-icons/HTML.png') },
  { name: 'CSS', icon: require('../assets/skill-icons/CSS.png') },
  { name: 'JSON 5', icon: require('../assets/skill-icons/JSON.png') },
  { name: 'JavaScript', icon: require('../assets/skill-icons/JavaScript.png') },
  { name: 'Postman', icon: require('../assets/skill-icons/Postman.png') },
  { name: 'Bruno', icon: require('../assets/skill-icons/Bruno.png') },
  { name: 'IntelliJ IDEA', icon: require('../assets/skill-icons/IntelliJ.png') },
  { name: 'Visual Studio', icon: require('../assets/skill-icons/VSCode.png') },
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
  }, [animations]);

  return (
    <View nativeID="skills" style={styles.container}>
      <View
        style={[
          styles.content,
          {
            backgroundColor: Colors.backgroundLight,
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
                  source={skill.icon} // ✅ Directly passing the locally requested asset resource mapping object
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