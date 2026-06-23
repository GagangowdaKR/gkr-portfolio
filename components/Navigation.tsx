import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  useWindowDimensions,
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
  const { width: windowWidth } = useWindowDimensions();
  const { toggleTheme, isDark } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const Colors = isDark ? darkColors : lightColors;

  const NAVBAR_HEIGHT = 70;
  const isMobileLayout = windowWidth < 768;

  // A mutable ref flag to bypass intersection observer updates during smooth auto-scrolling
  const isClickScrolling = useRef(false);
const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Injects dynamic scroll padding bounds to prevent elements from ducking under the fixed navbar
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;

    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
      html {
        scroll-padding-top: ${NAVBAR_HEIGHT + 24}px !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Web Scroll Spy Tracker: Uses high-performance IntersectionObserver to track scroll depth view states
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;

    const handleScrollFallback = () => {
      // If we are click-scrolling, completely ignore scroll position evaluation tracking to eliminate icon blinking
      if (isClickScrolling.current) return;

      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      if (window.scrollY + clientHeight >= scrollHeight - 30) {
        setActiveSection('contact');
      }
    };
    window.addEventListener('scroll', handleScrollFallback);

    const observerOptions = {
      root: null,
      rootMargin: `-${NAVBAR_HEIGHT}px 0px -40% 0px`,
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Block runtime section updates if automated scroll redirection execution is running
      if (isClickScrolling.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const el = document.getElementById(item.section);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollFallback);
    };
  }, [isDark]);

  const scrollToSection = (section: string) => {
    // 1. Instantly snap active design state directly to clicked item parameters
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    isClickScrolling.current = true;
    setActiveSection(section);

    if (Platform.OS === 'web') {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        // 2. Clear click lock once smooth animation completes 
        scrollTimeoutRef.current = setTimeout(() => {
          isClickScrolling.current = false;
        }, 850); // Matches smooth scroll translation animation length benchmarks exactly
      }
    } else {
      isClickScrolling.current = false;
    }

    setIsMenuOpen(false);
  };

  const containerStyle = useMemo(() => ({
    backgroundColor: "rgba(174, 162, 153, 0.08)",
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(230, 106, 23, 0.18)',
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
        
        {!isMobileLayout ? (
          <View style={styles.navItemsContainer}>
            <View style={styles.navItems}>
              {navItems.map((item) => (
                <Hoverable
                  key={item.id}
                  style={[
                    styles.navItem,
                    activeSection === item.section ? { backgroundColor: Colors.primary + '20' } : {},
                  ]}
                  onPress={() => scrollToSection(item.section)}
                >
                  <Text style={[navItemTextStyle, activeSection === item.section && navItemTextActiveStyle]}>
                    {item.label}
                  </Text>
                </Hoverable>
              ))}
            </View>
            <Hoverable
              style={[styles.themeToggleButton, { backgroundColor: Colors.backgroundLight, borderColor: Colors.border }]}
              onPress={toggleTheme}
              activeOpacity={0.7}
            >
              <Text style={[styles.themeIcon, { color: Colors.text }]}>{isDark ? '☀️' : '🌙'}</Text>
            </Hoverable>
          </View>
        ) : (
          <View style={styles.mobileNavRight}>
            <TouchableOpacity
              style={[styles.themeToggleButton, { backgroundColor: Colors.backgroundLight, borderColor: Colors.border }]}
              onPress={toggleTheme}
              activeOpacity={0.7}
            >
              <Text style={[styles.themeIcon, { color: Colors.text }]}>{isDark ? '☀️' : '🌙'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={() => setIsMenuOpen(!isMenuOpen)}>
              <Text style={[styles.menuIcon, { color: Colors.text }]}>{isMenuOpen ? '✕' : '☰'}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {isMenuOpen && isMobileLayout && (
        <View style={[styles.mobileMenu, { backgroundColor: Colors.background, borderTopColor: Colors.border }]}>
          <ScrollView keyboardShouldPersistTaps="handled">
            {navItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.mobileNavItem,
                  { borderBottomColor: Colors.border },
                  activeSection === item.section ? {
                    backgroundColor: Colors.backgroundLight,
                    borderLeftWidth: 4,
                    borderLeftColor: Colors.primary,
                  } : {},
                ]}
                onPress={() => scrollToSection(item.section)}
              >
                <Text style={[navItemTextStyle, activeSection === item.section && navItemTextActiveStyle]}>
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
    width: '100%',
  },
  containerWeb: {
    ...Platform.select({
      web: {
        position: 'sticky',
        top: 0,
      } as any,
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
    width: '100%',
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