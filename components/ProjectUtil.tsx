import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Image,
  Modal,
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
  const activeProjectModalData = activeProjectIndex !== null ? projects[activeProjectIndex] : null;

  return (
    <Modal
      visible={isVisible && activeProjectModalData !== null}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: Colors.backgroundLight, borderColor: Colors.border }]}>
          
          <View style={styles.modalHeaderFixedRow}>
            <View style={styles.modalTitleColumn}>
              <Text style={[styles.modalTitle, { color: Colors.primary }]}>{activeProjectModalData?.title}</Text>
              <Text style={[styles.modalSubtitleTag, { color: Colors.textLight }]}>
                {activeProjectModalData?.tag}
              </Text>
            </View>

            <View style={styles.modalHeaderActionsRight}>
              {/* Conditional rendering checking for empty or non-existent repository properties */}
              {activeProjectModalData?.github ? (
                <View style={styles.modalLinkWithLabelStack}>
                  <Hoverable
                    style={[styles.ctaLargeModal, { backgroundColor: Colors.primary + '20', borderColor: Colors.border, borderWidth: 1 }]}
                    hoverStyle={{ ...styles.ctaHover, shadowColor: Colors.primary, ...Platform.select({ web: { boxShadow: `0px 4px 14px ${Colors.primary}40` } }) }}
                    onPress={() => onLinkPress(activeProjectModalData.github)}
                  >
                    <Image source={require('../assets/GithubLink.png')} style={[styles.linkIconLargeModal, { tintColor: Colors.primary }]} />
                  </Hoverable>
                  <Text style={[styles.modalActionTextLabel, { color: Colors.primary }]}>Code</Text>
                </View>
              ) : (
                /* Unclickable secure fallback component view structure stack for hidden source assets */
                <View style={styles.modalLinkWithLabelStack}>
                  <View style={[styles.ctaLargeModalDisabled, { backgroundColor: Colors.border + '30', borderColor: Colors.border, borderWidth: 1 }]}>
                    <Image source={require('../assets/BitbucketPrivate.png')} style={[styles.linkIconLargeModal, { tintColor: Colors.textLight, opacity: 0.5 }]} />
                  </View>
                  <Text style={[styles.modalActionTextLabel, { color: Colors.primary }]}>Bitbucket Private Repo</Text>
                </View>
              )}
            </View>
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false} 
            showsHorizontalScrollIndicator={false}
            style={styles.modalScrollRegion}
            dataSet={Platform.OS === 'web' ? { className: 'hide-scrollbar' } : undefined}
            contentContainerStyle={styles.modalBodyPaddingFix}
          >
            <Text style={[styles.modalSectionSubheader, { color: Colors.text }]}>Description</Text>
            <Text style={[styles.modalFullDescription, { color: Colors.textLight }]}>
              {activeProjectModalData?.description}
            </Text>

            <Text style={[styles.modalSectionSubheader, { color: Colors.text }]}>Technologies Used</Text>
            <View style={styles.modalFullTechGrid}>
              {activeProjectModalData?.technologies.map((tech, i) => (
                <View key={i} style={[styles.modalTechTagLarge, { backgroundColor: Colors.primary + '15' }]}>
                  <Text style={[styles.modalTechTextLarge, { color: Colors.primary }]}>{tech}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Bottom Nav Controls Footer */}
          <View style={[styles.modalFooterControlsRow, { borderColor: Colors.border }]}>
            <Hoverable 
              style={[styles.modalNavButtonHoverable, { borderColor: Colors.border, borderWidth: 1 }]}
              hoverStyle={activeProjectIndex !== 0 ? { ...styles.ctaHover, shadowColor: Colors.primary, ...Platform.select({ web: { boxShadow: `0px 4px 12px ${Colors.primary}30` } }) } : undefined}
              disabled={activeProjectIndex === 0}
              onPress={() => onNavigate((activeProjectIndex ?? 0) - 1)}
            >
              <View style={styles.arrowIconWrapper}>
                <Text style={[styles.arrowTextIcon, { color: activeProjectIndex === 0 ? Colors.border : Colors.primary }]}>{"‹"}</Text>
              </View>
            </Hoverable>
            
            <Hoverable 
              style={[styles.centeredCloseBtnHoverable, { backgroundColor: Colors.primary + '20', borderColor: Colors.border, borderWidth: 1 }]}
              hoverStyle={{ ...styles.ctaHover, shadowColor: Colors.primary, ...Platform.select({ web: { boxShadow: `0px 4px 12px ${Colors.primary}30` } }) }}
              onPress={onClose}
            >
              <Text style={[styles.closeBtnText, { color: Colors.primary }]}>Close</Text>
            </Hoverable>
            
            <Hoverable 
              style={[styles.modalNavButtonHoverable, { borderColor: Colors.border, borderWidth: 1 }]}
              hoverStyle={activeProjectIndex !== projects.length - 1 ? { ...styles.ctaHover, shadowColor: Colors.primary, ...Platform.select({ web: { boxShadow: `0px 4px 12px ${Colors.primary}30` } }) } : undefined}
              disabled={activeProjectIndex === projects.length - 1}
              onPress={() => onNavigate((activeProjectIndex ?? 0) + 1)}
            >
              <View style={styles.arrowIconWrapper}>
                <Text style={[styles.arrowTextIcon, { color: activeProjectIndex === projects.length - 1 ? Colors.border : Colors.primary }]}>{"›"}</Text>
              </View>
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
    maxWidth: 680,
    maxHeight: '88%',
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
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
    width: '100%',
    paddingHorizontal: Spacing.xl,
  },
  modalTitleColumn: {
    flex: 1,
    paddingRight: Spacing.xl,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 34,
    marginBottom: 4,
  },
  modalSubtitleTag: {
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.8,
  },
  modalHeaderActionsRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalLinkWithLabelStack: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  modalActionTextLabel: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    opacity: 0.4,
  },
  ctaLargeModal: {
    width: 38, 
    height: 38,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({ web: { transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out' } }),
  },
  ctaLargeModalDisabled: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },
  linkIconLargeModal: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  modalScrollRegion: {
    flex: 1,
    width: '100%',
    marginBottom: Spacing.lg,
  },
  modalBodyPaddingFix: {
    paddingHorizontal: Spacing.xl,
  },
  modalSectionSubheader: {
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
    opacity: 0.85,
  },
  modalFullDescription: {
    fontSize: 15,
    lineHeight: 26,
    textAlign: 'justify',
  },
  modalFullTechGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
    paddingBottom: Spacing.md,
  },
  modalTechTagLarge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  modalTechTextLarge: {
    fontSize: 13,
    fontWeight: '600',
  },
  modalFooterControlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    width: '100%',
    height: 72,
    paddingHorizontal: Spacing.lg,
    marginTop: 'auto',
  },
  modalNavButtonHoverable: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({ web: { transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out' } }),
  },
  ctaHover: {
    ...Platform.select({ web: { transform: [{ scale: 1.15 }] }, android: { elevation: 6 } }),
  },
  arrowIconWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'web' ? 6 : 4,
  },
  arrowTextIcon: {
    fontSize: 34,
    fontWeight: '400',
    textAlign: 'center',
    textAlignVertical: 'center',
    ...Platform.select({
      web: {
        lineHeight: 0, 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }
    })
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