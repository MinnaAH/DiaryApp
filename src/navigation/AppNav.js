import {createStackNavigator} from 'react-navigation-stack';
import Frontpage from '../screens/Frontpage';
import Content from '../screens/Content';
import AddText from '../screens/AddText';
import AddImage from '../screens/AddImage';

const AppNavigation = createStackNavigator(
    {
        Home: {screen: Frontpage},
        Content: {screen: Content},
        AddText:{screen: AddText},
        AddImage:{screen: AddImage}
    },
    {
        headerShown: 'none',
        defaultNavigationOptions: {
            header: null,
            gesturesEnabled: true,
            
        },
    }
  )
  export default AppNavigation