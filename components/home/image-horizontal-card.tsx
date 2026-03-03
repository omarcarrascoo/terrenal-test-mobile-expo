import React from 'react';
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import { Spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

interface ImageHorizontalCardProps {
  imageUrl: string;
  onPress: () => void;
}

export function ImageHorizontalCard({ imageUrl, onPress }: ImageHorizontalCardProps) {
  const imageBackgroundColor = useThemeColor({}, 'lightNeutral'); // Image background is #F5F5F5

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.imageWrapper, { backgroundColor: imageBackgroundColor }]}>
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 96, // Figma width: 96
    height: 96, // Figma height: 96
    marginRight: Spacing.medium, // Figma itemSpacing: 12, applied as marginRight in the ScrollView
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: Spacing.small, // Figma cornerRadius: 8
    overflow: 'hidden', // Clip image to bounds
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
