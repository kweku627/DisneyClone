import { ThemeProvider } from '../components/ThemeProvider';
import { default as Movies, default as WatchMovie } from './(tabs)';
import SearchScreen from './(tabs)/search_screen';
import ProfileScreen from './Profile'; // ✅ Import your profile screen
import Downloads from './downloadscreen';
import Login from './login';

function App() {
  return (
    <ThemeProvider>
      <Login></Login>
      <ProfileScreen></ProfileScreen>
      {/* <Series></Series> */}
      <SearchScreen></SearchScreen>
      <Downloads></Downloads>
      <WatchMovie></WatchMovie>
      <Movies></Movies>
    </ThemeProvider>
  );
}