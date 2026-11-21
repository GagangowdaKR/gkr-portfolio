import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Image,
  Linking,
  useWindowDimensions,
} from 'react-native';
import { Spacing, Typography, BorderRadius, lightColors, darkColors } from '@/constants/Theme';
import { useTheme } from '@/contexts/ThemeContext';
import Hoverable from './Hoverable';
import ProjectUtil from './ProjectUtil';
import ProjectListUtil from './ProjectListUtil';

interface Project {
  id: string;
  title: string;
  tag: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Netherlands DRS System',
    tag: 'Sparksupport Infotech',
    description: 'Contributed to a high-scale deposit return platform managing deposite refund processing for collected articles across supermarkets, cinemas, and sports centers. Worked within a modular microservices architecture utilizing custom internal modules to support centralized core services like RVMCollector and OCM. I contributed to event applications to track task histories and operational metrics across the entire ecosystem.',
    technologies: ['Java 21', 'Spring Boot', 'Microservices', 'RabbitMQ', 'MySQL', 'MariaDB', 'Redis', 'JWT', 'OAuth2', 'Spring Security', 'Elastic Search', 'Jenkins', 'Docker', 'Portainer', 'CICD', 'SFTP', 'Rest API', 'Spring Mail', 'JUnit', 'JQuery', 'SLF4J', 'Hibernate', 'Rest Template', 'Web Client', 'Gradle', 'Git', 'Bitbucket', 'Jira', 'Jasper Reports'],
    github: '',
  },
  {
    id: '2',
    title: 'E-Commerce Application',
    tag: 'Sparksupport Trainee',
    description: 'A decoupled backend infrastructure featuring isolated microservices for the API Gateway, Auth, Orders, Products, Inventory, Payments, Notifications, and Discovery layers. Stateless JWT tokens and OAuth2 handle secure user authentication, utilizing RestTemplate and WebClient for synchronous communication. To ensure high fault tolerance, RabbitMQ manages asynchronous event-driven decoupling, while separate, optimized MySQL databases enforce strict data isolation per service.',
    technologies: ['Java 8/11/17', 'Spring Boot', 'Microservices', 'RabbitMQ', 'MySQL', 'JWT', 'OAuth2', 'Spring Security', 'Rest API', 'SLF4J', 'Rest Template', 'WebClient', 'Spring Mail', 'Gradle', 'Hibernate'],
    github: 'https://github.com/GagangowdaKR/E-Commerce-Microservices',
  },
  {
    id: '3',
    title: 'IPL Ticket Booking Application',
    tag: 'Personal Project',
    description: 'A static full-stack web application simulating real-time IPL event ticket sales and client-checkout workflows. The application pairs a responsive frontend designed with HTML5, CSS3, and Bootstrap with a robust Spring Boot backend. Complete CRUD workflows were implemented to manage the booking lifecycle, fully integrated with a MySQL database to eliminate double-booking conflicts.',
    technologies: ['Java', 'Spring Boot', 'Mysql', 'HTML', 'CSS', 'JavaScript', 'Postman', 'Bootstrap', 'Static Web App', 'Spring Data JPA', 'Lombok', 'Spring MVC', 'Dev Tools', 'Rest API', 'Spring Mail', 'Hibernate', 'Maven'],
    github: 'https://github.com/GagangowdaKR/IPL_TICKET_BOOKING',
  },
  {
    id: '4',
    title: 'Hotel Management System',
    tag: 'Personal Project',
    description: 'A console-based Java application executing core business logic for room inventory, guest workflows, and automated billing. The architecture applies Java 8 functional paradigms, utilizing Lambdas, Functional Interfaces, and the Stream API (.filter() and .map()) for efficient in-memory data transformations. Additionally, the modern Java Date-Time API was integrated to flawlessly manage temporal booking durations and dynamic billing variables without runtime failures.',
    technologies: ['Java 8', 'Java 17', 'Console', 'Stream API', 'DateTime API', 'Optional', 'Lambda', 'Functional Interface', 'JFC', 'OOPs'],
    github: 'https://github.com/GagangowdaKR/Hotel_Management_Console_Project',
  },
  {
    id: '5',
    title: 'Campus News & Announcement',
    tag: 'Personal Project',
    description: 'A collaborative multi-tier web application serving as a centralized hub for real-time institutional notifications and event broadcasts. The platform features a role-based access engine built with HTML, CSS, and JavaScript to cleanly separate administrative publishers from general consumers. Developed using PHP, the server-side layer securely manages form submissions, validates inputs, and orbits content lifecycles, backed by an optimized MySQL database handling concurrent read/write operations.',
    technologies: ['JavaScript', 'PHP', 'MySQL', 'HTML', 'CSS', 'Bootstrap', 'CRUD', 'Admin Interface', 'User Interface'],
    github: 'https://github.com/GagangowdaKR/Campus_News_and_Announcement',
  },
];

