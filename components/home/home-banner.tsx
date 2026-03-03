import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Spacing, Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

interface HomeBannerProps {
  title: string;
  imageUrl: string;
  onPress: () => void;
  // For pagination, usually an array of items or count is passed
  // For simplicity, we'll use a fixed number of dots and a state for current index
}

export function HomeBanner({ title, imageUrl, onPress }: HomeBannerProps) {
  const textColor = useThemeColor({}, 'text'); // Title color is black in Figma for light mode
  const dotColor = useThemeColor({}, 'text'); // Dots are black in Figma for light mode

  // Using a fixed index for demo purposes as there's only one banner image passed.
  // In a real carousel, this would be dynamic.
  const [activeIndex, setActiveIndex] = useState(0);

  // Figma's pagination has 5 dots
  const totalDots = 5;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <ThemedText style={[styles.title, { color: textColor }]}>
          {title}
        </ThemedText>
        <View style={styles.paginationContainer}>
          {Array.from({ length: totalDots }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { backgroundColor: dotColor },
                index === activeIndex ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.large,
    borderRadius: Spacing.small, // Figma cornerRadius: 8
    overflow: 'hidden', // Ensure image respects border radius
    height: 136, // Figma height: 136
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end', // Align children to bottom
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.medium,
  },
  imageStyle: {
    borderRadius: Spacing.small, // Apply to image itself
  },
  title: {
    fontSize: 20, // Figma fontSize: 20
    fontWeight: '600', // Figma fontWeight: 600 (Semi Bold)
    lineHeight: 28, // Figma lineHeight: 28
    letterSpacing: -0.4, // Figma letterSpacing: -0.4
    marginBottom: Spacing.small,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Figma aligns dots to center horizontally
    alignItems: 'center',
    gap: Spacing.xsmall + 1, // Figma itemSpacing: 5
    // Position pagination at the bottom-center of the banner (relative to image)
    position: 'absolute',
    bottom: Spacing.medium, // Figma absolute position adjusted for padding
    left: 0,
    right: 0,
  },
  dot: {
    width: 5, // Figma width: 5
    height: 5, // Figma height: 5
    borderRadius: 2.5,
  },
  activeDot: {
    opacity: 0.8, // Figma opacity: 0.8
  },
  inactiveDot: {
    opacity: 0.2, // Figma opacity: 0.2
  },
});
