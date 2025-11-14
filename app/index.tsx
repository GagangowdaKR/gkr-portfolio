import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Platform,
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

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { isDark } = useTheme();
  const Colors = isDark ? darkColors : lightColors;

  return (
    <View style={[styles.container, { backgroundColor: Colors.background, paddingTop: insets.top }]}>
      <Navigation />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
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


