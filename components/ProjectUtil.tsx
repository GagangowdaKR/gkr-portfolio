import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { Spacing, BorderRadius } from '@/constants/Theme';
import Hoverable from './Hoverable';

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

interface ProjectUtilProps {
  isVisible: boolean;
  activeProjectIndex: number | null;
  projects: Project[];
  onClose: () => void;
  onNavigate: (index: number) => void;
  onLinkPress: (url?: string) => void;
  Colors: any;
}

export default function ProjectUtil({
  isVisible,
  activeProjectIndex,
  projects,
  onClose,
  onNavigate,
  onLinkPress,
  Colors,
}: ProjectUtilProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const activeProjectModalData = activeProjectIndex !== null ? projects[activeProjectIndex] : null;

  return (
    <Modal
      visible={isVisible && activeProjectModalData !== null}
      transparent={true}
      animationType="fade"
      hardwareAccelerated={true}
      onRequestClose={onClose}
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
          
          {/* Header Row */}
          <View
            style={[
              styles.modalHeaderFixedRow,
              { paddingHorizontal: isMobile ? Spacing.md : Spacing.xl }
            ]}
          >
            <View style={styles.modalTitleColumn}>
              <Text style={[styles.modalTitle, { color: Colors.primary, fontSize: isMobile ? 20 : 24 }]}>
                {activeProjectModalData?.title}
              </Text>
              <Text style={[styles.modalSubtitleTag, { color: Colors.textLight }]}>
                {activeProjectModalData?.tag}
              </Text>
            </View>

            <View style={styles.modalHeaderActionsRight}>
              {activeProjectModalData?.github ? (
                <Hoverable
                  style={[styles.ctaLargeModal, { backgroundColor: Colors.primary + '20', borderColor: Colors.border }]}
                  hoverStyle={{ ...styles.ctaHover, shadowColor: Colors.primary }}
                  onPress={() => onLinkPress(activeProjectModalData.github)}
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

          {/* Scrollable Content Region */}
          <ScrollView
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={false}
            style={styles.modalScrollRegion}
            contentContainerStyle={[
              styles.modalBodyPaddingFix,
              { paddingHorizontal: isMobile ? Spacing.md : Spacing.xl }
            ]}
          >
            <Text style={[styles.modalSectionSubheader, { color: Colors.text }]}>Description</Text>
            <Text style={[styles.modalFullDescription, { color: Colors.textLight }]}>
              {activeProjectModalData?.description}
            </Text>

            <Text style={[styles.modalSectionSubheader, { color: Colors.text }]}>Technologies Used</Text>
            <View style={styles.modalFullTechGrid}>
              {activeProjectModalData?.technologies.map((tech, i) => (
                <View key={i} style={[styles.modalTechTagLarge, { backgroundColor: Colors.primary + '18', borderColor: Colors.border, borderWidth: 1 }]}>
                  <Text style={[styles.modalTechTextLarge, { color: Colors.primary }]}>{tech}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Bottom Controls Bar */}
          <View style={[styles.modalFooterControlsRow, { borderColor: Colors.border }]}>
            <TouchableOpacity
              style={[
                styles.modalNavButton,
                { borderColor: Colors.border, backgroundColor: Colors.background + '40' },
                activeProjectIndex === 0 && { opacity: 0.4 }
              ]}
              disabled={activeProjectIndex === 0}
              onPress={() => onNavigate((activeProjectIndex ?? 0) - 1)}
            >
              <Text style={[styles.arrowTextIcon, { color: activeProjectIndex === 0 ? Colors.textLight : Colors.primary }]}>‹ Prev</Text>
            </TouchableOpacity>
            
            <Hoverable 
              style={[styles.centeredCloseBtnHoverable, { backgroundColor: Colors.primary + '20', borderColor: Colors.border }]}
              hoverStyle={{ ...styles.ctaHover, shadowColor: Colors.primary }}
              onPress={onClose}
            >
              <Text style={[styles.closeBtnText, { color: Colors.primary }]}>Close</Text>
            </Hoverable>
            
            <TouchableOpacity
              style={[
                styles.modalNavButton,
                { borderColor: Colors.border, backgroundColor: Colors.background + '40' },
                activeProjectIndex === projects.length - 1 && { opacity: 0.4 }
              ]}
              disabled={activeProjectIndex === projects.length - 1}
              onPress={() => onNavigate((activeProjectIndex ?? 0) + 1)}
            >
              <Text style={[styles.arrowTextIcon, { color: activeProjectIndex === projects.length - 1 ? Colors.textLight : Colors.primary }]}>Next ›</Text>
            </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
    width: '100%',
    gap: Spacing.sm,
  },
  modalTitleColumn: {
    flex: 1,
  },
  modalTitle: {
    fontWeight: '800',
    lineHeight: 28,
    marginBottom: 2,
  },
  modalSubtitleTag: {
    fontSize: 13,
    fontWeight: '600',
    opacity: 0.8,
  },
  modalHeaderActionsRight: {
    flexDirection: 'row',
    alignItems: 'center',
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
  modalScrollRegion: {
    flex: 1,
    width: '100%',
  },
  modalBodyPaddingFix: {
    paddingBottom: Spacing.lg,
  },
  modalSectionSubheader: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: Spacing.xs,
    marginTop: Spacing.md,
    opacity: 0.9,
  },
  modalFullDescription: {
    fontSize: 14.5,
    lineHeight: 24,
    textAlign: 'justify',
  },
  modalFullTechGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginTop: Spacing.xs,
    paddingBottom: Spacing.sm,
  },
  modalTechTagLarge: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 5,
    borderRadius: BorderRadius.sm,
  },
  modalTechTextLarge: {
    fontSize: 12,
    fontWeight: '600',
  },
  modalFooterControlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    width: '100%',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    marginTop: 'auto',
  },
  modalNavButton: {
    paddingVertical: Spacing.xs + 2,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowTextIcon: {
    fontSize: 13,
    fontWeight: '700',
  },
  centeredCloseBtnHoverable: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
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
