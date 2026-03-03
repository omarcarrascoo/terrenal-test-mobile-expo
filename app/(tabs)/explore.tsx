import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { IconSymbol } from '@/components/ui/icon-symbol';

const discussCategories = [
  { id: '1', name: 'All', active: true },
  { id: '2', name: 'Communities', active: false },
  { id: '3', name: 'Mentors', active: false },
  { id: '4', name: 'Cohorts', active: false },
  { id: '5', name: 'Chats', active: false },
];

const discussItems = [
  {
    id: '1',
    type: 'announcement',
    title: 'IBE®',
    subtitle: 'Preview of the latest post in this...',
    hasIcon: true,
  },
  {
    id: '2',
    type: 'community',
    title: 'Community Name',
    subtitle: 'Xxxxxx Members',
    avatars: 3,
  },
  {
    id: '3',
    type: 'chat',
    title: 'Student',
    subtitle: 'Preview of the latest chat with...',
    hasAvatar: true,
  },
  {
    id: '4',
    type: 'community',
    title: 'Cohort Group',
    subtitle: 'Xxxxxx Members',
    avatars: 3,
  },
  {
    id: '5',
    type: 'community',
    title: 'Cohort Group',
    subtitle: 'Xxxxxx Members',
    avatars: 3,
  },
  {
    id: '6',
    type: 'chat',
    title: 'Student',
    subtitle: 'Preview of the latest chat with...',
    hasAvatar: true,
  },
  {
    id: '7',
    type: 'chat',
    title: 'Student',
    subtitle: 'Preview of the latest chat with...',
    hasAvatar: true,
  },
  {
    id: '8',
    type: 'chat',
    title: 'Student',
    subtitle: 'Preview of the latest chat with...',
    hasAvatar: true,
  },
  {
    id: '9',
    type: 'community',
    title: 'Elevate Community',
    subtitle: 'Xxxxxx Members',
    avatars: 3,
  },
];

export default function ExploreScreen() {
  const [activeCategory, setActiveCategory] = useState('1');
  const cardBackgroundColor = useThemeColor({}, 'discussCardBg');
  const textColor = useThemeColor({}, 'text');
  const mutedTextColor = useThemeColor({}, 'discussTextMuted');
  const iconBgColor = useThemeColor({}, 'discussIconBg');
  const backgroundColor = useThemeColor({}, 'background');
  const primaryColor = useThemeColor({}, 'primary');

  const handleCategoryPress = (id: string) => {
    setActiveCategory(id);
  };

  const handleItemPress = (item: any) => {
    Alert.alert('Discuss Item', `You selected: ${item.title}`);
  };

  const handleCreatePress = () => {
    Alert.alert('Create', 'Create new discussion');
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        {/* Header Section */}
        <View style={[styles.headerSection, { backgroundColor }]}>
          <View style={styles.headerTop}>
            <ThemedText style={[styles.title, { color: textColor }]}>Discuss</ThemedText>
            <TouchableOpacity 
              style={[styles.createButton, { backgroundColor: cardBackgroundColor }]}
              onPress={handleCreatePress}
            >
              <IconSymbol name="pencil.write" size={24} color={textColor} />
            </TouchableOpacity>
          </View>

          {/* Category Pills */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {discussCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryPill,
                  activeCategory === category.id && styles.categoryPillActive,
                ]}
                onPress={() => handleCategoryPress(category.id)}
              >
                <ThemedText
                  style={[
                    styles.categoryText,
                    { color: activeCategory === category.id ? textColor : mutedTextColor },
                    activeCategory === category.id && styles.categoryTextActive,
                  ]}
                >
                  {category.name}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Discussion Items */}
        <View style={styles.itemsContainer}>
          {discussItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.discussCard, { backgroundColor: cardBackgroundColor }]}
              onPress={() => handleItemPress(item)}
              activeOpacity={0.7}
            >
              {/* Icon/Avatar Section */}
              <View style={styles.cardLeft}>
                {item.type === 'announcement' && (
                  <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
                    <IconSymbol name="megaphone" size={24} color={textColor} />
                  </View>
                )}
                {item.type === 'community' && (
                  <View style={styles.avatarGroup}>
                    <View style={[styles.avatar, styles.avatarLarge, { backgroundColor: iconBgColor }]} />
                    <View style={[styles.avatar, styles.avatarMedium, styles.avatarOverlap1, { backgroundColor: iconBgColor }]} />
                    <View style={[styles.avatar, styles.avatarSmall, styles.avatarOverlap2, { backgroundColor: iconBgColor }]} />
                  </View>
                )}
                {item.type === 'chat' && (
                  <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
                    <IconSymbol name="person.fill" size={24} color={textColor} />
                  </View>
                )}
              </View>

              {/* Text Section */}
              <View style={styles.cardContent}>
                <ThemedText style={[styles.cardTitle, { color: mutedTextColor }]} numberOfLines={1}>
                  {item.title}
                </ThemedText>
                <ThemedText style={[styles.cardSubtitle, { color: mutedTextColor }]} numberOfLines={1}>
                  {item.subtitle}
                </ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Padding */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Explore More Communities Link */}
      <View style={[styles.exploreMoreContainer, { backgroundColor }]}>
        <TouchableOpacity onPress={() => Alert.alert('Explore', 'Explore more communities')}>
          <ThemedText style={[styles.exploreMoreText, { color: mutedTextColor }]}>
            Explore more communities
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xxxl,
  },
  headerSection: {
    paddingTop: Spacing.large,
    paddingBottom: Spacing.medium,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.large,
    marginBottom: Spacing.large,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 39,
    letterSpacing: -0.16,
    opacity: 0.9,
  },
  createButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesContainer: {
    paddingHorizontal: Spacing.large,
    gap: Spacing.small,
  },
  categoryPill: {
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.small,
    marginRight: Spacing.small,
  },
  categoryPillActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  categoryText: {
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 18.7,
    letterSpacing: -0.51,
  },
  categoryTextActive: {
    fontWeight: '600',
    opacity: 1,
  },
  itemsContainer: {
    paddingHorizontal: Spacing.large,
    gap: Spacing.small,
    marginTop: Spacing.medium,
  },
  discussCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    padding: Spacing.large,
    height: 89,
  },
  cardLeft: {
    marginRight: Spacing.medium,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarGroup: {
    width: 60,
    height: 60,
    position: 'relative',
  },
  avatar: {
    position: 'absolute',
    borderRadius: 100,
  },
  avatarLarge: {
    width: 39,
    height: 38,
    left: 0,
    bottom: 0,
  },
  avatarMedium: {
    width: 29,
    height: 29,
    right: 0,
    top: 0,
  },
  avatarSmall: {
    width: 33,
    height: 33,
    left: 6,
    top: 6,
  },
  avatarOverlap1: {
    zIndex: 1,
  },
  avatarOverlap2: {
    zIndex: 2,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 19.18,
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19.18,
  },
  exploreMoreContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingVertical: Spacing.medium,
  },
  exploreMoreText: {
    fontSize: 17,
    fontWeight: '500',
    letterSpacing: -0.51,
    lineHeight: 18.7,
  },
});