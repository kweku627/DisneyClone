// src/types.ts
export type RootStackParamList = {
  '(tabs)': undefined;
  '+not-found': undefined;
  login: undefined;
  signup: undefined;
  Profile: undefined;
  settings: undefined;
  downloadscreen: undefined;
  watch: { id: string }; // Assuming 'id' for watch screen
};

export type MainTabParamList = {
  Home: undefined;
  Movies: undefined;
  Series: undefined;
  Downloads: undefined;
  Search: undefined;
};