import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Spacing, Typography, BorderRadius, lightColors, darkColors } from '@/constants/Theme';
import { useTheme } from '@/contexts/ThemeContext';
import Hoverable from './Hoverable';

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string; // Changed to ISO date string format (YYYY-MM)
  endDate?: string;  // Optional: undefined or empty string represents "Present"
  periodDisplay: string; // The literal string to show for the calendar range text
  description: string[];
  technologies: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: '1',
    role: 'Associate Software Engineer',
    company: 'Sparksupport Infotech Pvt Ltd.',
    location: 'Kochi, India',
    startDate: '2025-11', // November 2025
    periodDisplay: '2025 - Present',
    description: [
      'Contribute to enterprise-level backend development for robust and scalable applications.',
      'Developed enterprise backend services using Java, Spring Boot, and Microservices architecture.',
      'Built fault-tolerant distributed systems utilizing RabbitMQ for asynchronous messaging.',
      'Debugged runtime issues, resolved bottlenecks, and optimized backend application performance.',
      'Collaborated across Frontend, DevOps, and Testing teams for secure API integration and efficient deployment.'
    ],
    technologies: ['Java 8/17/21', 'Spring Boot', 'Microservices', 'RabbitMQ', 'MySQL', 'MariaDB', 'Spring Security', 'MongoDB', 'PostgreSQL', 'Spring Mail', 'Redis Cache', 'Elastic Search', 'JQuery', 'JUnit', 'JWT', 'OAuth2', 'Gradle', 'Maven', 'SFTP', 'Docker', 'CICD', 'Jenkins', 'Portainer', 'Git', 'Bitbucket', 'Jira'],
  },
  {
    id: '2',
    role: 'Java Developer Trainee',
    company: 'Sparksupport Infotech Pvt Ltd.',
    location: 'Kochi, India',
    startDate: '2025-07',
    endDate: '2025-10',
    periodDisplay: 'July 2025 - October 2025',
    description: [
      'Gained practical training in backend concepts, efficiently building, debugging, and testing Spring Boot REST APIs.',
      'Upskilled in DB management, optimized MySQL operations with Native Queries, JPQL, and Query DSL.',
      'Mastered core features like Validation, Logging, Exception Handling, Profiling, Search, Sorting, and Pagination.',
      'Applied SOLID principles and software development lifecycle (SDLC) best practices using Git version control.'
    ],
    technologies: ['Java 8/17', 'Spring Boot', 'MySQL', 'JPA/Hibernate', 'REST API', 'DSA', 'OOPs', 'Design Patterns', 'Spring MVC', 'Spring Security', 'JFC', 'Git', 'GitHub'],
  },
];

export default function Experience() {
  const { isDark } = useTheme();
  const { width: windowWidth } = useWindowDimensions();
  const Colors = isDark ? darkColors : lightColors;

  const isSmallScreen = windowWidth < 768;

  // Helper function to calculate the duration dynamically using the Date object matrix
  const calculateDuration = (startDateStr: string, endDateStr?: string): string => {
    const start = new Date(startDateStr + '-01'); // Force first day of the month boundary
    const end = endDateStr ? new Date(endDateStr + '-01') : new Date(); // Reverts to the current active system Date if "Present"

    const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    const yearLabel = years === 1 ? 'year' : 'years';
    const monthLabel = months === 1 ? 'month' : 'months';

    if (years > 0) {
      return `${years} ${yearLabel} ${months} ${monthLabel}`;
    }
    return `${months} ${monthLabel}`;
  };

  return (
    <View nativeID="experience" style={styles.container}>
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
                  
                  <View style={[styles.headerMainRow, { flexDirection: isSmallScreen ? 'column' : 'row' }]}>
                    
                    <View style={styles.leftInfoColumn}>
                      <Text style={[styles.role, { color: Colors.text }]}>
                        {exp.role}
                      </Text>
                      <Text style={[styles.company, { color: Colors.primary }]}>
                        {exp.company}
                      </Text>
                      <Text style={[styles.experience, { color: Colors.textLight }]}>
                        Duration: {calculateDuration(exp.startDate, exp.endDate)}
                      </Text>
                    </View>

                    <View style={[styles.rightMetaColumn, { alignItems: isSmallScreen ? 'flex-start' : 'flex-end', marginTop: isSmallScreen ? 4 : 0 }]}>
                      <Text style={[styles.location, { color: Colors.textLight }]}>
                        📍 {exp.location}
                      </Text>
                      <Text style={[styles.period, { color: Colors.primary, fontWeight: '700' }]}>
                        {exp.periodDisplay}
                      </Text>
                    </View>

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
                        { backgroundColor: Colors.primary + '15' },
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
    width: '100%',
    ...(Platform.OS === 'web' && {
      maxWidth: 820,
      alignSelf: 'center',
    }),
  },
  timelineItem: {
    position: 'relative',
    marginBottom: Spacing.md,
    width: '100%',
  },
  timelineContent: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderLeftWidth: 4,
    width: '100%',
    cursor: 'auto',
  },
  timelineHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
    width: '100%',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.md,
    marginTop: 8,
  },
  headerMainRow: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
    cursor: 'auto',
  },
  leftInfoColumn: {
    flex: 1,
    width: '100%',
  },
  rightMetaColumn: {
    justifyContent: 'flex-start',
  },
  role: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.2,
    marginBottom: 4,
    opacity: 0.8,
  },
  company: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  experience: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.8,
  },
  location: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  period: {
    fontSize: 13,
  },
  descriptionContainer: {
    marginBottom: Spacing.lg,
    paddingLeft: Spacing.sm,
  },
  descriptionItem: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 6,
    textAlign: 'justify',
  },
  technologiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    paddingLeft: Spacing.sm,
  },
  techTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.sm,
  },
  techTagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  timelineLine: {
    width: 2,
    height: 32,
    marginLeft: 5,
    marginTop: Spacing.xs,
    opacity: 0.3,
  },
});