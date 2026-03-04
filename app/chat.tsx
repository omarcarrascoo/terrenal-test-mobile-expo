import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Spacing, Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'recipient';
  timestamp?: string;
}

const initialMessages: Message[] = [
  { id: '1', text: 'Esta es la plantilla principal de chat', sender: 'user', timestamp: '30 de noviembre de 2023, 9:41 a. m.' },
  { id: '2', text: 'Cómo funciona?', sender: 'recipient' },
  { id: '3', text: 'Genial', sender: 'recipient' },
  { id: '4', text: 'Ah, sí?', sender: 'recipient' },
  { id: '5', text: 'Listo!', sender: 'user' },
  { id: '6', text: 'Solo edita cualquier texto para escribir en la conversación que deseas mostrar y elimina las burbujas que no quieras usar.', sender: 'user' },
  { id: '7', text: 'Consultaré el Centro de ayuda si tengo más preguntas igual', sender: 'recipient' },
  { id: '8', text: 'Creo que entendí', sender: 'recipient' },
  { id: '9', text: 'Mmm', sender: 'recipient' },
];

export default function ChatScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  
  const backgroundColor = useThemeColor({}, 'background');
  const headerBackgroundColor = useThemeColor({}, 'cardBackground');
  const headerBorderColor = useThemeColor({}, 'border');
  const headerTextColor = useThemeColor({}, 'text');
  const headerSubtextColor = useThemeColor({ light: 'rgba(0,0,0,0.5)', dark: 'rgba(255,255,255,0.5)' }, 'text');
  const inputBackgroundColor = useThemeColor({}, 'cardBackground');
  const inputBorderColor = useThemeColor({}, 'border');
  const inputTextColor = useThemeColor({}, 'text');
  const inputPlaceholderColor = useThemeColor({ light: '#828282', dark: '#7a7a7e' }, 'placeholder');
  const iconColor = useThemeColor({ light: '#828282', dark: '#7a7a7e' }, 'placeholder');
  const userBubbleColor = useThemeColor({}, 'text');
  const userBubbleTextColor = useThemeColor({}, 'background');
  const recipientBubbleColor = useThemeColor({ light: '#E9E9EB', dark: '#2a2a2a' }, 'discussCardBg');
  const recipientBubbleTextColor = useThemeColor({}, 'text');
  const timestampColor = useThemeColor({ light: '#828282', dark: '#7a7a7e' }, 'placeholder');
  
  const handleSendMessage = () => {
    if (inputText.trim() === '') return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
    };
    
    setMessages([newMessage, ...messages]);
    setInputText('');
  };
  
  const renderMessageBubble = (message: Message, index: number) => {
    const isUser = message.sender === 'user';
    const showTimestamp = message.timestamp && index === messages.length - 1;
    
    return (
      <View key={message.id}>
        {showTimestamp && (
          <ThemedText style={[styles.timestamp, { color: timestampColor }]}>
            {message.timestamp}
          </ThemedText>
        )}
        
        <View style={[
          styles.messageContainer,
          isUser ? styles.userMessageContainer : styles.recipientMessageContainer,
        ]}>
          {!isUser && (
            <Image
              source={{ uri: 'https://picsum.photos/id/1005/40/40' }}
              style={styles.avatar}
            />
          )}
          
          <View style={[
            styles.messageBubble,
            {
              backgroundColor: isUser ? userBubbleColor : recipientBubbleColor,
              alignSelf: isUser ? 'flex-end' : 'flex-start',
            },
          ]}>
            <ThemedText style={[
              styles.messageText,
              { color: isUser ? userBubbleTextColor : recipientBubbleTextColor },
            ]}>
              {message.text}
            </ThemedText>
          </View>
        </View>
      </View>
    );
  };
  
  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <SafeAreaView style={[styles.headerSafeArea, { backgroundColor: headerBackgroundColor }]}>
        <View style={[styles.header, { borderBottomColor: headerBorderColor }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color={headerTextColor} />
          </TouchableOpacity>
          
          <Image
            source={{ uri: 'https://picsum.photos/id/1005/40/40' }}
            style={styles.headerAvatar}
          />
          
          <View style={styles.headerTextContainer}>
            <ThemedText style={[styles.headerName, { color: headerTextColor }]}>
              Helena Hills
            </ThemedText>
            <ThemedText style={[styles.headerStatus, { color: headerSubtextColor }]}>
              Activo hace 11 minutos
            </ThemedText>
          </View>
          
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.headerIconButton}>
              <IconSymbol name="phone" size={24} color={headerTextColor} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIconButton}>
              <IconSymbol name="video" size={24} color={headerTextColor} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      
      {/* Messages */}
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        inverted
      >
        {messages.map((message, index) => renderMessageBubble(message, index))}
      </ScrollView>
      
      {/* Input Area */}
      <View style={[styles.inputContainer, { paddingBottom: insets.bottom }]}>
        <View style={[
          styles.inputWrapper,
          {
            backgroundColor: inputBackgroundColor,
            borderColor: inputBorderColor,
          },
        ]}>
          <TextInput
            style={[styles.input, { color: inputTextColor }]}
            placeholder="Mensaje..."
            placeholderTextColor={inputPlaceholderColor}
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          
          <View style={styles.inputIcons}>
            <TouchableOpacity style={styles.inputIconButton}>
              <IconSymbol name="image" size={24} color={iconColor} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.inputIconButton}>
              <IconSymbol name="emoji" size={24} color={iconColor} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.inputIconButton} onPress={handleSendMessage}>
              <IconSymbol name="mic" size={24} color={iconColor} />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Home Indicator */}
        <View style={styles.homeIndicatorContainer}>
          <View style={styles.homeIndicator} />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSafeArea: {
    borderBottomWidth: 0.5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.medium,
    height: 60,
  },
  backButton: {
    padding: Spacing.xsmall,
    marginRight: Spacing.medium,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Spacing.medium,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22.4,
  },
  headerStatus: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    marginTop: 2,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.large,
  },
  headerIconButton: {
    padding: Spacing.xsmall,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.large,
    gap: Spacing.small,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.small,
    marginBottom: Spacing.small,
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  recipientMessageContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 18,
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.small,
  },
  messageText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19.6,
  },
  timestamp: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    textAlign: 'center',
    marginVertical: Spacing.medium,
  },
  inputContainer: {
    paddingHorizontal: Spacing.large,
    paddingTop: Spacing.medium,
    paddingBottom: Spacing.small,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.small,
    gap: Spacing.large,
  },
  input: {
    flex: 1,
    fontSize: 14,
    lineHeight: 19.6,
    maxHeight: 100,
  },
  inputIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.medium,
  },
  inputIconButton: {
    padding: Spacing.xsmall,
  },
  homeIndicatorContainer: {
    alignItems: 'center',
    paddingTop: Spacing.small,
  },
  homeIndicator: {
    width: 134,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#000',
  },
});
