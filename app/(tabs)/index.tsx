import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Image, TouchableOpacity, Alert } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';

// Dummy data for the social feed
const feedPosts = [
  {
    id: '1',
    userName: 'Helena',
    groupName: 'en Nombre del grupo',
    timeAgo: 'Hace 3 minutos',
    avatarUrl: 'https://picsum.photos/id/1005/40/40',
    postImageUrl: 'https://picsum.photos/id/1015/343/200',
    description: 'Descripción de la publicación',
    likes: 21,
    comments: 4,
  },
  {
    id: '2',
    userName: 'Daniel',
    groupName: 'en Nombre del grupo',
    timeAgo: 'Hace 2 horas',
    avatarUrl: 'https://picsum.photos/id/1006/40/40',
    postImageUrl: null,
    description: 'Texto del cuerpo de una publicación. Como es una aplicación de redes sociales, a veces es una opinión polémica y otras veces es una pregunta.',
    likes: 6,
    comments: 18,
  },
  {
    id: '3',
    userName: 'Oscar',
    groupName: 'en Nombre del grupo',
    timeAgo: 'hace 1 día',
    avatarUrl: 'https://picsum.photos/id/1009/40/40',
    postImageUrl: 'https://picsum.photos/id/1018/343/200',
    description: 'Otra publicación',
    likes: 58,
    comments: 5,
  },
];

const feedTabs = [
  { id: 'following', label: 'Seguidos', active: false },
  { id: 'foryou', label: 'Para ti', active: true },
  { id: 'favorites', label: 'Favoritos', active: false },
];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('foryou');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const mutedTextColor = useThemeColor({ light: 'rgba(0,0,0,0.5)', dark: 'rgba(255,255,255,0.5)' }, 'text');
  const avatarBgColor = useThemeColor({}, 'lightNeutral');
  const tabIndicatorColor = useThemeColor({}, 'text');
  const tabInactiveColor = useThemeColor({ light: 'rgba(0,0,0,0.4)', dark: 'rgba(255,255,255,0.4)' }, 'text');
  const postImageBgColor = useThemeColor({}, 'lightNeutral');
  const iconColor = useThemeColor({}, 'text');

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    Alert.alert('Tab Cambiada', `Has cambiado a la pestaña: ${tabId}`);
  };

  const handlePostPress = (postId: string) => {
    Alert.alert('Publicación', `Has seleccionado la publicación con ID: ${postId}`);
  };

  const handleLikePress = (postId: string) => {
    Alert.alert('Me gusta', `Has dado like a la publicación: ${postId}`);
  };

  const handleCommentPress = (postId: string) => {
    Alert.alert('Comentarios', `Has presionado comentarios en: ${postId}`);
  };

  const handleMorePress = (postId: string) => {
    Alert.alert('Más opciones', `Opciones para publicación: ${postId}`);
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      {/* Header with Tabs */}
      <View style={[styles.header, { backgroundColor }]}>
        <View style={styles.tabsWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsContainer}
          >
            {feedTabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={styles.tabButton}
                onPress={() => handleTabPress(tab.id)}
              >
                <ThemedText
                  style={[
                    styles.tabText,
                    { 
                      color: activeTab === tab.id ? textColor : tabInactiveColor,
                      opacity: activeTab === tab.id ? 1 : 0.4,
                    },
                  ]}
                >
                  {tab.label}
                </ThemedText>
                {activeTab === tab.id && (
                  <View style={[styles.tabIndicator, { backgroundColor: tabIndicatorColor }]} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Social Feed */}
      <ScrollView 
        contentContainerStyle={styles.feedContainer}
        showsVerticalScrollIndicator={false}
      >
        {feedPosts.map((post) => (
          <TouchableOpacity
            key={post.id}
            style={styles.postContainer}
            onPress={() => handlePostPress(post.id)}
            activeOpacity={0.9}
          >
            {/* Post Header */}
            <View style={styles.postHeader}>
              <View style={styles.avatarContainer}>
                <View style={[styles.avatarBackground, { backgroundColor: avatarBgColor }]}>
                  <Image source={{ uri: post.avatarUrl }} style={styles.avatarImage} />
                </View>
              </View>
              
              <View style={styles.postMetaData}>
                <View style={styles.nameGroupRow}>
                  <ThemedText style={[styles.userName, { color: textColor }]}>
                    {post.userName}
                  </ThemedText>
                  <ThemedText style={[styles.groupName, { color: textColor }]}>
                    {post.groupName}
                  </ThemedText>
                </View>
                <ThemedText style={[styles.timeAgo, { color: mutedTextColor }]}>
                  {post.timeAgo}
                </ThemedText>
              </View>
              
              <TouchableOpacity 
                style={styles.moreButton}
                onPress={() => handleMorePress(post.id)}
              >
                <View style={styles.moreDotsContainer}>
                  <View style={[styles.moreDot, { backgroundColor: iconColor }]} />
                  <View style={[styles.moreDot, { backgroundColor: iconColor }]} />
                  <View style={[styles.moreDot, { backgroundColor: iconColor }]} />
                </View>
              </TouchableOpacity>
            </View>

            {/* Post Image (if exists) */}
            {post.postImageUrl && (
              <View style={[styles.postImageContainer, { backgroundColor: postImageBgColor }]}>
                <Image source={{ uri: post.postImageUrl }} style={styles.postImage} />
              </View>
            )}

            {/* Post Description */}
            <View style={styles.postDescriptionContainer}>
              <ThemedText style={[styles.postDescription, { color: textColor }]}>
                {post.description}
              </ThemedText>
            </View>

            {/* Post Actions */}
            <View style={styles.postActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleLikePress(post.id)}
              >
                <IconSymbol name="heart.fill" size={20} color={iconColor} />
                <ThemedText style={[styles.actionText, { color: textColor }]}>
                  {post.likes} me gusta
                </ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleCommentPress(post.id)}
              >
                <IconSymbol name="message.fill" size={20} color={iconColor} />
                <ThemedText style={[styles.actionText, { color: textColor }]}>
                  {post.comments} comentarios
                </ThemedText>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
        
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
    paddingTop: Spacing.small,
    paddingBottom: Spacing.small,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  tabsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabsContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    gap: Spacing.xl,
  },
  tabButton: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 19.6,
    marginBottom: Spacing.xsmall,
  },
  tabIndicator: {
    width: '100%',
    height: 2,
    borderRadius: 1,
  },
  feedContainer: {
    paddingTop: Spacing.large,
    paddingBottom: Spacing.xxxl,
  },
  postContainer: {
    marginBottom: Spacing.xxl,
    paddingHorizontal: Spacing.large,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.medium,
  },
  avatarContainer: {
    marginRight: Spacing.medium,
  },
  avatarBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  postMetaData: {
    flex: 1,
  },
  nameGroupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xsmall,
    marginBottom: 2,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
  },
  groupName: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
  },
  timeAgo: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  moreButton: {
    padding: Spacing.xsmall,
  },
  moreDotsContainer: {
    width: 20,
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  moreDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
  },
  postImageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: Spacing.medium,
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  postDescriptionContainer: {
    marginBottom: Spacing.medium,
  },
  postDescription: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19.6,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.large,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.small,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19.6,
  },
});
