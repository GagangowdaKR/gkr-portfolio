import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  ImageBackground,
  Image,
  Linking,
  Animated,
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
  localImage: any;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Netherlands DRS System',
    tag: 'Sparksupport Infotech',
    description: 'Contributed to a high-scale deposit return platform managing deposite refund processing for collected articles across supermarkets, cinemas, and sports centers. Worked within a modular microservices architecture utilizing custom internal modules to support centralized core services like RVMCollector and OCM. I contributed to event applications to track task histories and operational metrics across the entire ecosystem.',
    technologies: ['Java 21', 'Spring Boot', 'Microservices', 'RabbitMQ', 'MySQL', 'MariaDB', 'Redis', 'JWT', 'OAuth2', 'Spring Security', 'Elastic Search', 'Jenkins', 'Docker', 'Portainer', 'CICD', 'SFTP', 'Rest API', 'Spring Mail', 'JUnit', 'JQuery', 'SLF4J', 'Hibernate', 'Rest Template', 'Web Client', 'Gradle', 'Git', 'Bitbucket', 'Jira', 'Jasper Reports'],
    github: '',
    localImage: require('../assets/project-icons/snl.png'),
  },
  {
    id: '2',
    title: 'E-Commerce Application',
    tag: 'Sparksupport Trainee',
    description: 'A decoupled backend infrastructure featuring isolated microservices for the API Gateway, Auth, Orders, Products, Inventory, Payments, Notifications, and Discovery layers. Stateless JWT tokens and OAuth2 handle secure user authentication, utilizing RestTemplate and WebClient for synchronous communication. To ensure high fault tolerance, RabbitMQ manages asynchronous event-driven decoupling, while separate, optimized MySQL databases enforce strict data isolation per service.',
    technologies: ['Java 8/11/17', 'Spring Boot', 'Microservices', 'RabbitMQ', 'MySQL', 'JWT', 'OAuth2', 'Spring Security', 'Rest API', 'SLF4J', 'Rest Template', 'WebClient', 'Spring Mail', 'Gradle', 'Hibernate'],
    github: 'https://github.com/GagangowdaKR/E-Commerce-Microservices',
    localImage: require('../assets/project-icons/ecom.png'),
  },
  {
    id: '3',
    title: 'IPL Ticket Booking Application',
    tag: 'Personal Project',
    description: 'A static full-stack web application simulating real-time IPL event ticket sales and client-checkout workflows. The application pairs a responsive frontend designed with HTML5, CSS3, and Bootstrap with a robust Spring Boot backend. Complete CRUD workflows were implemented to manage the booking lifecycle, fully integrated with a MySQL database to eliminate double-booking conflicts.',
    technologies: ['Java', 'Spring Boot', 'Mysql', 'HTML', 'CSS', 'JavaScript', 'Postman', 'Bootstrap', 'Static Web App', 'Spring Data JPA', 'Lombok', 'Spring MVC', 'Dev Tools', 'Rest API', 'Spring Mail', 'Hibernate', 'Maven'],
    github: 'https://github.com/GagangowdaKR/IPL_TICKET_BOOKING',
    localImage: require('../assets/project-icons/ipl.png'),
  },
  {
    id: '4',
    title: 'Hotel Management System',
    tag: 'Personal Project',
    description: 'A console-based Java application executing core business logic for room inventory, guest workflows, and automated billing. The architecture applies Java 8 functional paradigms, utilizing Lambdas, Functional Interfaces, and the Stream API (.filter() and .map()) for efficient in-memory data transformations. Additionally, the modern Java Date-Time API was integrated to flawlessly manage temporal booking durations and dynamic billing variables without runtime failures.',
    technologies: ['Java 8', 'Java 17', 'Console', 'Stream API', 'DateTime API', 'Optional', 'Lambda', 'Functional Interface', 'JFC', 'OOPs'],
    github: 'https://github.com/GagangowdaKR/Hotel_Management_Console_Project',
    localImage: require('../assets/project-icons/hotel.png'),
  },
  {
    id: '5',
    title: 'Campus News & Announcement',
    tag: 'Personal Project',
    description: 'A collaborative multi-tier web application serving as a centralized hub for real-time institutional notifications and event broadcasts. The platform features a role-based access engine built with HTML, CSS, and JavaScript to cleanly separate administrative publishers from general consumers. Developed using PHP, the server-side layer securely manages form submissions, validates inputs, and orbits content lifecycles, backed by an optimized MySQL database handling concurrent read/write operations.',
    technologies: ['JavaScript', 'PHP', 'MySQL', 'HTML', 'CSS', 'Bootstrap', 'CRUD', 'Admin Interface', 'User Interface'],
    github: 'https://github.com/GagangowdaKR/Campus_News_and_Announcement',
    localImage: require('../assets/project-icons/news.png'),
  },
];

