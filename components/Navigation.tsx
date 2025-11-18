import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spacing, Typography, BorderRadius, lightColors, darkColors } from '@/constants/Theme';
import { useTheme } from '@/contexts/ThemeContext';
import Hoverable from './Hoverable';

interface NavItem {
  id: string;
  label: string;
  section: string;
}

const navItems: NavItem[] = [
  { id: '1', label: 'Home', section: 'hero' },
  { id: '2', label: 'About', section: 'about' },
  { id: '3', label: 'Skills', section: 'skills' },
  { id: '4', label: 'Projects', section: 'projects' },
  { id: '5', label: 'Experience', section: 'experience' },
  { id: '6', label: 'Contact', section: 'contact' },
];

export default function Navigation() {
  const insets = useSafeAreaInsets();
  const { theme, toggleTheme, isDark } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const Colors = isDark ? darkColors : lightColors;

  const scrollToSection = (section: string) => {
    // In a real app, you'd scroll to the section
    // For now, we'll just update the active section
    setActiveSection(section);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (Platform.OS === 'web') {
      setIsMenuOpen(true); // Always show menu on web
    }
  }, []);

  const containerStyle = useMemo(() => ({
    backgroundColor: "rgba(174, 162, 153, 0.08)",
    borderBottomWidth: 2,
    borderBottomColor: Colors.secondary,
    borderBottomLeftRadius: BorderRadius.lg,
    borderBottomRightRadius: BorderRadius.lg,
  }), [Colors.background, Colors.border]);

  const navItemTextStyle = useMemo(() => ({
    ...Typography.body,
    color: Colors.text,
    fontWeight: '500' as const,
  }), [Colors.text]);

  const navItemTextActiveStyle = useMemo(() => ({
    color: Colors.primary,
    fontWeight: '600' as const,
  }), [Colors.primary]);

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        { paddingTop: Platform.OS === 'web' ? Spacing.md : insets.top },
        Platform.OS === 'web' && styles.containerWeb,
      ]}
    >
      <View style={styles.navBar}>
        <Text style={[styles.logo, { color: Colors.primary }]}>Portfolio</Text>
        {Platform.OS === 'web' ? (
          <View style={styles.navItemsContainer}>
            <View style={styles.navItems}>
              {navItems.map((item) => (
                <Hoverable
                  key={item.id}
                  style={[
                    styles.navItem,
                    activeSection === item.section && {
                      backgroundColor: Colors.primary + '20',
                    },
                  ]}
                  onPress={() => scrollToSection(item.section)}
                >
                  <Text
                    style={[
                      navItemTextStyle,
                      activeSection === item.section && navItemTextActiveStyle,
                    ]}
                  >
                    {item.label}
                  </Text>
                </Hoverable>
              ))}
            </View>
            <Hoverable
              style={[
                styles.themeToggleButton,
                {
                  backgroundColor: Colors.backgroundLight,
                  borderColor: Colors.border,
                },
              ]}
              onPress={toggleTheme}
              activeOpacity={0.7}
            >
              <Text style={[styles.themeIcon, { color: Colors.text }]}>
                {isDark ? '💡' : '🌚'}
              </Text>
            </Hoverable>
          </View>
        ) : (
          <View style={styles.mobileNavRight}>
            <TouchableOpacity
              style={[
                styles.themeToggleButton,
                {
                  backgroundColor: Colors.backgroundLight,
                  borderColor: Colors.border,
                },
              ]}
              onPress={toggleTheme}
              activeOpacity={0.7}
            >
              <Text style={[styles.themeIcon, { color: Colors.text }]}>
                {isDark ? '💡' : '🌚'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Text style={[styles.menuIcon, { color: Colors.text }]}>☰</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {isMenuOpen && Platform.OS !== 'web' && (
        <View
          style={[
            styles.mobileMenu,
            {
              backgroundColor: Colors.background,
              borderTopColor: Colors.border,
            },
          ]}
        >
          <ScrollView>
            {navItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.mobileNavItem,
                  { borderBottomColor: Colors.border },
                  activeSection === item.section && {
                    backgroundColor: Colors.backgroundLight,
                    borderLeftWidth: 4,
                    borderLeftColor: Colors.primary,
                  },
                ]}
                onPress={() => scrollToSection(item.section)}
              >
                <Text
                  style={[
                    navItemTextStyle,
                    activeSection === item.section && navItemTextActiveStyle,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
  },
  containerWeb: {
    ...(Platform.OS === 'web' && {
      position: 'sticky',
      top: 0,
    }),
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    ...(Platform.OS === 'web' && {
      maxWidth: 1200,
      alignSelf: 'center',
      width: '100%',
    }),
  },
  logo: {
    ...Typography.h3,
    fontWeight: '900',
  },
  navItemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  navItems: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  navItem: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.sm,
  },
  menuButton: {
    padding: Spacing.sm,
    marginLeft: Spacing.sm,
  },
  menuIcon: {
    fontSize: 24,
  },
  mobileNavRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  mobileMenu: {
    borderTopWidth: 1,
    maxHeight: 300,
  },
  mobileNavItem: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
  },
  themeToggleButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.full,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  themeIcon: {
    fontSize: 20,
  },
});

