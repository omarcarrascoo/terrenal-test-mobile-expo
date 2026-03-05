import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

// Activity categories from Figma
const activityCategories = [
  { id: 'all', label: 'Todas', active: true },
  { id: 'follows', label: 'Seguimientos', active: false },
  { id: 'likes', label: 'Me gusta', active: false },
  { id: 'comments', label: 'Comentarios', active: false },
  { id: 'saves', label: 'Guardados', active: false },
];

// Activity data from Figma
const activities = [
  {
    id: '1',
    type: 'follow',
    userName: 'starryskies23',
    action: 'Comenzó a seguirte',
    timeAgo: '1 día',
    hasButton: true,
    buttonText: 'Seguir',
    hasDot: true,
    avatarUrl: 'https://picsum.photos/id/1005/48/48',
  },
  {
    id: '2',
    type: 'like',
    userName: 'nebulanomad',
    action: 'Le gustó tu publicación',
    timeAgo: '1 día',
    hasImage: true,
    imageUrl: 'https://picsum.photos/id/1015/48/48',
    hasDot: true,
    avatarUrl: 'https://picsum.photos/id/1006/48/48',
  },
  {
    id: '3',
    type: 'comment_like',
    userName: 'emberecho',
    action: 'Le gustó tu comentario',
    timeAgo: '2 días',
    hasQuote: true,
    quoteText: '¡¡¡Feliz cumpleaños!!! 🎉🎉',
    hasDot: true,
    avatarUrl: 'https://picsum.photos/id/1009/48/48',
  },
  {
    id: '4',
    type: 'save',
    userName: 'lunavoyager',
    action: 'Guardó tu publicación',
    timeAgo: '3 días',
    hasImage: true,
    imageUrl: 'https://picsum.photos/id/1018/48/48',
    hasDot: true,
    avatarUrl: 'https://picsum.photos/id/1010/48/48',
  },
  {
    id: '5',
    type: 'comment',
    userName: 'shadowlynx',
    action: 'Hizo un comentario en tu publicación',
    commentText: 'Iré en septiembre. ¿Y tú?',
    timeAgo: '4 días',
    hasImage: true,
    imageUrl: 'https://picsum.photos/id/1018/48/48',
    hasDot: true,
    avatarUrl: 'https://picsum.photos/id/1011/48/48',
  },
  {
    id: '6',
    type: 'share',
    userName: 'nebulanomad',
    action: 'Compartió una publicación que podría interesarte',
    timeAgo: '5 días',
    hasImage: true,
    imageUrl: 'https://picsum.photos/id/1020/48/48',
    avatarUrl: 'https://picsum.photos/id/1006/48/48',
  },
  {
    id: '7',
    type: 'comment_like',
    userName: 'lunavoyager',
    action: 'Le gustó tu comentario',
    timeAgo: '5 días',
    hasQuote: true,
    quoteText: '¡¡¡Esto es tan adorable!!!',
    avatarUrl: 'https://picsum.photos/id/1010/48/48',
  },
];

