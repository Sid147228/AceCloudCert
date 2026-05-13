export const theme = {
  colors: {
    background: '#050505',
    surface: '#0B0F14',
    card: '#111827',
    cardMuted: '#172033',
    border: '#263241',
    primary: '#FF8C00',
    primarySoft: '#FFB347',
    text: '#FFFFFF',
    textMuted: '#9CA3AF',
    success: '#22C55E',
    danger: '#EF4444'
  },
  radii: {
    sm: 6,
    md: 8
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 16,
    lg: 20,
    xl: 24
  }
} as const;

export type AppTheme = typeof theme;
