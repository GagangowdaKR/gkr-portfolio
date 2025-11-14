import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import { Spacing, Typography, BorderRadius, lightColors, darkColors } from '@/constants/Theme';
import { useTheme } from '@/contexts/ThemeContext';
import Hoverable from './Hoverable';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Online IPL Ticket Booking Web Application',
    description:
      'A web app to browse matches, select seats, and book IPL tickets with confirmation flow.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'MySQL'],
  },
  {
    id: '2',
    title: 'Digital-Clock',
    description:
      'A clean digital clock with real-time updates and responsive design.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: '3',
    title: 'Mini-Calendar',
    description:
      'Interactive mini calendar component with date highlighting and navigation.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: '4',
    title: 'Campus News and Announcement',
    description:
      'Portal to publish campus news and announcements with simple content management.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'MySQL'],
  },
  {
    id: '5',
    title: 'CRUD Web Application',
    description:
      'Basic CRUD operations app demonstrating create, read, update, and delete flows.',
    technologies: ['Java', 'Spring Boot', 'MySQL'],
  },
];

export default function Projects() {
  const { isDark } = useTheme();
  const Colors = isDark ? darkColors : lightColors;

  const renderProject = (project: Project) => (
    <Hoverable
      key={project.id}
      style={[
        styles.projectCard,
        {
          backgroundColor: Colors.backgroundLight,
          borderColor: Colors.border,
        },
      ]}
    >
      <View style={styles.projectHeader}>
        <Text style={[styles.projectTitle, { color: Colors.text }]}>{project.title}</Text>
      </View>
      <Text style={[styles.projectDescription, { color: Colors.textLight }]}>
        {project.description}
      </Text>
      <View style={styles.technologiesContainer}>
        {project.technologies.map((tech, index) => (
          <View
            key={index}
            style={[
              styles.techTag,
              { backgroundColor: Colors.primary + '20' },
            ]}
          >
            <Text style={[styles.techTagText, { color: Colors.primary }]}>
              {tech}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.projectActions}>
        {project.github && (
          <Hoverable
            style={[
              styles.actionButton,
              {
                borderColor: Colors.border,
                backgroundColor: Colors.background,
              },
            ]}
          >
            <Text style={[styles.actionButtonText, { color: Colors.text }]}>
              GitHub
            </Text>
          </Hoverable>
        )}
        {project.demo && (
          <Hoverable
            style={[
              styles.actionButton,
              styles.actionButtonPrimary,
              {
                backgroundColor: Colors.primary,
                borderColor: Colors.primary,
              },
            ]}
          >
            <Text
              style={[
                styles.actionButtonText,
                styles.actionButtonTextPrimary,
                { color: '#ffffff' },
              ]}
            >
              Live Demo
            </Text>
          </Hoverable>
        )}
      </View>
    </Hoverable>
  );

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
        <Text style={[styles.title, { color: Colors.text }]}>Projects</Text>
        <View style={[styles.divider, { backgroundColor: Colors.primary }]} />
        <Text style={[styles.subtitle, { color: Colors.textLight }]}>
          Some things I've built and explored
        </Text>
        <ScrollView
          horizontal={Platform.OS !== 'web'}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.projectsContainer}
        >
          {projects.map(renderProject)}
        </ScrollView>
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
  projectsContainer: {
    gap: Spacing.lg,
    flexDirection: 'row',
    flexWrap: Platform.OS === 'web' ? 'wrap' : 'nowrap',
  },
  projectCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    minWidth: Platform.OS === 'web' ? 280 : 300,
    maxWidth: Platform.OS === 'web' ? 350 : 300,
    flex: Platform.OS === 'web' ? 1 : 0,
    marginRight: Platform.OS === 'web' ? 0 : Spacing.md,
  },
  projectHeader: {
    marginBottom: Spacing.md,
  },
  projectTitle: {
    ...Typography.h4,
    marginBottom: Spacing.xs,
  },
  projectDescription: {
    ...Typography.bodySmall,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  technologiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginBottom: Spacing.md,
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
  projectActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: 'auto',
  },
  actionButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
  },
  actionButtonPrimary: {},
  actionButtonText: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  actionButtonTextPrimary: {},
});