export default function NotificationsScreen() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const mutedTextColor = useThemeColor({ light: 'rgba(0,0,0,0.5)', dark: 'rgba(255,255,255,0.5)' }, 'text');
  const pillActiveBg = useThemeColor({}, 'text');
  const pillActiveText = useThemeColor({}, 'background');
  const pillInactiveBg = useThemeColor({}, 'background');
  const pillInactiveBorder = useThemeColor({}, 'border');
  const pillInactiveText = useThemeColor({}, 'text');
  const buttonBg = useThemeColor({}, 'text');
  const buttonText = useThemeColor({}, 'background');
  const dotColor = '#FF2C55';
  const quoteBg = useThemeColor({ light: '#D9D9D9', dark: '#3a3a3a' }, 'discussIconBg');
  const quoteText = useThemeColor({ light: '#828282', dark: '#9BA1A6' }, 'placeholder');
  
  const handleCategoryPress = (categoryId: string) => {
    setActiveCategory(categoryId);
    Alert.alert('Categoría', `Has seleccionado: ${categoryId}`);
  };
  
  const handleFollowPress = (userId: string) => {
    Alert.alert('Seguir', `Has seguido a: ${userId}`);
  };
  
  const handleActivityPress = (activityId: string) => {
    Alert.alert('Actividad', `Has seleccionado la actividad: ${activityId}`);
  };
  
  const renderActivityItem = (activity: any) => {
    return (
      <TouchableOpacity
        key={activity.id}
        style={styles.activityItem}
        onPress={() => handleActivityPress(activity.id)}
        activeOpacity={0.7}
      >
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <Image source={{ uri: activity.avatarUrl }} style={styles.avatar} />
          {activity.hasDot && <View style={[styles.dot, { backgroundColor: dotColor }]} />}
        </View>
        
        {/* Content */}
        <View style={styles.contentContainer}>
          {/* Text Content */}
          <View style={styles.textContent}>
            <View style={styles.nameTimeRow}>
              <ThemedText style={[styles.userName, { color: textColor }]}>
                {activity.userName}
              </ThemedText>
              <ThemedText style={[styles.timeAgo, { color: mutedTextColor }]}>
                {activity.timeAgo}
              </ThemedText>
            </View>
            
            <ThemedText style={[styles.actionText, { color: mutedTextColor }]}>
              {activity.action}
            </ThemedText>
            
            {/* Comment text */}
            {activity.commentText && (
              <ThemedText style={[styles.commentText, { color: textColor }]}>
                {activity.commentText}
              </ThemedText>
            )}
            
            {/* Quote */}
            {activity.hasQuote && (
              <View style={[styles.quoteContainer, { backgroundColor: quoteBg }]}>
                <ThemedText style={[styles.quoteText, { color: quoteText }]}>
                  {activity.quoteText}
                </ThemedText>
              </View>
            )}
          </View>
          
          {/* Right side content */}
          <View style={styles.rightContent}>
            {/* Button */}
            {activity.hasButton && (
              <TouchableOpacity
                style={[styles.followButton, { backgroundColor: buttonBg }]}
                onPress={() => handleFollowPress(activity.userName)}
              >
                <ThemedText style={[styles.followButtonText, { color: buttonText }]}>
                  {activity.buttonText}
                </ThemedText>
              </TouchableOpacity>
            )}
            
            {/* Image */}
            {activity.hasImage && (
              <Image source={{ uri: activity.imageUrl }} style={styles.activityImage} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor }]}>
        <ThemedText style={[styles.headerTitle, { color: textColor }]}>
          Actividad
        </ThemedText>
      </View>
      
      {/* Category Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {activityCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryPill,
              activeCategory === category.id 
                ? { backgroundColor: pillActiveBg }
                : { 
                    backgroundColor: pillInactiveBg,
                    borderWidth: 1,
                    borderColor: pillInactiveBorder,
                  },
            ]}
            onPress={() => handleCategoryPress(category.id)}
          >
            <ThemedText
              style={[
                styles.categoryText,
                { 
                  color: activeCategory === category.id ? pillActiveText : pillInactiveText,
                },
              ]}
            >
              {category.label}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Activities List */}
      <ScrollView
        contentContainerStyle={styles.activitiesContainer}
        showsVerticalScrollIndicator={false}
      >
        {activities.map((activity) => renderActivityItem(activity))}
        
        {/* Bottom padding for tab bar */}
        <View style={{ height: 120 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Spacing.large,
    paddingBottom: Spacing.medium,
    paddingHorizontal: Spacing.large,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  categoriesContainer: {
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.medium,
    gap: Spacing.small,
  },
  categoryPill: {
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.small,
    borderRadius: 20,
    marginRight: Spacing.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19.6,
  },
  activitiesContainer: {
    paddingTop: Spacing.small,
    paddingBottom: Spacing.xxxl,
  },
  activityItem: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.medium,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: Spacing.medium,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  dot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContent: {
    flex: 1,
    marginRight: Spacing.medium,
  },
  nameTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xsmall,
    marginBottom: 2,
  },
  userName: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  timeAgo: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    marginBottom: Spacing.xsmall,
  },
  commentText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    marginTop: Spacing.xsmall,
  },
  quoteContainer: {
    marginTop: Spacing.small,
    padding: Spacing.small,
    borderRadius: 3,
  },
  quoteText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  followButton: {
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.small,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19.6,
  },
  activityImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
});