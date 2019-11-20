import { createStackNavigator } from 'react-navigation-stack';
import Loading from '../screens/Loading'
import SignUp from '../screens/SignUp';

const AuthNav = createStackNavigator(
    {
    Home: {screen: Loading},
    SignUp: {screen: SignUp},
    },
    {
        headerShown: 'none',
        defaultNavigationOptions: {
            header: null,
            gesturesEnabled: true,
            
        },
    }
)

export default AuthNav;