// Import
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Import for routes
import Main from './components/Main';
import Chat from './components/Chat';

// Create Navigator Routes
const AppNavigator = createStackNavigator({
    Main: {
        screen: Main,
    },
    Chat: {
        screen: Chat,
    },
});

export default createAppContainer(AppNavigator);