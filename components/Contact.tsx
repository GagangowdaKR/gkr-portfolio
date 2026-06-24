import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  Alert,
  Linking,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Spacing, Typography, BorderRadius, lightColors, darkColors } from '@/constants/Theme';
import { useTheme } from '@/contexts/ThemeContext';
import Hoverable from './Hoverable';
import { ApiService } from '../services/api'; 

interface SocialItem {
  id: string;
  iconSource: any;
  fallbackEmoji: string;
  label: string;
  value: string;
  url: string;
}

export default function Contact() {
  const { isDark } = useTheme();
  const Colors = isDark ? darkColors : lightColors;
  
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Directly mapping your dynamic asset folder image icons array parameters
  const socialItems: SocialItem[] = [
    { id: 'phone', iconSource: require('@/assets/contact-icons/Phone.png'), fallbackEmoji: '📱', label: 'Call Phone', value: '+91 63641 09281', url: 'tel:+916364109281' },
    { id: 'email', iconSource: require('@/assets/contact-icons/Email.png'), fallbackEmoji: '📧', label: 'Send Email', value: 'gagandarshan22@gmail.com', url: 'mailto:gagandarshan22@gmail.com' },
    { id: 'linkedin', iconSource: require('@/assets/contact-icons/LinkedIn.png'), fallbackEmoji: '🔗', label: 'LinkedIn Profile', value: 'linkedin.com/in/gagan-gowda-k-r', url: 'https://linkedin.com/in/gagan-gowda-k-r' },
    { id: 'github', iconSource: require('@/assets/contact-icons/Github.png'), fallbackEmoji: '💼', label: 'GitHub Repository', value: 'github.com/GagangowdaKR', url: 'https://github.com/GagangowdaKR' },
    { id: 'youtube', iconSource: require('@/assets/contact-icons/YouTube.png'), fallbackEmoji: '📺', label: 'YouTube Channel', value: 'youtube.com/@gkr_dancer', url: 'https://www.youtube.com/@gkr_dancer' },
    // { id: 'instagram', iconSource: require('@/assets/contact-icons/Insta.png'), fallbackEmoji: '📸', label: 'Instagram Profile', value: '@gagan_gowda', url: 'https://instagram.com' },
  ];

  const displayAlert = (title: string, msg: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${msg}`);
    } else {
      Alert.alert(title, msg);
    }
  };

  const handleCopy = async (value: string, id: string) => {
    try {
      await Clipboard.setStringAsync(value);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to access native device copy clipboard channels:', err);
    }
  };

  const handleSubmit = async () => {
    if (!name || !profession || !email || !message) {
      displayAlert('Validation Error', 'Please fill in all mandatory fields (*).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      displayAlert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    const isSuccess = await ApiService.submitContactMessage({
      name: name.trim(),
      profession: profession.trim(),
      email: email.trim().toLowerCase(),
      phno: phone.trim() || undefined,
      message: message.trim(),
    });

    setIsLoading(false);

    if (isSuccess) {
      displayAlert('Success', 'Contact request created, will be in touch soon!');
      setName('');
      setProfession('');
      setEmail('');
      setPhone('');
      setMessage('');
    } else {
      displayAlert('Submission Failure', 'Failed to dispatch contact request. Please verify connection bounds.');
    }
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error('Failed to parse open hyperlink transaction root:', err)
    );
  };

  return (
    <View nativeID="contact" style={styles.container}>
      <View style={[styles.content, { backgroundColor: Colors.background, borderColor: Colors.border, borderWidth: 1 }]}>
        <Text style={[styles.title, { color: Colors.text }]}>Contact Me</Text>
        <View style={[styles.divider, { backgroundColor: Colors.primary }]} />
        <Text style={[styles.subtitle, { color: Colors.textLight }]}>
          I value open communication and look forward to building meaningful connections. Feel free to interact with my socials below to view data channels or copy text metrics directly.
        </Text>

        <View style={styles.mainFormWrapper}>
          
          {/* Circular Platforms Tray Row Container */}
          <View style={styles.socialCirclesContainer}>
            {socialItems.map((item) => (
              <View key={item.id} style={styles.circleContainerWrapper}>
                <Hoverable
                  style={[styles.circleButton, { backgroundColor: Colors.backgroundLight, borderColor: Colors.border }]}
                  hoverStyle={{ transform: [{ scale: 1.08 }] }}
                  onPress={() => openLink(item.url)}
                  {...(Platform.OS === 'web' ? {
                    onMouseEnter: () => setHoveredItem(item.id),
                    onMouseLeave: () => setHoveredItem(null),
                  } : {})}
                >
                  <Image 
                    source={item.iconSource} 
                    style={styles.circleIconImage}
                    resizeMode="contain"
                    // Dynamic layout placeholder fallback in case image references break
                    defaultSource={require('@/assets/adaptive-icon.png')} 
                  />
                </Hoverable>

                {/* Adaptive Metadata Overlay Tooltip Bubble */}
                {hoveredItem === item.id && (
                  <View style={[styles.tooltipBubble, { backgroundColor: Colors.background, borderColor: Colors.border }]}>
                    <Text numberOfLines={1} style={[styles.tooltipText, { color: Colors.text }]}>
                      {item.value}
                    </Text>
                    <TouchableOpacity 
                      style={[styles.copyButton, { backgroundColor: Colors.primary + '15' }]} 
                      onPress={() => handleCopy(item.value, item.id)}
                    >
                      <Text style={[styles.copyButtonText, { color: Colors.primary }]}>
                        {copiedId === item.id ? 'Saved! ✓' : 'Copy 📋'}
                      </Text>
                    </TouchableOpacity>
                    <View style={[styles.tooltipArrow, { borderTopColor: Colors.border }]} />
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* Core Input Form Block Card Layout */}
          <View style={styles.form}>
            <TextInput
              style={[styles.input, { color: Colors.text, backgroundColor: Colors.backgroundLight, borderColor: Colors.border }]}
              placeholder="Your Name *"
              placeholderTextColor={isDark ? '#666' : '#999'}
              value={name}
              onChangeText={setName}
              editable={!isLoading}
            />
            <TextInput
              style={[styles.input, { color: Colors.text, backgroundColor: Colors.backgroundLight, borderColor: Colors.border }]}
              placeholder="Your Profession *"
              placeholderTextColor={isDark ? '#666' : '#999'}
              value={profession}
              onChangeText={setProfession}
              editable={!isLoading}
            />
            <TextInput
              style={[styles.input, { color: Colors.text, backgroundColor: Colors.backgroundLight, borderColor: Colors.border }]}
              placeholder="Your Email *"
              placeholderTextColor={isDark ? '#666' : '#999'}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isLoading}
            />
            <TextInput
              style={[styles.input, { color: Colors.text, backgroundColor: Colors.backgroundLight, borderColor: Colors.border }]}
              placeholder="Your Phone Number (Optional)"
              placeholderTextColor={isDark ? '#666' : '#999'}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              editable={!isLoading}
            />
            <TextInput
              style={[styles.input, styles.messageInput, { color: Colors.text, backgroundColor: Colors.backgroundLight, borderColor: Colors.border }]}
              placeholder="Your Message *"
              placeholderTextColor={isDark ? '#666' : '#999'}
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              editable={!isLoading}
            />
            
            <Hoverable
              style={[styles.submitButton, { backgroundColor: Colors.primary + '15', borderColor: Colors.primary, borderWidth: 1 }]}
              hoverStyle={!isLoading ? { backgroundColor: Colors.primary + '25', transform: [{ scale: 1.01 }] } : {}}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.primary} size="small" />
              ) : (
                <Text style={[styles.submitButtonText, { color: Colors.primary }]}>Send Message</Text>
              )}
            </Hoverable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: Spacing.sm,
    minHeight: Platform.OS === 'web' ? 600 : 500,
    marginBottom: Spacing.xl,
    ...Platform.select({
      web: { boxSizing: 'border-box' } as any,
    }),
    ...(Platform.OS === 'web' && {
      maxWidth: 1175,
      alignSelf: 'center',
    }),
  },
  content: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: { boxSizing: 'border-box' } as any,
    }),
  },
  title: {
    ...Typography.h2,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  divider: {
    width: 60,
    height: 4,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.md,
  },
  subtitle: {
    ...Typography.body,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    maxWidth: 750,
    lineHeight: 24,
  },
  mainFormWrapper: {
    width: '100%',
    maxWidth: 650,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.lg,
    ...Platform.select({
      web: { boxSizing: 'border-box' } as any,
    }),
  },
  socialCirclesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
    width: '100%',
    marginBottom: Spacing.lg,
    zIndex: 10,
  },
  circleContainerWrapper: {
    position: 'relative',
    alignItems: 'center',
  },
  circleButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12, // Cleans spacing balance within asset bounds boundaries
    ...Platform.select({
      web: { 
        transition: 'all 0.15s ease-in-out',
        cursor: 'pointer',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.05)'
      } as any,
    }),
  },
  circleIconImage: {
    width: '100%',
    height: '100%',
  },
  tooltipBubble: {
    position: 'absolute',
    bottom: 64, 
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    minWidth: 220,
    justifyContent: 'space-between',
    gap: Spacing.sm,
    ...Platform.select({
      web: {
        boxShadow: '0px 6px 18px rgba(0,0,0,0.15)',
      } as any
    })
  },
  tooltipText: {
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
    flexShrink: 1,
  },
  copyButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  copyButtonText: {
    fontSize: 11,
    fontWeight: '700',
  },
  tooltipArrow: {
    position: 'absolute',
    bottom: -6,
    alignSelf: 'center',
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  form: {
    width: '100%',
    ...Platform.select({
      web: { boxSizing: 'border-box' } as any,
    }),
  },
  input: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    fontSize: 14,
    marginBottom: Spacing.md,
    borderWidth: 1,
    width: '100%', 
    maxWidth: '100%', 
    ...Platform.select({
      web: { boxSizing: 'border-box' } as any,
    }), 
  },
  messageInput: {
    minHeight: 140,
    paddingTop: Spacing.md,
  },
  submitButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xs,
    width: '100%',
    maxWidth: '100%',
    ...Platform.select({
      web: { 
        boxSizing: 'border-box',
        transition: 'all 0.2s ease-in-out', 
        cursor: 'pointer' 
      } as any
    }),
  },
  submitButtonText: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});