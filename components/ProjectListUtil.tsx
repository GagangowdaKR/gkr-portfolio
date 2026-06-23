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
  { id: '10', title: 'Spring Security JWT Auth ', category: Category.D, github: 'https://github.com/GagangowdaKR/Spring_Security_JWT' },
  { id: '11', title: 'Spring Security OAuth2', category: Category.D, github: 'https://github.com/GagangowdaKR/Spring_Security_OAuth2' },
  { id: '12', title: 'Basic Authentication Database Storage', category: Category.D, github: 'https://github.com/GagangowdaKR/Spring_Security_BA_DB' },
  { id: '13', title: 'Basic Authentication In-Memory Storage', category: Category.D, github: 'https://github.com/GagangowdaKR/Spring_Security_BA_IM' },
  { id: '14', title: 'Gradle Spring Boot', category: Category.E, github: 'https://github.com/GagangowdaKR/SpringBoot_Gradle_App' },
  { id: '15', title: 'Spring Boot DI, Validation, SLF4J, jUnit, Mockito...', category: Category.C, github: 'https://github.com/GagangowdaKR/SpringBoot_Practice_App' },
  { id: '16', title: 'Spring Boot CRUD Application', category: Category.C, github: 'https://github.com/GagangowdaKR/CRUD_OPERATION' },
  { id: '17', title: 'FE Online Meeting Monitor', category: Category.J, github: 'https://github.com/GagangowdaKR/attentiq-final' },
  { id: '18', title: 'BE Online Meeting Monitor', category: Category.C, github: 'https://github.com/GagangowdaKR/attentiq-backend' },
  { id: '19', title: 'AIML Online Meeting Monitor', category: Category.H, github: 'https://github.com/GagangowdaKR/attentiq-ai' },
  { id: '20', title: 'MasterClock Suit', category: Category.I, github: 'https://github.com/GagangowdaKR/MasterClock_Suite' },
  { id: '21', title: 'Initial Web Portfolio', category: Category.I, github: 'https://github.com/GagangowdaKR/Portfolio' },
];

