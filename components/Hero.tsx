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
  Pressable
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

export default function Hero() {
  const { isDark } = useTheme();
  const Colors = isDark ? darkColors : lightColors;

  // Modal & Form States
  const [modalVisible, setModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    profession: '',
    phno: '',
    email: ''
  });

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
        <Text style={styles.greeting}>Hello, I'm</Text>
        <Text style={styles.name}>Gagan Gowda   K  R</Text>
        <Text style={styles.title}>Associate Software Engineer</Text>
        <Text style={styles.description}>
          As a Junior Software Engineer specializing in the Java and Spring Boot ecosystems. 
          From implementing distributed microservices to securing high-frequency RESTful APIs, 
          I translate complex enterprise requirements into modular, clean, and highly scalable software solutions. 
        </Text>
        
        <View style={styles.buttonContainer}>
          <Hoverable style={styles.primaryButton} onPress={handleOpenModal}>
            <Text style={styles.primaryButtonText}>Download Resume</Text>
          </Hoverable>
          
          <Hoverable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Know more</Text>
          </Hoverable>
        </View>
      </View>

      {/* Lead Collection Popup Modal */}
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

            {/* Input fields */}
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

            {/* Modal Actions */}
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
    color: 'rgba(135, 135, 135, 0.76)',
    marginBottom: Spacing.sm,
  },
  name: {
    ...Typography.h1,
    color: 'rgba(255, 102, 0, 0.33)',
    marginBottom: Spacing.sm,
    textAlign: 'center',
    ...(Platform.OS === 'web' && {
      fontSize: 64,
      lineHeight: 72,
    }),
  },
  title: {
    ...Typography.h3,
    color: 'rgba(150, 150, 150, 0.9)',
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  description: {
    ...Typography.body,
    color: 'rgba(194, 183, 183, 0.9)',
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
    backgroundColor: 'rgba(179, 172, 172, 0.16)',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: 'rgba(255, 102, 0, 0.15)',
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
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(255, 102, 0, 0.15)',
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
    fontWeight: '400', // Changed explicitly to non-bold regular text
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
    color: '#c6bcbc',
    fontSize: 15,
    fontWeight: '600',
  }
});