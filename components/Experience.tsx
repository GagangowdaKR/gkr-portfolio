import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { Spacing, Typography, BorderRadius, lightColors, darkColors } from '@/constants/Theme';
import { useTheme } from '@/contexts/ThemeContext';
import Hoverable from './Hoverable';

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: '1',
    role: 'Senior Full Stack Developer',
    company: 'Tech Innovations Inc.',
    period: '2022 - Present',
    description: [
      'Led development of multiple client projects using React, Node.js, and cloud services',
      'Mentored junior developers and conducted code reviews',
      'Improved application performance by 40% through optimization',
    ],
    technologies: ['React', 'Node.js', 'AWS', 'TypeScript'],
  },
  {
    id: '2',
    role: 'Full Stack Developer',
    company: 'Digital Solutions Ltd.',
    period: '2020 - 2022',
    description: [
      'Developed and maintained web applications for enterprise clients',
      'Collaborated with cross-functional teams to deliver high-quality products',
      'Implemented responsive designs and mobile-first approaches',
    ],
    technologies: ['React', 'Spring Boot', 'PostgreSQL', 'Docker'],
  },
  {
    id: '3',
    role: 'Frontend Developer',
    company: 'StartupXYZ',
    period: '2019 - 2020',
    description: [
      'Built user interfaces for web and mobile applications',
      'Worked with design teams to implement pixel-perfect UIs',
      'Optimized applications for maximum speed and scalability',
    ],
    technologies: ['React', 'React Native', 'Redux', 'JavaScript'],
  },
];

export default function Experience() {
  const { isDark } = useTheme();
  const Colors = isDark ? darkColors : lightColors;

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
          Professional Experience
        </Text>
        <View style={[styles.divider, { backgroundColor: Colors.primary }]} />
        <Text style={[styles.subtitle, { color: Colors.textLight }]}>
          My career journey
        </Text>
        <View style={styles.timeline}>
          {experiences.map((exp, index) => (
            <View key={exp.id} style={styles.timelineItem}>
              <Hoverable
                style={[
                  styles.timelineContent,
                  {
                    backgroundColor: Colors.backgroundLight,
                    borderLeftColor: Colors.primary,
                  },
                ]}
              >
                <View style={styles.timelineHeader}>
                  <View
                    style={[
                      styles.timelineDot,
                      { backgroundColor: Colors.primary },
                    ]}
                  />
                  <View style={styles.timelineInfo}>
                    <Text style={[styles.role, { color: Colors.text }]}>
                      {exp.role}
                    </Text>
                    <Text style={[styles.company, { color: Colors.primary }]}>
                      {exp.company}
                    </Text>
                    <Text style={[styles.period, { color: Colors.textLight }]}>
                      {exp.period}
                    </Text>
                  </View>
                </View>
                <View style={styles.descriptionContainer}>
                  {exp.description.map((desc, descIndex) => (
                    <Text
                      key={descIndex}
                      style={[styles.descriptionItem, { color: Colors.textLight }]}
                    >
                      • {desc}
                    </Text>
                  ))}
                </View>
                <View style={styles.technologiesContainer}>
                  {exp.technologies.map((tech, techIndex) => (
                    <View
                      key={techIndex}
                      style={[
                        styles.techTag,
                        { backgroundColor: Colors.primary + '20' },
                      ]}
                    >
                      <Text
                        style={[styles.techTagText, { color: Colors.primary }]}
                      >
                        {tech}
                      </Text>
                    </View>
                  ))}
                </View>
              </Hoverable>
              {index < experiences.length - 1 && (
                <View
                  style={[styles.timelineLine, { backgroundColor: Colors.border }]}
                />
              )}
            </View>
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
    borderWidth: 1,
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
  timeline: {
    ...(Platform.OS === 'web' && {
      maxWidth: 800,
      alignSelf: 'center',
    }),
  },
  timelineItem: {
    marginBottom: Spacing.xl,
  },
  timelineContent: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderLeftWidth: 4,
  },
  timelineHeader: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: Spacing.md,
    marginTop: Spacing.xs,
  },
  timelineInfo: {
    flex: 1,
  },
  role: {
    ...Typography.h4,
    marginBottom: Spacing.xs,
  },
  company: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  period: {
    ...Typography.bodySmall,
  },
  descriptionContainer: {
    marginBottom: Spacing.md,
    paddingLeft: Spacing.md,
  },
  descriptionItem: {
    ...Typography.bodySmall,
    lineHeight: 24,
    marginBottom: Spacing.xs,
  },
  technologiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    paddingLeft: Spacing.md,
  },
  techTag: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  techTagText: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  timelineLine: {
    width: 2,
    height: Spacing.lg,
    marginLeft: Spacing.sm + 6,
    marginTop: -Spacing.md,
    marginBottom: Spacing.md,
  },
});

