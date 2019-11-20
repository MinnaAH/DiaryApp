import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import AuthNav from './navigation/AuthNav';
import AppNav from './navigation/AppNav';


const SwitchNavigator = createSwitchNavigator(
  {
    Auth: AuthNav,
    App: AppNav,
  },
  {
    headerShown: 'none',
    defaultNavigationOptions: {
        header: null,
        gesturesEnabled: true,
        
    },
}
);

const AppContainer = createAppContainer(SwitchNavigator)
export default AppContainer