export default function ProjectListUtil({
  isVisible,
  onClose,
  onLinkPress,
  Colors,
}: ProjectListUtilProps) {
  // Local full-text lookup state tracking variable
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const formatCategoryLabel = (category: string) => {
    return category.replace(/_/g, ' ').replace(/([A-Z]+)(\d+)/g, '$1 $2');
  };

  // Full-Text filtering architecture comparing query text against both project titles and categories
  const filteredProjects = extraProjects.filter((project) => {
    const query = searchQuery.toLowerCase().trim();
    const titleMatch = project.title.toLowerCase().includes(query);
    const categoryMatch = project.category.toLowerCase().includes(query);
    return titleMatch || categoryMatch;
  });

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {
        setSearchQuery('');
        onClose();
      }}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: Colors.backgroundLight, borderColor: Colors.border }]}>
          
          <View style={styles.modalHeaderFixedRow}>
            <Text style={[styles.modalTitle, { color: Colors.primary }]}>Projects Vault</Text>
            
            {/* Right Corner Search Input Container Group */}
            <View style={[styles.searchBoxWrapper, { borderColor: Colors.border, backgroundColor: Colors.background + '40' }]}>
              {/* Optional Search Icon inside layout asset folder. Using system Search icon or tint wrapper */}
              <Image 
                source={require('../assets/Search.png')} // Swap path dynamically if dedicated search asset is available
                style={[styles.searchIconImage, { tintColor: Colors.primary }]} 
              />
              <TextInput
                style={[styles.searchBarInput, { color: Colors.text }]}
                placeholder="Search projects or categories..."
                placeholderTextColor={Colors.textLight + '90'}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCorrect={false}
              />
            </View>
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false} 
            showsHorizontalScrollIndicator={false}
            style={styles.modalScrollRegion}
            dataSet={Platform.OS === 'web' ? { className: 'hide-scrollbar' } : undefined}
            contentContainerStyle={styles.modalBodyPaddingFix}
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <View 
                  key={project.id} 
                  style={[styles.projectListItem, { borderColor: Colors.border, backgroundColor: Colors.background + '30' }]}
                >
                  <View style={styles.projectInfoColumn}>
                    <Text style={[styles.projectListItemTitle, { color: Colors.text }]} numberOfLines={1}>
                      {project.title}
                    </Text>
                    <View style={[styles.categoryTagContainer, { borderColor: Colors.border, borderWidth: 1 }]}>
                      <Text style={[styles.categoryTagText, { color: Colors.primary }]}>
                        {formatCategoryLabel(project.category)}
                      </Text>
                    </View>
                  </View>

                    <View style={styles.modalLinkWithLabelStack}>
                    {project.github ? (
                        <>
                        <Hoverable
                            style={[styles.ctaLargeModal, { backgroundColor: Colors.primary + '20', borderColor: Colors.border, borderWidth: 1 }]}
                            hoverStyle={{ ...styles.ctaHover, shadowColor: Colors.primary, ...Platform.select({ web: { boxShadow: `0px 4px 14px ${Colors.primary}40` } }) }}
                            onPress={() => onLinkPress(project.github)}
                        >
                            <Image source={require('../assets/GithubLink.png')} style={[styles.linkIconLargeModal, { tintColor: Colors.primary }]} />
                        </Hoverable>
                        <Text style={[styles.modalActionTextLabel, { color: Colors.primary }]}>Code</Text>
                        </>
                    ) : (
                        /* Clean, stylized badge fallback for hidden or unlinked source repositories */
                        <View style={[styles.privateBadgeContainer, { backgroundColor: Colors.secondary + '30', borderColor: Colors.border, borderWidth: 1 }]}>
                        <Image source={require('../assets/BitbucketPrivate.png')} style={[styles.linkIconLargeModal, { tintColor: Colors.textLight, opacity: 0.5 }]} />
                        <Text style={[styles.privateBadgeText, { color: Colors.primary }]}>Private</Text>
                        </View>
                    )}
                    </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyStateContainer}>
                <Text style={[styles.emptyStateText, { color: Colors.textLight }]}>No matching projects found.</Text>
              </View>
            )}
          </ScrollView>

          <View style={[styles.modalFooterControlsRow, { borderColor: Colors.border }]}>
            <Hoverable 
              style={[styles.centeredCloseBtnHoverable, { backgroundColor: Colors.primary + '20', borderColor: Colors.border, borderWidth: 1 }]}
              hoverStyle={{ ...styles.ctaHover, shadowColor: Colors.primary, ...Platform.select({ web: { boxShadow: `0px 4px 12px ${Colors.primary}30` } }) }}
              onPress={() => {
                setSearchQuery('');
                onClose();
              }}
            >
              <Text style={[styles.closeBtnText, { color: Colors.primary }]}>Close</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  modalContent: {
    width: '100%',
    maxWidth: 680, // Expanded slightly to provide breathing room for the input block row
    maxHeight: '75%',
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    paddingTop: Spacing.xl, 
    ...Platform.select({
      web: {
        boxShadow: '0px 12px 36px rgba(0,0,0,0.35)',
      }
    }),
    flexDirection: 'column',
  },
  modalHeaderFixedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    width: '100%',
    paddingHorizontal: Spacing.xl,
    flexWrap: Platform.OS === 'web' ? 'nowrap' : 'wrap',
    gap: Spacing.md,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 32,
  },
  searchBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    width: Platform.OS === 'web' ? 240 : '100%',
    height: 38,
  },
  searchIconImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginRight: 6,
    opacity: 0.6,
  },
  searchBarInput: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    paddingVertical: 0,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      }
    })
  },
  modalScrollRegion: {
    flex: 1,
    width: '100%',
    marginBottom: Spacing.lg,
  },
  modalBodyPaddingFix: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.sm,
  },
  projectListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  projectInfoColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 6,
    paddingRight: Spacing.md,
  },
  projectListItemTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  categoryTagContainer: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
  },
  categoryTagText: {
    fontSize: 11.5,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  modalLinkWithLabelStack: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  modalActionTextLabel: {
    fontSize: 11,
    fontWeight: '700',
    opacity: 0.9,
    textAlign: 'center',
  },
  privateBadgeContainer: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 60,
  },
  privateBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
    opacity: 0.5,
  },
  ctaLargeModal: {
    width: 36, 
    height: 36,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({ web: { transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out' } }),
  },
  linkIconLargeModal: {
    width: 18,
    height: 20,
    resizeMode: 'contain',
  },
  ctaHover: {
    ...Platform.select({ web: { transform: [{ scale: 1.12 }] }, android: { elevation: 6 } }),
  },
  emptyStateContainer: {
    paddingVertical: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    fontWeight: '500',
  },
  modalFooterControlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    width: '100%',
    height: 72,
    marginTop: 'auto',
  },
  centeredCloseBtnHoverable: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({ web: { transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out' } }),
  },
  closeBtnText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});