export default function Projects() {
  const { isDark } = useTheme();
  const Colors = isDark ? darkColors : lightColors;

  const scrollViewRef = useRef<ScrollView>(null);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [isExtraListVisible, setIsExtraListVisible] = useState<boolean>(false);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ x: 60, animated: true });
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({ x: 0, animated: true });
        }, 600);
      }, 1200);

      Animated.loop(
        Animated.sequence([
          Animated.timing(shakeAnim, { toValue: 8, duration: 400, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: 5, duration: 200, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
        ])
      ).start();
    }
  }, [shakeAnim]);

  const handleLinkPress = (url?: string) => {
    if (url) Linking.openURL(url).catch(() => {});
  };

  const renderProjectCard = (project: Project, index: number) => {
    const previewText = project.description.substring(0, 115);

    return (
      <Hoverable
        key={project.id}
        style={[
          styles.projectCard,
          {
            backgroundColor: Colors.backgroundLight,
            borderColor: Colors.border,
            borderWidth: 1,
          },
        ]}
      >
        <ImageBackground
          source={project.localImage}
          style={styles.cardBackgroundStyle}
          imageStyle={{ opacity: isDark ? 0.05 : 0.12, resizeMode: 'cover' }}
        >
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
              {/* Conditional validation layer targeting empty/null repository properties */}
              {project.github ? (
                <Hoverable
                  style={[styles.cta, { backgroundColor: Colors.primary + '20', borderColor: Colors.border, borderWidth: 1 }]}
                  hoverStyle={{ ...styles.ctaHover, shadowColor: Colors.primary, ...Platform.select({ web: { boxShadow: `0px 4px 14px ${Colors.primary}40` } }) }}
                  onPress={() => handleLinkPress(project.github)}
                >
                  <Image source={require('../assets/GithubLink.png')} style={[styles.linkIcon, { tintColor: Colors.primary }]} />
                </Hoverable>
              ) : (
                /* Unclickable Private layout view stack placeholder */
                <View style={styles.privateActionWrapper}>
                  <View style={[styles.ctaDisabled, { backgroundColor: Colors.border + '30', borderColor: Colors.border }]}>
                    <Image source={require('../assets/GithubPrivate.png')} style={[styles.linkIcon, { tintColor: Colors.textLight, opacity: 0.5 }]} />
                  </View>
                  <Text style={[styles.privateLabelText, { color: Colors.primary }]}>Private</Text>
                </View>
              )}

              {project.demo && (
                <Hoverable
                  style={[styles.cta, { backgroundColor: Colors.primary + '20', borderColor: Colors.border, borderWidth: 1 }]}
                  hoverStyle={{ ...styles.ctaHover, shadowColor: Colors.primary, ...Platform.select({ web: { boxShadow: `0px 4px 14px ${Colors.primary}40` } }) }}
                  onPress={() => handleLinkPress(project.demo)}
                >
                  <Image source={require('../assets/GithubLink.png')} style={[styles.linkIcon, { tintColor: Colors.primary }]} />
                </Hoverable>
              )}
            </View>
          </View>

          <View style={styles.bodyWrapper}>
            <Text style={[styles.projectDescription, { color: Colors.textLight }]}>
              {previewText}
              <Text style={[styles.inlineReadMore, { color: Colors.primary }]} onPress={() => setActiveProjectIndex(index)}>
                {' '}....read more
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
                <View key={i} style={[styles.techTag, { backgroundColor: Colors.primary + '20' }]}>
                  <Text style={[styles.techTagText, { color: Colors.primary }]}>{tech}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </ImageBackground>
      </Hoverable>
    );
  };

  return (
    <View nativeID="projects" style={styles.container}>
      <View style={[styles.content, { backgroundColor: Colors.background, borderColor: Colors.border, borderWidth: 1 }]}>
        <Text style={[styles.title, { color: Colors.text }]}>Projects</Text>
        <View style={[styles.divider, { backgroundColor: Colors.primary }]} />
        <Text style={[styles.subtitle, { color: Colors.textLight }]}>A snapshot of my technical journey in building secure, distributed enterprise systems.</Text>
        
        <View style={styles.scrollWrapper}>
          <ScrollView
            ref={scrollViewRef}
            horizontal={Platform.OS !== 'web'}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.projectsContainer}
            snapToInterval={Platform.OS !== 'web' ? 316 : undefined}
            decelerationRate="fast"
          >
            {projects.map((p, i) => renderProjectCard(p, i))}

            {/* View More Card Wrapper */}
            <View style={styles.viewMoreItemCardWrapper}>
              <View style={styles.modalLinkWithLabelStack}>
                <Hoverable
                  style={[styles.ctaViewMoreCard, { backgroundColor: Colors.primary + '15', borderColor: Colors.border, borderWidth: 1 }]}
                  hoverStyle={{ ...styles.ctaHover, shadowColor: Colors.primary, ...Platform.select({ web: { boxShadow: `0px 6px 18px ${Colors.primary}35` } }) }}
                  onPress={() => setIsExtraListVisible(true)}
                >
                  <Image source={require('../assets/GithubLink.png')} style={[styles.linkIconViewMoreCard, { tintColor: Colors.primary }]} />
                </Hoverable>
                <Text style={[styles.viewMoreActionLabelText, { color: Colors.primary }]}>View More</Text>
              </View>
            </View>
          </ScrollView>

          {Platform.OS !== 'web' && (
            <Animated.View style={[styles.mobileIndicatorArrow, { transform: [{ translateX: shakeAnim }] }]}>
              <Text style={[styles.arrowText, { color: Colors.primary }]}>→</Text>
            </Animated.View>
          )}
        </View>
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
  scrollWrapper: {
    position: 'relative',
    width: '100%',
  },
  projectsContainer: {
    gap: Spacing.lg,
    flexDirection: 'row',
    flexWrap: Platform.OS === 'web' ? 'wrap' : 'nowrap',
    paddingRight: Platform.OS === 'web' ? 0 : Spacing.xl,
    paddingTop: 4,
    alignItems: 'center',
  },
  projectCard: {
    borderRadius: BorderRadius.lg,
    minWidth: Platform.OS === 'web' ? 280 : 300,
    maxWidth: Platform.OS === 'web' ? 350 : 300,
    flex: Platform.OS === 'web' ? 1 : 0,
    marginRight: Platform.OS === 'web' ? 0 : Spacing.md,
    overflow: 'hidden',
    flexDirection: 'column',
    marginTop: 2,
    marginBottom: 2,
    height: 220,
  },
  viewMoreItemCardWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    ...(Platform.OS === 'web' ? {
      width: 350,
      minWidth: 280,
      height: 220,
    } : {
      minWidth: 160,
      paddingHorizontal: Spacing.md,
    }),
  },
  modalLinkWithLabelStack: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12, 
  },
  ctaViewMoreCard: {
    width: 54, 
    height: 54,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({ web: { transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out' } }),
  },
  linkIconViewMoreCard: {
    width: 28, 
    height: 28,
    resizeMode: 'contain',
  },
  viewMoreActionLabelText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  cardBackgroundStyle: {
    width: '100%',
    height: '100%',
    padding: Spacing.lg,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
    position: 'relative',
    minHeight: 52, 
  },
  titleAndTagContainer: {
    flex: 1,
    paddingRight: 95,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  projectCardTag: {
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.8,
  },
  projectActionsTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  privateActionWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  ctaDisabled: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  privateLabelText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.2,
    textAlign: 'center',
    opacity: 0.6,
  },
  bodyWrapper: {
    marginBottom: Spacing.md,
    minHeight: 66,
  },
  projectDescription: {
    ...Typography.bodySmall,
    lineHeight: 22,
    textAlign: 'justify',
  },
  inlineReadMore: {
    fontWeight: '700',
    fontSize: 13,
    cursor: 'pointer',
  },
  techWrapperContainer: {
    width: '100%',
    marginVertical: Spacing.xs,
    minHeight: 38,
    justifyContent: 'center',
  },
  technologiesHorizontalScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingRight: Spacing.md,
  },
  techTag: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  techTagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  cta: {
    width: 38, 
    height: 38,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({ web: { transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out' } }),
  },
  ctaHover: {
    ...Platform.select({ web: { transform: [{ scale: 1.15 }] }, android: { elevation: 6 } }),
  },
  linkIcon: {
    width: 20, 
    height: 20, 
    resizeMode: 'contain',
  },
  mobileIndicatorArrow: {
    position: 'absolute',
    right: -4,
    top: '45%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  arrowText: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 20,
  },
});