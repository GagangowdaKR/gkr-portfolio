import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView
} from 'react-native';
import {
  Spacing,
  Typography,
  BorderRadius,
  lightColors,
  darkColors,
} from '@/constants/Theme';

import { useTheme } from '@/contexts/ThemeContext';
import { ApiService } from '@/services/api';
import Hoverable from './Hoverable';

// Dynamically import WebView for native platforms to prevent web bundling crashes
let WebView: any;
if (Platform.OS !== 'web') {
  try {
    WebView = require('react-native-webview').WebView;
  } catch (e) {
    console.warn('WebView package missing. Run: npx expo install react-native-webview');
  }
}

export default function Hero() {
  const { isDark } = useTheme();
  const Colors = isDark ? darkColors : lightColors;

  // Modal 1: Resume Download Form States
  const [modalVisible, setModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    profession: '',
    phno: '',
    email: ''
  });

  // Modal 2: Know More Information Popup State
  const [aboutModalVisible, setAboutModalVisible] = useState(false);

  // Embedded Google Map coordinates embed link for Doddaballapur location context
  const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d576.3489182516379!2d77.36815124793996!3d13.33193638499306!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb1da67beeafa63%3A0x362434f77678aa59!2sThambenahalli%2C%20Karnataka%20561204!5e0!3m2!1sen!2sin!4v1782065796682!5m2!1sen!2sin";

  const handleOpenModal = () => {
    setForm({ name: '', profession: '', phno: '', email: '' });
    setModalVisible(true);
  };

  const handleFormSubmit = async () => {
    if (!form.name.trim() || !form.profession.trim()) {
      const msg = 'Please fill out all mandatory fields (Name and Profession).';
      Platform.OS === 'web' ? alert(msg) : Alert.alert('Required Fields', msg);
      return;
    }

    setIsSubmitting(true);
    try {
      const accessGranted = await ApiService.requestResumeAccess({
        name: form.name.trim(),
        profession: form.profession.trim(),
        phno: form.phno.trim() || undefined,
        email: form.email.trim() || undefined,
      });

      if (accessGranted) {
        setModalVisible(false);
        await ApiService.downloadResume();
      } else {
        const errorMsg = 'Your resume request was declined by the backend validation rules.';
        Platform.OS === 'web' ? alert(errorMsg) : Alert.alert('Request Denied', errorMsg);
      }
    } catch (error) {
      const failMsg = 'Network error or backend server is unreachable. Please try again.';
      Platform.OS === 'web' ? alert(failMsg) : Alert.alert('Error', failMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View nativeID="hero" style={styles.container}>
      <View style={[styles.content, { backgroundColor: Colors.backgroundLight, borderColor: Colors.border, borderWidth: 1 }]}>
        <Text style={[styles.greeting, { color: Colors.textLight }]}>Hello, I'm</Text>
        <Text style={[styles.name, { color: Colors.primary }]}>Gagan Gowda   K   R</Text>
        <Text style={[styles.title, { color: Colors.textLight }]}>Associate Software Engineer</Text>
        <Text style={[styles.description, { color: Colors.textLight }]}>
          I build robust cross-platform applications and software based on strict industry standards. 
          Using strong backend tools like Java and Spring Boot, I follow microservices architecture to 
          ensure high performance and top-tier security. Welcome to my space! I'm always open to collaborating 
          on impactful projects and contributing to open-source initiatives—glad you're here, let's connect and build 
          something great.
        </Text>

        <View style={styles.buttonContainer}>
          <Hoverable style={[styles.primaryButton, { borderColor: Colors.border, backgroundColor: Colors.backgroundLight }]} onPress={handleOpenModal}>
            <Text style={styles.primaryButtonText}>Download Resume</Text>
          </Hoverable>

          <Hoverable
            style={[styles.secondaryButton, { borderColor: Colors.border, backgroundColor: Colors.backgroundLight }]}
            onPress={() => setAboutModalVisible(true)}
          >
            <Text style={styles.secondaryButtonText}>Know more</Text>
          </Hoverable>
        </View>
      </View>

      {/* Modal 1: Lead Collection Popup Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => !isSubmitting && setModalVisible(false)}
        >
          <Pressable style={[styles.modalCard, { backgroundColor: Colors.backgroundLight, borderColor: Colors.border }]}>
            <Text style={[styles.modalTitle, { color: Colors.primaryDark }]}>Verify Details</Text>
            <Text style={[styles.modalSubtitle, { color: Colors.textLight }]}>
              Please provide your professional context to gain instant access to download the copy.
            </Text>

            <View style={styles.inputWrapper}>
              <Text style={[styles.inputLabel, { color: Colors.textLight }]}>
                Full Name <Text style={{ color: Colors.primaryDark }}>*</Text>
              </Text>
              <TextInput
                style={[styles.inputField, { color: Colors.text, borderColor: Colors.border }]}
                placeholder="Enter your name"
                placeholderTextColor="rgba(120, 120, 120, 0.6)"
                value={form.name}
                onChangeText={(text) => setForm({ ...form, name: text })}
                editable={!isSubmitting}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={[styles.inputLabel, { color: Colors.textLight }]}>
                Profession <Text style={{ color: Colors.primaryDark }}>*</Text>
              </Text>
              <TextInput
                style={[styles.inputField, { color: Colors.text, borderColor: Colors.border }]}
                placeholder="e.g., HR, Tech Recruiter, Lead Architect"
                placeholderTextColor="rgba(120, 120, 120, 0.6)"
                value={form.profession}
                onChangeText={(text) => setForm({ ...form, profession: text })}
                editable={!isSubmitting}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={[styles.inputLabel, { color: Colors.textLight }]}>Email Address <Text style={{ color: Colors.gray600 }}>(Optional)</Text> </Text>
              <TextInput
                style={[styles.inputField, { color: Colors.text, borderColor: Colors.border }]}
                placeholder="name@company.com"
                placeholderTextColor="rgba(120, 120, 120, 0.6)"
                keyboardType="email-address"
                value={form.email}
                onChangeText={(text) => setForm({ ...form, email: text })}
                editable={!isSubmitting}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={[styles.inputLabel, { color: Colors.textLight }]}>Phone Number  <Text style={{ color: Colors.gray600 }}>(Optional)</Text> </Text>
              <TextInput
                style={[styles.inputField, { color: Colors.text, borderColor: Colors.border }]}
                placeholder="+91 000 000 0000"
                placeholderTextColor="rgba(120, 120, 120, 0.6)"
                keyboardType="phone-pad"
                value={form.phno}
                onChangeText={(text) => setForm({ ...form, phno: text })}
                editable={!isSubmitting}
              />
            </View>

            <View style={styles.modalActionRow}>
              <TouchableOpacity
                style={[styles.modalCancelBtn, isSubmitting && { opacity: 0.5 }]}
                onPress={() => setModalVisible(false)}
                disabled={isSubmitting}
              >
                <Text style={[styles.modalCancelText, { color: Colors.textLight }]}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalSubmitBtn, { backgroundColor: Colors.primaryDark }, isSubmitting && { opacity: 0.7 }]}
                onPress={handleFormSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.modalSubmitText}>Allow Download</Text>
                )}
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Modal 2: New Know More Detailed Dynamic Layout Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={aboutModalVisible}
        onRequestClose={() => setAboutModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setAboutModalVisible(false)}
        >
          <Pressable style={[styles.aboutModalCard, { backgroundColor: Colors.backgroundLight, borderColor: Colors.border }]}>
            {/* <Text style={[styles.modalTitle, { color: Colors.primaryDark, marginBottom: Spacing.sm }]}>Basic Details</Text> */}

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.aboutScrollContent}>
              <View style={styles.splitLayoutContainer}>

                {/* Left Column: Education Details */}
                <View style={styles.layoutColumn}>
                  <Text style={[styles.columnHeading, { color: Colors.primary }]}>Education</Text>
                  <View style={[styles.infoCard, { borderColor: Colors.border }]}>
                    <Text style={[styles.infoCardTitle, { color: Colors.primaryDark }]}>Cambridge Institute of Technology NC</Text>
                    <Text style={[styles.infoCardDuration, { color: Colors.primary }]}>2021 - 2025</Text>
                    <Text style={[styles.infoCardTitle, { color: Colors.textLight }]}>Bachelor of Engineering (B.E)</Text>
                    <Text style={[styles.infoCardSubtitle, { color: Colors.textLight }]}>Computer Science & Engineering</Text>
                    <Text style={[styles.infoCardSubtitle, { color: Colors.textLight }]}>CGPA : 8.24</Text>
                  </View>
                  <View style={[styles.infoCard, { borderColor: Colors.border }]}>
                    <Text style={[styles.infoCardTitle, { color: Colors.primaryDark }]}>Vidyanidhi Independent PU College</Text>
                    <Text style={[styles.infoCardDuration, { color: Colors.primary }]}>2019 - 2021</Text>
                    <Text style={[styles.infoCardTitle, { color: Colors.textLight }]}>Pre-University College ( 11th & 12th )</Text>
                    <Text style={[styles.infoCardSubtitle, { color: Colors.textLight }]}>PCMC</Text>
                    <Text style={[styles.infoCardSubtitle, { color: Colors.textLight }]}>Percentage : 92.16 %</Text>
                  </View>
                  <View style={[styles.infoCard, { borderColor: Colors.border }]}>
                    <Text style={[styles.infoCardTitle, { color: Colors.primaryDark }]}>Morarji Desai Residential School</Text>
                    <Text style={[styles.infoCardDuration, { color: Colors.primary }]}>2018 - 2019</Text>
                    <Text style={[styles.infoCardTitle, { color: Colors.textLight }]}>Secondary School Leaving Certificate</Text>
                    <Text style={[styles.infoCardSubtitle, { color: Colors.textLight }]}>NCERT</Text>
                    <Text style={[styles.infoCardSubtitle, { color: Colors.textLight }]}>Percentage : 90.04 %</Text>
                  </View>
                </View>

                {/* Right Column: Hobbies & Address details */}
                <View style={styles.layoutColumn}>
                  <Text style={[styles.columnHeading, { color: Colors.primary }]}>Hobbies & Interests</Text>
                  <View style={styles.hobbyList}>
                    {['Dance', 'Volley Ball', 'Cricket', 'Chess', 'Agriculture', 'Exploring New Technologies'].map((hobby) => (
                      <View key={hobby} style={[styles.hobbyBadge, { backgroundColor: Colors.background, borderColor: Colors.border }]}>
                        <Text style={[styles.hobbyText, { color: Colors.textLight }]}>{hobby}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Address Section with integrated responsive Cross-Platform Map Block */}
                  <Text style={[styles.bottomColumnHeading, { color: Colors.primary }]}>Address</Text>
                  <View style={[styles.addressContainer, { borderColor: Colors.border }]}>
                    <View style={styles.addressTextContent}>
                      <Text style={[styles.hobbyText, { color: Colors.textLight }]}>#04, Kalipalya</Text>
                      <Text style={[styles.hobbyText, { color: Colors.textLight }]}>Doddaballapur, Bengaluru Rural</Text>
                      <Text style={[styles.hobbyText, { color: Colors.textLight }]}>561204, Karnataka, India</Text>
                    </View>

                    {/* Map Integration Container */}
                    <View style={[styles.mapContainer, { borderColor: Colors.border }]}>
                      {Platform.OS === 'web' ? (
                        <iframe
                          src={MAP_EMBED_URL}
                          width="100%"
                          height="100%"
                          style={{ border: 0, borderRadius: BorderRadius.sm }}
                          allowFullScreen={false}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      ) : WebView ? (
                        <WebView
                          source={{ uri: MAP_EMBED_URL }}
                          style={{ flex: 1, borderRadius: BorderRadius.sm }}
                          javaScriptEnabled={true}
                          domStorageEnabled={true}
                        />
                      ) : (
                        <View style={styles.mapFallback}>
                          <Text style={{ color: Colors.textLight, fontSize: 12 }}>Map rendering unavailable</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalActionRow}>
              <TouchableOpacity
                style={[styles.modalSubmitBtn, { backgroundColor: Colors.primaryDark }]}
                onPress={() => setAboutModalVisible(false)}
              >
                <Text style={styles.modalSubmitText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: Spacing.sm,
    minHeight: Platform.OS === 'web' ? 600 : 500,
    marginBottom: Spacing.xl,
    ...(Platform.OS === 'web' && {
      maxWidth: 1175,
      alignSelf: 'center',
    }),
  },
  content: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  greeting: {
    ...Typography.h4,
    marginBottom: Spacing.sm,
  },
  name: {
    ...Typography.h1,
    marginBottom: Spacing.sm,
    textAlign: 'center',
    ...(Platform.OS === 'web' && {
      fontSize: 64,
      lineHeight: 72,
    }),
  },
  title: {
    ...Typography.h3,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  description: {
    ...Typography.body,
    textAlign: 'center',
    maxWidth: Platform.OS === 'web' ? 600 : '100%',
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.md,
    lineHeight: 28,
  },
  buttonContainer: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    gap: Spacing.md,
    width: Platform.OS === 'web' ? 'auto' : '100%',
    paddingHorizontal: Spacing.md,
  },
  primaryButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    minWidth: Platform.OS === 'web' ? 160 : '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    ...Typography.body,
    color: 'rgba(157, 142, 142, 0.95)',
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 2,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.full,
    minWidth: Platform.OS === 'web' ? 160 : '100%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    ...Typography.body,
    color: 'rgba(157, 142, 142, 0.95)',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.md,
  },
  modalCard: {
    width: '100%',
    maxWidth: 480,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.xl,
    ...Platform.select({
      web: { boxShadow: '0px 10px 25px rgba(0,0,0,0.3)' },
      default: { elevation: 8 }
    })
  },
  aboutModalCard: {
    width: '100%',
    maxWidth: 760,
    maxHeight: '85%',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.xl,
    ...Platform.select({
      web: { boxShadow: '0px 10px 25px rgba(0,0,0,0.3)' },
      default: { elevation: 8 }
    })
  },
  aboutScrollContent: {
    paddingVertical: Spacing.sm,
  },
  splitLayoutContainer: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    gap: Spacing.xl,
    width: '100%',
    marginTop: Spacing.md,
  },
  layoutColumn: {
    flex: 1,
    minWidth: Platform.OS === 'web' ? 330 : '100%',
  },
  columnHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: Spacing.md,
    borderBottomWidth: 1,
    paddingBottom: Spacing.xs,
    borderColor: 'rgba(120, 120, 120, 0.2)',
  },
  bottomColumnHeading: {
    fontSize: 18,
    fontWeight: '600',
    paddingTop: Spacing.lg,
    marginBottom: Spacing.md,
    borderBottomWidth: 1,
    paddingBottom: Spacing.xs,
    borderColor: 'rgba(120, 120, 120, 0.2)',
  },
  addressContainer: {
    borderWidth: 1,
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  addressTextContent: {
    marginBottom: Spacing.xs,
    paddingLeft: Spacing.xs,
  },
  mapContainer: {
    width: '100%',
    height: 160,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    overflow: 'hidden',
    marginTop: Spacing.xs,
  },
  mapFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  infoCard: {
    borderLeftWidth: 3,
    paddingLeft: Spacing.md,
    marginBottom: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  infoCardTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  infoCardSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  infoCardDuration: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  hobbyList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  hobbyBadge: {
    borderWidth: 1,
    borderRadius: BorderRadius.sm,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
  },
  hobbyText: {
    fontSize: 13,
    lineHeight: 18,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  modalSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },
  inputWrapper: {
    marginBottom: Spacing.md,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: Spacing.xs,
  },
  inputField: {
    borderWidth: 1,
    borderRadius: BorderRadius.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    fontSize: 15,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  modalActionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  modalCancelBtn: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'center',
  },
  modalCancelText: {
    fontSize: 15,
    fontWeight: '600',
  },
  modalSubmitBtn: {
    borderRadius: BorderRadius.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSubmitText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  }
});