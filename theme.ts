interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
}

interface ThemeConfig {
  light: Theme;
  dark: Theme;
}

const theme: ThemeConfig = {
  light: {
    primary: '#3E2723', // Espresso Brown for brand elements
    secondary: '#D7CCC8', // Latte Beige for secondary buttons/highlights
    accent: '#8D6E63', // Mocha for CTAs like play buttons
    background: '#FAF3E0', // Creamy Off-White for main background
    surface: '#FFFFFF', // White for cards/modals
    textPrimary: '#212121', // Dark Gray for readable text
    textSecondary: '#5D4037', // Medium Brown for secondary text
    border: '#E0E0E0', // Light Gray for dividers
  },
  dark: {
    primary: '#5D4037', // Dark Roast for dark mode contrast
    secondary: '#A1887F', // Light Mocha for highlights
    accent: '#BCAAA4', // Caramel for CTAs
    background: '#1C120F', // Black Coffee for main background
    surface: '#2C1F1B', // Dark Espresso for cards
    textPrimary: '#EDE7D9', // Creamy White for readable text
    textSecondary: '#BCAAA4', // Caramel for secondary text
    border: '#4E342E', // Deep Brown for dividers
  },
};

export { Theme, theme };
export default theme;