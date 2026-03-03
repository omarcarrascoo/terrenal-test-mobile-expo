import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

interface CategoryHorizontalCardProps {
  title: string;
  imageUrl: string;
  onPress: () => void;
}

export function CategoryHorizontalCard({ title, imageUrl, onPress }: CategoryHorizontalCardProps) {
  const imageBackgroundColor = useThemeColor({}, 'lightNeutral'); // Image background is #F5F5F5
  const textColor = useThemeColor({}, 'text'); // Title color is dark gray

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.imageWrapper, { backgroundColor: imageBackgroundColor }]}>
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      </View>
      <ThemedText style={[styles.title, { color: textColor }]}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 76, // Figma width: 76
    alignItems: 'center', // Figma counterAxisAlignItems: CENTER, primaryAxisAlignItems: CENTER
    marginRight: Spacing.xl, // Figma itemSpacing: 24, applied as marginRight in the ScrollView
    // height: 104, // Figma total height, but auto for flexible text
    gap: Spacing.small, // Figma itemSpacing: 8 between image and title
  },
  imageWrapper: {
    width: 76, // Figma width: 76
    height: 76, // Figma height: 76
    borderRadius: 38, // Figma cornerRadius: 38 (perfect circle)
    overflow: 'hidden', // Clip image to bounds
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 14, // Figma fontSize: 14
    fontWeight: '500', // Figma fontWeight: 500 (Medium)
    lineHeight: 20, // Figma lineHeight: 19.6px (closest to 20 for easier calculation)
    letterSpacing: 0.1358, // Figma letterSpacing: 0.1358
    textAlign: 'center', // Figma textAlignHorizontal: CENTER
    width: '100%', // Ensure text takes full width to center properly
  },
});
