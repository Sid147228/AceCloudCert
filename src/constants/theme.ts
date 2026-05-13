export const theme = {
  colors: {
    background: '#0B1220',
    surface: '#111827',
    card: '#1F2937',
    cardMuted: '#273449',
    border: '#2D3748',
    primary: '#FF8C00',
    primarySoft: '#FFB347',
    accentBlue: '#38BDF8',
    text: '#FFFFFF',
    textMuted: '#9CA3AF',
    success: '#22C55E',
    danger: '#EF4444',
    overlay: 'rgba(11, 18, 32, 0.76)'
  },
  typography: {
    display: {
      fontSize: 34,
      lineHeight: 40,
      fontWeight: '900'
    },
    h1: {
      fontSize: 28,
      lineHeight: 34,
      fontWeight: '900'
    },
    h2: {
      fontSize: 22,
      lineHeight: 28,
      fontWeight: '800'
    },
    body: {
      fontSize: 14,
      lineHeight: 21,
      fontWeight: '400'
    },
    caption: {
      fontSize: 12,
      lineHeight: 18,
      fontWeight: '700'
    }
  },
  radii: {
    sm: 6,
    md: 8,
    lg: 12
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32
  },
  shadows: {
    card: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.22,
      shadowRadius: 18,
      elevation: 4
    }
  }
} as const;

export type AppTheme = typeof theme;
