export const COLORS = {
  PRIMARY: '#5D4037', // Brownish primary color
  SECONDARY: '#A1887F', // Muted secondary color
  ACCENT: '#BCAAA4', // Caramel accent
  BACKGROUND: '#1C120F', // Dark background
  SURFACE: '#2C1F1B', // Surface color
  TEXT_PRIMARY: '#EDE7D9', // Light text
  TEXT_SECONDARY: '#BCAAA4', // Muted text
  BORDER: '#4E342E', // Border color
  LIGHTGREY: '#D3D3D3', // Light grey for text
  GREY: '#808080', // Grey for text
  BLUE: '#0092FF', // Blue for links/buttons
  DARK_BLUE: '#1F80E0', // Darker blue for buttons
  BLACK: '#000000', // Pure black
  WHITE: '#FFFFFF', // Pure white
  TRANSPARENT_BLACK: 'rgba(0,0,0,0.7)', // Transparent black for gradients
  TRANSPARENT: 'transparent',
};

export const GRADIENTS = {
  SIGNUP: ['#1A1C29', '#202333', '#1A1C29'],
  LOGIN: [COLORS.BACKGROUND, COLORS.SURFACE, COLORS.BACKGROUND],
  DOWNLOAD_ITEM: [COLORS.TRANSPARENT, COLORS.TRANSPARENT_BLACK],
};

export const FONT_SIZES = {
  SMALL: 12,
  MEDIUM: 14,
  LARGE: 16,
  XLARGE: 18,
  XXLARGE: 20,
  HEADING: 24,
};

export const SPACING = {
  XS: 5,
  SM: 10,
  MD: 15,
  LG: 20,
  XL: 30,
};

export const BORDER_RADIUS = {
  SMALL: 4,
  MEDIUM: 8,
  LARGE: 12,
  XLARGE: 25,
};

export const ICON_SIZES = {
  SMALL: 16,
  MEDIUM: 20,
  LARGE: 24,
  XLARGE: 30,
};

export const SHADOWS = {
  SMALL: {
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  MEDIUM: {
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
};

export const LAYOUT = {
  SCREEN_WIDTH: 0, // Will be set dynamically
  VIDEO_ASPECT_RATIO: 0.5625, // 16:9
};

export const STRINGS = {
  APP_NAME: 'DisneyClone',
  SIGN_IN: 'SIGN IN',
  SIGN_UP: 'SIGN UP',
  AGREE_CONTINUE: 'AGREE & CONTINUE',
  NO_DOWNLOADS: 'No Downloads Yet',
  NO_VIDEO: 'No Video Selected',
};