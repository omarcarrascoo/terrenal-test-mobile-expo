import { Tabs } from 'expo-router';
import React from 'react';
import { View, Alert, StyleSheet } from 'react-native'; // Import StyleSheet

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer'; // Import the new Footer component
import { useThemeColor } from '@/hooks/use-theme-color';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const rootBackgroundColor = useThemeColor({}, 'background');

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
              backgroundColor: Colors[colorScheme ?? 'light'].cardBackground, // Use cardBackground for tab bar
              borderTopWidth: StyleSheet.hairlineWidth,
              borderTopColor: Colors[colorScheme ?? 'light'].shadow, // Subtle border
              height: 60 + Spacing.small, // A bit taller for better UX
              paddingBottom: Spacing.small, // Add padding bottom for modern look
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
            }
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Inicio',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              title: 'Explorar',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
            }}
          />
        </Tabs>
      </View>
      <Footer /> {/* Add Footer at the very bottom */}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  tabsContentContainer: {
    flex: 1, // Allows the Tabs navigator to fill the space between Header and Footer
  },
});
