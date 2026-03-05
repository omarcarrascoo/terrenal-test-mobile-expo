import { Tabs } from 'expo-router';
import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Spacing } from '@/constants/theme';
import { AppHeader } from '@/components/header';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function TabLayout() {
  const rootBackgroundColor = useThemeColor({}, 'background');
  const insets = useSafeAreaInsets();
  const tabBarBg = useThemeColor({}, 'cardBackground');
  const tabBarShadowColor = useThemeColor({}, 'tabBarShadow');

  const handleMenuPress = () => {
    Alert.alert('Menú', 'Has presionado el botón de menú!');
  };

  const handleChatPress = () => {
    Alert.alert('Chat', 'Has presionado el botón de chat!');
  };

  return (
    <View style={[styles.rootContainer, { backgroundColor: rootBackgroundColor }]}>
      <AppHeader onMenuPress={handleMenuPress} title="IBM" />
      <View style={styles.tabsContentContainer}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors.dark.text,
            tabBarInactiveTintColor: Colors.dark.tabIconDefault,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarStyle: {
              backgroundColor: tabBarBg,
              borderTopWidth: 0,
              borderTopColor: 'transparent',
              height: 78 + insets.bottom,
              paddingBottom: insets.bottom,
              shadowColor: tabBarShadowColor,
              shadowOffset: { width: 0, height: -0.5 },
              shadowOpacity: 0.1,
              shadowRadius: 0,
              elevation: 5,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
            },
            tabBarLabelStyle: {
              fontSize: 10,
              fontWeight: '500',
              lineHeight: 12,
            },
            tabBarItemStyle: {
              paddingTop: 12,
              paddingBottom: 8,
            },
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Learn',
              tabBarIcon: ({ color }) => <IconSymbol size={24} name="book.fill" color={color} />,
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              title: 'Discuss',
              tabBarIcon: ({ color }) => <IconSymbol size={24} name="message.fill" color={color} />,
            }}
          />
          <Tabs.Screen
            name="chat"
            options={{
              title: 'Chat',
              tabBarIcon: ({ color }) => <IconSymbol size={24} name="message" color={color} />,
            }}
          />
          <Tabs.Screen
            name="notifications"
            options={{
              title: 'Notifications',
              tabBarIcon: ({ color }) => <IconSymbol size={24} name="bell.fill" color={color} />,
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  tabsContentContainer: {
    flex: 1,
  },
});
