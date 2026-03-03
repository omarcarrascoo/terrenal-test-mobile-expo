import { Tabs } from 'expo-router';
import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // Import useSafeAreaInsets

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Header } from '@/components/header';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const rootBackgroundColor = useThemeColor({}, 'background');
  const insets = useSafeAreaInsets(); // Initialize insets

  const handleMenuPress = () => {
    Alert.alert('Menú', 'Has presionado el botón de menú!');
    // En una aplicación real, esto abriría un cajón lateral o un menú modal.
  };

  return (
    <View style={[styles.rootContainer, { backgroundColor: rootBackgroundColor }]}> {/* Root container for the entire screen */}
      <Header onMenuPress={handleMenuPress} title="Terrenal" />
      <View style={styles.tabsContentContainer}> {/* This View takes the remaining space for Tabs */}
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            headerShown: false, // Keep this false as Header component is used above
            tabBarButton: HapticTab,
            tabBarStyle: {
              backgroundColor: Colors[colorScheme ?? 'light'].cardBackground, // Use cardBackground for tab bar (white in light mode)
              borderTopWidth: 0, // No border as per Figma, use shadow
              borderTopColor: 'transparent',
              // Figma total Tab Bar height is 78px
              // Tab Bar Item has paddingTop: 12, paddingBottom: 8, height: 44 for content
              // Home Indicator has height: 34
              // Total visual height: 44 (tabs content area) + 34 (home indicator area) = 78
              // Safe area insets will add to this on devices with a home indicator
              height: 78 + insets.bottom, // Total height including home indicator space + safe area
              paddingBottom: insets.bottom, // Use safe area insets for padding, pushed from bottom

              // Figma shadow for Tab Bar (id: 1:3130):
              shadowColor: Colors[colorScheme ?? 'light'].tabBarShadow, // Use the new color
              shadowOffset: { width: 0, height: -0.5 }, // Figma offset y: -0.5
              shadowOpacity: 0.1, // Figma opacity: 0.1
              shadowRadius: 0, // Figma radius: 0
              elevation: 5, // Android shadow to match iOS visually
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
            },
            tabBarItemStyle: { // Apply padding to individual tab items to center content within their 44px
              paddingTop: 12, // Figma paddingTop: 12
              paddingBottom: 8, // Figma paddingBottom: 8
            }
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Inicio',
              tabBarIcon: ({ color }) => <IconSymbol size={24} name="house.fill" color={color} />, // Icon size 24 from Figma
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              title: 'Explorar',
              tabBarIcon: ({ color }) => <IconSymbol size={24} name="paperplane.fill" color={color} />, // Icon size 24 from Figma
            }}
          />
        </Tabs>
      </View>
      {/* The Footer component with copyright info was removed as its content is not present
          in the provided Figma "Tab Bar" design, which now occupies the entire bottom area. */}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  tabsContentContainer: {
    flex: 1, // Allows the Tabs navigator to fill the space between Header and the custom Tab Bar height
  },
});
