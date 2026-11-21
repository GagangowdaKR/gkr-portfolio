import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Image,
  Modal,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { Spacing, BorderRadius } from '@/constants/Theme';
import Hoverable from './Hoverable';

export enum Category {
  A = "SparkSupport_Infotech",
  B = "SparkSupport_Trainee",
  C = "SpringBoot",
  D = "SpringSecurity",
  E = "Microservices",
  F = "Java8_JFC_DSA",
  G = "DBMS_SQL",
  H = "AIML",
  I = "Html_CSS_JS",
  J = "ReactNative",
}

interface ExtraProject {
  id: string;
  title: string;
  github?: string;
  category: Category;
}

interface ProjectListUtilProps {
  isVisible: boolean;
  onClose: () => void;
  onLinkPress: (url?: string) => void;
  Colors: any;
}

const extraProjects: ExtraProject[] = [
  { id: '1', title: 'Netherlands DRS System', category: Category.A },
  { id: '2', title: 'E-Commerce Microservices', category: Category.B, github: 'https://github.com/GagangowdaKR/E-Commerce-Microservices' },
  { id: '3', title: 'Portfolio Frontend (Android/iOS/Web)', category: Category.J, github: 'https://github.com/GagangowdaKR/gkr-portfolio' },
  { id: '4', title: 'Portfolio Backend (Android/iOS/Web)', category: Category.C, github: 'https://github.com/GagangowdaKR/portfolio-backend' },
  { id: '5', title: 'IPL Ticket Booking', category: Category.C, github: 'https://github.com/GagangowdaKR/IPL_TICKET_BOOKING' },
  { id: '6', title: 'Hotel Management Java Console', category: Category.F, github: 'https://github.com/GagangowdaKR/Hotel_Management_Console_Project' },
  { id: '7', title: 'Campus News and Announcement', category: Category.I, github: 'https://github.com/GagangowdaKR/Campus_News_and_Announcement' },
  { id: '8', title: 'Library Management System', category: Category.G, github: 'https://github.com/GagangowdaKR/Library_Management_System_SQL_Project' },
  { id: '9', title: 'RabbitMQ Message Broker Spring Boot', category: Category.E, github: 'https://github.com/GagangowdaKR/SpringBoot-RabbitMQ-Demo' },
  { id: '10', title: 'Spring Security JWT Auth', category: Category.D, github: 'https://github.com/GagangowdaKR/Spring_Security_JWT' },
  { id: '11', title: 'Spring Security OAuth2', category: Category.D, github: 'https://github.com/GagangowdaKR/Spring_Security_OAuth2' },
  { id: '12', title: 'Basic Authentication Database Storage', category: Category.D, github: 'https://github.com/GagangowdaKR/Spring_Security_BA_DB' },
  { id: '13', title: 'Basic Authentication In-Memory Storage', category: Category.D, github: 'https://github.com/GagangowdaKR/Spring_Security_BA_IM' },
  { id: '14', title: 'Gradle Spring Boot', category: Category.E, github: 'https://github.com/GagangowdaKR/SpringBoot_Gradle_App' },
  { id: '15', title: 'Spring Boot DI, Validation, SLF4J, jUnit, Mockito...', category: Category.C, github: 'https://github.com/GagangowdaKR/SpringBoot_Practice_App' },
  { id: '16', title: 'Spring Boot CRUD Application', category: Category.C, github: 'https://github.com/GagangowdaKR/CRUD_OPERATION' },
  { id: '17', title: 'FE Online Meeting Monitor', category: Category.J, github: 'https://github.com/GagangowdaKR/attentiq-final' },
  { id: '18', title: 'BE Online Meeting Monitor', category: Category.C, github: 'https://github.com/GagangowdaKR/attentiq-backend' },
  { id: '19', title: 'AIML Online Meeting Monitor', category: Category.H, github: 'https://github.com/GagangowdaKR/attentiq-ai' },
  { id: '20', title: 'MasterClock Suite', category: Category.I, github: 'https://github.com/GagangowdaKR/MasterClock_Suite' },
  { id: '21', title: 'Initial Web Portfolio', category: Category.I, github: 'https://github.com/GagangowdaKR/Portfolio' },
];

