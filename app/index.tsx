import React, { useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { darkColors, lightColors } from '@/constants/Theme';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Navigation from '@/components/Navigation';
import Coding from '@/components/Coding';
import Footer from '@/components/Footer';

const navSections = ['hero', 'about', 'skills', 'coding', 'projects', 'experience', 'contact'];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { isDark } = useTheme();
  const Colors = isDark ? darkColors : lightColors;

  const scrollViewRef = useRef<ScrollView>(null);
  const [sectionOffsets, setSectionOffsets] = useState<Record<string, number>>({});
  const [activeSection, setActiveSection] = useState<string>('hero');

  const handleSectionLayout = (section: string, y: number) => {
    setSectionOffsets((prev) => ({ ...prev, [section]: y }));
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);

    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    const targetY = sectionOffsets[section] ?? 0;
    scrollViewRef.current?.scrollTo({ y: Math.max(0, targetY - 10), animated: true });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    let current = 'hero';
    for (const section of navSections) {
      const offset = sectionOffsets[section];
      if (offset !== undefined && scrollY >= offset - 140) {
        current = section;
      }
    }
    setActiveSection(current);
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors.background, paddingTop: insets.top }]}>
      <Navigation activeSection={activeSection} onNavigate={scrollToSection} />
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View onLayout={(e) => handleSectionLayout('hero', e.nativeEvent.layout.y)}>
          <Hero />
        </View>
        <View onLayout={(e) => handleSectionLayout('about', e.nativeEvent.layout.y)}>
          <About />
        </View>
        <View onLayout={(e) => handleSectionLayout('skills', e.nativeEvent.layout.y)}>
          <Skills />
        </View>
        <View onLayout={(e) => handleSectionLayout('coding', e.nativeEvent.layout.y)}>
          <Coding />
        </View>
        <View onLayout={(e) => handleSectionLayout('projects', e.nativeEvent.layout.y)}>
          <Projects />
        </View>
        <View onLayout={(e) => handleSectionLayout('experience', e.nativeEvent.layout.y)}>
          <Experience />
        </View>
        <View onLayout={(e) => handleSectionLayout('contact', e.nativeEvent.layout.y)}>
          <Contact />
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'web' ? 40 : 20,
  },
});