export default function Projects() {
  const { isDark } = useTheme();
  const Colors = isDark ? darkColors : lightColors;
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [isExtraListVisible, setIsExtraListVisible] = useState<boolean>(false);

  const handleLinkPress = (url?: string) => {
    if (url) Linking.openURL(url).catch(() => {});
  };

  // Compute mobile card width dynamically (matching Coding.tsx frame proportions)
  const mobileCardWidth = Math.min(width * 0.75, 290);

  // Desktop web card width calculation (3 per row on wide screens, 2 per row on medium screens)
  const getDesktopCardWidth = () => {
    if (width >= 1024) return 'calc(33.333% - 16px)';
    if (width >= 768) return 'calc(50% - 12px)';
    return '100%';
  };

  const renderProjectCard = (project: Project, index: number) => {
    const previewText = project.description.length > 120
      ? project.description.substring(0, 120).trim() + '...'
      : project.description;

    return (
      <Hoverable
        key={project.id}
        style={[
          styles.projectCard,
          {
            backgroundColor: Colors.backgroundLight,
            borderColor: Colors.border,
            borderWidth: 1,
            width: isMobile ? mobileCardWidth : getDesktopCardWidth(),
            marginRight: isMobile ? Spacing.md : 0,
          },
        ]}
      >
        <View style={styles.cardInnerContainer}>
          <View style={styles.projectHeader}>
            <View style={styles.titleAndTagContainer}>
              <Text style={[styles.projectTitle, { color: Colors.text }]} numberOfLines={1}>
                {project.title}
              </Text>
              <Text style={[styles.projectCardTag, { color: Colors.textLight }]}>
                {project.tag}
              </Text>
            </View>
            
            <View style={styles.projectActionsTopRight}>
              {project.github ? (
                <Hoverable
                  style={[styles.cta, { backgroundColor: Colors.primary + '20', borderColor: Colors.border, borderWidth: 1 }]}
                  hoverStyle={{ ...styles.ctaHover, shadowColor: Colors.primary }}
                  onPress={() => handleLinkPress(project.github)}
                >
                  <Image source={require('../assets/GithubLink.png')} style={[styles.linkIcon, { tintColor: Colors.primary }]} />
                </Hoverable>
              ) : (
                <View style={[styles.ctaDisabled, { backgroundColor: Colors.secondary + '20', borderColor: Colors.border, borderWidth: 1 }]}>
                  <Image source={require('../assets/BitbucketPrivate.png')} style={[styles.linkIcon, { tintColor: Colors.textLight, opacity: 0.6 }]} />
                  <Text style={[styles.privateLabelText, { color: Colors.primary }]}>Private</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.bodyWrapper}>
            <Text style={[styles.projectDescription, { color: Colors.textLight }]}>
              {previewText}
              <Text style={[styles.inlineReadMore, { color: Colors.primary }]} onPress={() => setActiveProjectIndex(index)}>
                {' '}read details
              </Text>
            </Text>
          </View>

          <View style={styles.techWrapperContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.technologiesHorizontalScroll}
            >
              {project.technologies.map((tech, i) => (
                <View key={i} style={[styles.techTag, { backgroundColor: Colors.primary + '18', borderColor: Colors.border, borderWidth: 1 }]}>
                  <Text style={[styles.techTagText, { color: Colors.primary }]}>{tech}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Hoverable>
    );
  };

  const renderViewMoreCard = () => (
    <Hoverable
      style={[
        styles.projectCard,
        styles.viewMoreCard,
        {
          backgroundColor: Colors.backgroundLight,
          borderColor: Colors.border,
          borderWidth: 1,
          width: isMobile ? mobileCardWidth : getDesktopCardWidth(),
          marginRight: isMobile ? Spacing.md : 0,
        },
      ]}
      onPress={() => setIsExtraListVisible(true)}
    >
      <View style={styles.viewMoreContentInner}>
        <View style={[styles.viewMoreIconCircle, { backgroundColor: Colors.primary + '20', borderColor: Colors.border }]}>
          <Image source={require('../assets/GithubLink.png')} style={[styles.viewMoreIconImage, { tintColor: Colors.primary }]} />
        </View>
        <Text style={[styles.viewMoreTitle, { color: Colors.primary }]}>Projects Vault</Text>
        <Text style={[styles.viewMoreSubtitle, { color: Colors.textLight }]}>+16 More Repositories</Text>
        <View style={[styles.viewMoreCtaBadge, { backgroundColor: Colors.primary + '20', borderColor: Colors.border }]}>
          <Text style={[styles.viewMoreCtaText, { color: Colors.primary }]}>Explore Vault ↗</Text>
        </View>
      </View>
    </Hoverable>
  );

  return (
    <View nativeID="projects" style={styles.container}>
      <View style={[styles.content, { backgroundColor: Colors.background, borderColor: Colors.border, borderWidth: 1 }]}>
        <Text style={[styles.title, { color: Colors.text }]}>Projects</Text>
        <View style={[styles.divider, { backgroundColor: Colors.primary }]} />
        <Text style={[styles.subtitle, { color: Colors.textLight }]}>
          A snapshot of my technical journey in building secure, distributed enterprise systems.
        </Text>
        
        {isMobile ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.mobileScrollView}
            contentContainerStyle={styles.mobileScrollContainer}
            decelerationRate="fast"
            snapToInterval={mobileCardWidth + 16}
          >
            {projects.map((p, i) => renderProjectCard(p, i))}
            {renderViewMoreCard()}
          </ScrollView>
        ) : (
          <View style={styles.grid}>
            {projects.map((p, i) => renderProjectCard(p, i))}
            {renderViewMoreCard()}
          </View>
        )}
      </View>

      <ProjectUtil
        isVisible={activeProjectIndex !== null}
        activeProjectIndex={activeProjectIndex}
        projects={projects}
        onClose={() => setActiveProjectIndex(null)}
        onNavigate={setActiveProjectIndex}
        onLinkPress={handleLinkPress}
        Colors={Colors}
      />

      <ProjectListUtil
        isVisible={isExtraListVisible}
        onClose={() => setIsExtraListVisible(false)}
        onLinkPress={handleLinkPress}
        Colors={Colors}
      />
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
    overflow: 'hidden',
    boxSizing: 'border-box' as any,
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  projectCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    height: 195,
    flexDirection: 'column',
    boxSizing: 'border-box' as any,
    overflow: 'hidden',
  },
  cardInnerContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  titleAndTagContainer: {
    flex: 1,
    marginRight: Spacing.xs,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  projectCardTag: {
    fontSize: 11.5,
    fontWeight: '500',
    opacity: 0.8,
  },
  projectActionsTopRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctaDisabled: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xs + 2,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  privateLabelText: {
    fontSize: 11,
    fontWeight: '600',
  },
  bodyWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    marginVertical: 4,
  },
  projectDescription: {
    fontSize: 12.5,
    lineHeight: 18,
  },
  inlineReadMore: {
    fontWeight: '700',
    fontSize: 12,
  },
  techWrapperContainer: {
    width: '100%',
    marginTop: 'auto',
  },
  technologiesHorizontalScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  techTag: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  techTagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  cta: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaHover: {
    ...Platform.select({ web: { transform: [{ scale: 1.1 }] }, default: { elevation: 4 } }),
  },
  linkIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  viewMoreCard: {
    cursor: 'pointer',
  },
  viewMoreContentInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  viewMoreIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  viewMoreIconImage: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  viewMoreTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 2,
  },
  viewMoreSubtitle: {
    fontSize: 11.5,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  viewMoreCtaBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  viewMoreCtaText: {
    fontSize: 11.5,
    fontWeight: '700',
  },
});



