
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Index from "../view/index"
import Play from "../view/play/index"
import Classify from "../view/classify/index"
import Search from "../view/search/index"
const AppNavigator = createStackNavigator({
    Index: {
        screen: Index,
        // navigationOption:{
        //     headerTitle:"首页"
        // }
    },
    Play: {
        screen: Play,
        // navigationOption:{
        //     headerTitle:"首页"
        // }
    },
    Classify: {
        screen: Classify,
        // navigationOption:{
        //     headerTitle:"首页"
        // }
    },
    Search: {
        screen: Search,
        // navigationOption:{
        //     headerTitle:"首页"
        // }
    },
}, {
        initialRouteName: 'Index',
});

export default createAppContainer(AppNavigator);
