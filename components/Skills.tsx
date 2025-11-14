// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Platform,
//   ScrollView,
// } from 'react-native';
// import { Spacing, Typography, BorderRadius, lightColors, darkColors } from '@/constants/Theme';
// import { useTheme } from '@/contexts/ThemeContext';

// interface Skill {
//   name: string;
//   level: number; // 0-100
//   category: 'Technical' | 'Professional';
// }

// const skills: Skill[] = [
//   { name: 'Java', level: 90, category: 'Technical' },
//   { name: 'DSA', level: 88, category: 'Technical' },
//   { name: 'MySQL', level: 80, category: 'Technical' },
//   { name: 'HTML/CSS', level: 85, category: 'Technical' },
//   { name: 'Spring Boot', level: 75, category: 'Technical' },
//   { name: 'Creativity', level: 85, category: 'Professional' },
//   { name: 'Problem-Solving', level: 88, category: 'Professional' },
//   { name: 'Communication', level: 75, category: 'Professional' },
//   { name: 'TeamWork', level: 90, category: 'Professional' },
// ];

// const categories = ['Technical', 'Professional'];

// export default function Skills() {
//   const { isDark } = useTheme();
//   const Colors = isDark ? darkColors : lightColors;

//   const getCategoryColor = (category: string) => {
//     switch (category) {
//       case 'Technical':
//         return { backgroundColor: Colors.primary };
//       case 'Professional':
//         return { backgroundColor: Colors.accent };
//       default:
//         return { backgroundColor: Colors.primary };
//     }
//   };

//   const groupedSkills = categories.map((category) => ({
//     category,
//     skills: skills.filter((s) => s.category === category),
//   }));

//   return (
//     <View style={styles.container}>
//       <View
//         style={[
//           styles.content,
//           {
//             backgroundColor: Colors.background,
//             borderColor: Colors.border,
//           },
//         ]}
//       >
//         <Text style={[styles.title, { color: Colors.text }]}>
//           Skills & Technologies
//         </Text>
//         <View style={[styles.divider, { backgroundColor: Colors.primary }]} />
//         <Text style={[styles.subtitle, { color: Colors.textLight }]}>
//           Here are some of the technologies I work with
//         </Text>
//         <ScrollView
//           horizontal={false}
//           showsHorizontalScrollIndicator={false}
//           style={styles.scrollView}
//         >
//           <View style={styles.skillsGrid}>
//             {groupedSkills.map(({ category, skills: categorySkills }) => (
//               <View key={category} style={styles.categorySection}>
//                 <Text style={[styles.categoryTitle, { color: Colors.text }]}>
//                   {category}
//                 </Text>
//                 <View style={styles.skillsList}>
//                   {categorySkills.map((skill) => (
//                     <View key={skill.name} style={styles.skillItem}>
//                       <View style={styles.skillHeader}>
//                         <Text style={[styles.skillName, { color: Colors.text }]}>
//                           {skill.name}
//                         </Text>
//                         <Text
//                           style={[styles.skillLevel, { color: Colors.textLight }]}
//                         >
//                           {skill.level}%
//                         </Text>
//                       </View>
//                       <View
//                         style={[
//                           styles.progressBar,
//                           { backgroundColor: Colors.backgroundLight },
//                         ]}
//                       >
//                         <View
//                           style={[
//                             styles.progressFill,
//                             { width: `${skill.level}%` },
//                             getCategoryColor(skill.category),
//                           ]}
//                         />
//                       </View>
//                     </View>
//                   ))}
//                 </View>
//               </View>
//             ))}
//           </View>
//         </ScrollView>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     paddingHorizontal: Spacing.lg,
//     marginBottom: Spacing.xxl,
//     ...(Platform.OS === 'web' && {
//       maxWidth: 1200,
//       alignSelf: 'center',
//     }),
//   },
//   content: {
//     padding: Spacing.xl,
//     borderRadius: BorderRadius.lg,
//     borderWidth: 1,
//   },
//   title: {
//     ...Typography.h2,
//     marginBottom: Spacing.md,
//     textAlign: 'center',
//   },
//   divider: {
//     width: 60,
//     height: 4,
//     alignSelf: 'center',
//     borderRadius: BorderRadius.sm,
//     marginBottom: Spacing.md,
//   },
//   subtitle: {
//     ...Typography.body,
//     textAlign: 'center',
//     marginBottom: Spacing.xl,
//   },
//   scrollView: {
//     flexGrow: 0,
//   },
//   skillsGrid: {
//     flexDirection: Platform.OS === 'web' ? 'row' : 'column',
//     flexWrap: Platform.OS === 'web' ? 'wrap' : 'nowrap',
//     gap: Spacing.lg,
//   },
//   categorySection: {
//     flex: Platform.OS === 'web' ? 1 : undefined,
//     minWidth: Platform.OS === 'web' ? 250 : '100%',
//   },
//   categoryTitle: {
//     ...Typography.h4,
//     marginBottom: Spacing.md,
//   },
//   skillsList: {
//     gap: Spacing.md,
//   },
//   skillItem: {
//     marginBottom: Spacing.md,
//   },
//   skillHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: Spacing.xs,
//   },
//   skillName: {
//     ...Typography.body,
//     fontWeight: '600',
//   },
//   skillLevel: {
//     ...Typography.bodySmall,
//   },
//   progressBar: {
//     height: 8,
//     borderRadius: BorderRadius.full,
//     overflow: 'hidden',
//   },
//   progressFill: {
//     height: '100%',
//     borderRadius: BorderRadius.full,
//   },
// });

// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Platform,
//   Image,
// } from 'react-native';
// import {
//   Spacing,
//   Typography,
//   BorderRadius,
//   lightColors,
//   darkColors,
// } from '@/constants/Theme';
// import { useTheme } from '@/contexts/ThemeContext';

// // Example: Replace with your icon imports or local assets
// const skillIcons = [
//   { name: 'Java', icon: require('../assets/icons/java.png') },
//   { name: 'DSA', icon: require('../assets/icons/dsa.png') },
//   { name: 'MySQL', icon: require('../assets/icons/mysql.png') },
//   { name: 'HTML/CSS', icon: require('../assets/icons/html.png') },
//   { name: 'Spring Boot', icon: require('../assets/icons/spring.png') },
// ];


// export default function Skills() {
//   const { isDark } = useTheme();
//   const Colors = isDark ? darkColors : lightColors;

//   return (
//     <View style={styles.container}>
//       <View
//         style={[
//           styles.content,
//           {
//             backgroundColor: Colors.background,
//             borderColor: Colors.border,
//           },
//         ]}
//       >
//         <Text style={[styles.title, { color: Colors.text }]}>
//           Technical Skills
//         </Text>
//         <View style={[styles.divider, { backgroundColor: Colors.primary }]} />
//         <Text style={[styles.subtitle, { color: Colors.textLight }]}>
//           Tools and technologies I use
//         </Text>

//         <View style={styles.iconFrame}>
//           {skillIcons.map((skill, index) => (
//             <Image
//               key={skill.name}
//               source={skill.icon}
//               style={[
//                 styles.skillIcon,
//                 // Slightly random floating positions
//                 {
//                   top: 40 + (index * 40) % 150,
//                   left: 50 + (index * 70) % 220,
//                 },
//               ]}
//               resizeMode="contain"
//             />
//           ))}
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     paddingHorizontal: Spacing.lg,
//     marginBottom: Spacing.xxl,
//     ...(Platform.OS === 'web' && {
//       maxWidth: 1200,
//       alignSelf: 'center',
//     }),
//   },
//   content: {
//     padding: Spacing.xl,
//     borderRadius: BorderRadius.lg,
//     borderWidth: 1,
//     overflow: 'hidden',
//     minHeight: 300,
//   },
//   title: {
//     ...Typography.h2,
//     marginBottom: Spacing.md,
//     textAlign: 'center',
//   },
//   divider: {
//     width: 60,
//     height: 4,
//     alignSelf: 'center',
//     borderRadius: BorderRadius.sm,
//     marginBottom: Spacing.md,
//   },
//   subtitle: {
//     ...Typography.body,
//     textAlign: 'center',
//     marginBottom: Spacing.xl,
//   },
//   iconFrame: {
//     position: 'relative',
//     height: 250,
//     width: '100%',
//   },
//   skillIcon: {
//     position: 'absolute',
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     opacity: 0.9,
//   },
// });

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