export default function ProjectListUtil({
  isVisible,
  onClose,
  onLinkPress,
  Colors,
}: ProjectListUtilProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  const formatCategoryLabel = (category: string) => {
    return category.replace(/_/g, ' ').replace(/([A-Z]+)(\d+)/g, '$1 $2');
  };

  const filteredProjects = extraProjects.filter((project) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    const titleMatch = project.title.toLowerCase().includes(query);
    const rawCategoryMatch = project.category.toLowerCase().includes(query);
    const formattedCategoryMatch = formatCategoryLabel(project.category).toLowerCase().includes(query);
    return titleMatch || rawCategoryMatch || formattedCategoryMatch;
  });

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      hardwareAccelerated={true}
      onRequestClose={() => {
        setSearchQuery('');
        onClose();
      }}
    >
      <View style={[styles.modalOverlay, { padding: isMobile ? Spacing.sm : Spacing.lg }]}>
        <View
          style={[
            styles.modalContent,
            { 
              backgroundColor: Colors.backgroundLight,
              borderColor: Colors.border,
              height: isMobile ? '88%' : '80%',
            }
          ]}
        >

          {/* Header Section */}
          <View
            style={[
              styles.modalHeaderFixedRow,
              { 
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'stretch' : 'center',
                paddingHorizontal: isMobile ? Spacing.md : Spacing.xl,
              }
            ]}
          >
            <View style={styles.titleContainer}>
              <Text style={[styles.modalTitle, { color: Colors.primary }]}>Projects Vault</Text>
              <Text style={[styles.modalSubtitleCount, { color: Colors.textLight }]}>
                {filteredProjects.length} of {extraProjects.length} Repositories
              </Text>
            </View>

            <View
              style={[
                styles.searchBoxWrapper,
                {
                  borderColor: Colors.border,
                  backgroundColor: Colors.background + '60',
                  width: isMobile ? '100%' : 260,
                }
              ]}
            >
              <Image 
                source={require('../assets/Search.png')}
                style={[styles.searchIconImage, { tintColor: Colors.primary }]} 
              />
              <TextInput
                style={[styles.searchBarInput, { color: Colors.text }]}
                placeholder="Search titles or categories..."
                placeholderTextColor={Colors.textLight + '90'}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
              {searchQuery.length > 0 && Platform.OS !== 'ios' && (
                <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearSearchBtn}>
                  <Text style={[styles.clearSearchText, { color: Colors.textLight }]}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Scrollable Projects Region */}
          <ScrollView
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={false}
            style={styles.modalScrollRegion}
            contentContainerStyle={[
              styles.modalBodyPaddingFix,
              { paddingHorizontal: isMobile ? Spacing.md : Spacing.xl }
            ]}
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <View 
                  key={project.id} 
                  style={[
                    styles.projectListItem,
                    {
                      borderColor: Colors.border,
                      backgroundColor: Colors.background + '40',
                      flexDirection: isMobile ? 'column' : 'row',
                      alignItems: isMobile ? 'flex-start' : 'center',
                    }
                  ]}
                >
                  <View style={styles.projectInfoColumn}>
                    <Text style={[styles.projectListItemTitle, { color: Colors.text }]}>
                      {project.title}
                    </Text>
                    <View style={[styles.categoryTagContainer, { borderColor: Colors.border, backgroundColor: Colors.primary + '12' }]}>
                      <Text style={[styles.categoryTagText, { color: Colors.primary }]}>
                        {formatCategoryLabel(project.category)}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.modalLinkWithLabelStack,
                      isMobile && { marginTop: Spacing.xs, alignSelf: 'flex-end' }
                    ]}
                  >
                    {project.github ? (
                      <Hoverable
                        style={[styles.ctaLargeModal, { backgroundColor: Colors.primary + '20', borderColor: Colors.border }]}
                        hoverStyle={{ ...styles.ctaHover, shadowColor: Colors.primary }}
                        onPress={() => onLinkPress(project.github)}
                      >
                        <Image source={require('../assets/GithubLink.png')} style={[styles.linkIconLargeModal, { tintColor: Colors.primary }]} />
                        <Text style={[styles.modalActionTextLabel, { color: Colors.primary }]}>Code ↗</Text>
                      </Hoverable>
                    ) : (
                      <View style={[styles.privateBadgeContainer, { backgroundColor: Colors.secondary + '20', borderColor: Colors.border }]}>
                        <Image source={require('../assets/BitbucketPrivate.png')} style={[styles.linkIconLargeModal, { tintColor: Colors.textLight, opacity: 0.6 }]} />
                        <Text style={[styles.privateBadgeText, { color: Colors.primary }]}>Private</Text>
                      </View>
                    )}
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyStateContainer}>
                <Text style={[styles.emptyStateTitle, { color: Colors.text }]}>No Projects Found</Text>
                <Text style={[styles.emptyStateText, { color: Colors.textLight }]}>
                  No repositories match "{searchQuery}". Try searching for another keyword like "Spring", "Security", or "Microservices".
                </Text>
              </View>
            )}
          </ScrollView>

          {/* Footer Controls */}
          <View style={[styles.modalFooterControlsRow, { borderColor: Colors.border }]}>
            <Hoverable 
              style={[styles.centeredCloseBtnHoverable, { backgroundColor: Colors.primary + '20', borderColor: Colors.border }]}
              hoverStyle={{ ...styles.ctaHover, shadowColor: Colors.primary }}
              onPress={() => {
                setSearchQuery('');
                onClose();
              }}
            >
              <Text style={[styles.closeBtnText, { color: Colors.primary }]}>Close Vault</Text>
            </Hoverable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.78)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    maxWidth: 720,
    maxHeight: '90%',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    paddingTop: Spacing.lg,
    flexDirection: 'column',
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0px 12px 36px rgba(0,0,0,0.4)',
      },
      default: {
        elevation: 10,
      }
    }),
  },
  modalHeaderFixedRow: {
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
    width: '100%',
    gap: Spacing.sm,
  },
  titleContainer: {
    flexDirection: 'column',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
  },
  modalSubtitleCount: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  searchBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    height: 40,
  },
  searchIconImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8,
    opacity: 0.7,
  },
  searchBarInput: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    paddingVertical: 0,
    height: '100%',
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      }
    })
  },
  clearSearchBtn: {
    padding: 4,
  },
  clearSearchText: {
    fontSize: 14,
    fontWeight: '600',
  },
  modalScrollRegion: {
    flex: 1,
    width: '100%',
  },
  modalBodyPaddingFix: {
    paddingBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  projectListItem: {
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    gap: Spacing.xs,
  },
  projectInfoColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 6,
  },
  projectListItemTitle: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
  },
  categoryTagContainer: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
  },
  categoryTagText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  modalLinkWithLabelStack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaLargeModal: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    gap: 6,
  },
  linkIconLargeModal: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  modalActionTextLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  privateBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    gap: 6,
  },
  privateBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  ctaHover: {
    ...Platform.select({ web: { transform: [{ scale: 1.05 }] }, default: { elevation: 4 } }),
  },
  emptyStateContainer: {
    paddingVertical: Spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.md,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  emptyStateText: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
  modalFooterControlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    width: '100%',
    paddingVertical: Spacing.md,
    marginTop: 'auto',
  },
  centeredCloseBtnHoverable: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
