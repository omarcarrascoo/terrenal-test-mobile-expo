import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#f8f8f8', // Soft off-white for a modern background
    cardBackground: '#ffffff', // Pure white for cards, for contrast
    primary: tintColorLight, // Main accent color
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    shadow: 'rgba(0,0,0,0.08)', // Soft shadow for depth
    placeholder: '#8e8e93', // Muted placeholder text color
  },
  dark: {
    text: '#ECEDEE',
    background: '#0a0a0a', // Deep dark background
    cardBackground: '#1c1c1c', // Slightly lighter dark for cards
    primary: tintColorDark, // Main accent color
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    shadow: 'rgba(255,255,255,0.03)', // Subtle shadow in dark mode
    placeholder: '#7a7a7e', // Muted placeholder text color
  },
};

export const Spacing = {
  xsmall: 4,
  small: 8,
  medium: 12,
  large: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
