import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator, DrawerNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import PlacesScreen from '../screens/PlacesScreen';
import SideMenu from '../components/SideMenu';

const sideNav = DrawerNavigator({
  places: {
      screen: PlacesScreen,
    }
  }, {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 120,
});

export default createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  sideNav: sideNav,
  places: {
    screen: PlacesScreen
  }
}, {
  navigationOptions: ({navigation}) => ({
      title: "Main",
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft:(<TouchableOpacity onPress={() => navigation.navigate("sideNav")}>
                      <Icon name="menu" size={30} />
                    </TouchableOpacity>
        ),
    })
});
