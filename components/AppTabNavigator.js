import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Header, Icon, Badge } from 'react-native-elements';
import Home from '../screens/Home';
import PlantATree from '../screens/PlantATree';
import MyForestScreen from '../screens/MyForestScreen';
import Settings from '../screens/SettingScreen'


export const AppTabNavigator = createBottomTabNavigator(
  {
    Home: { screen: Home },
    PlantATree: { screen: PlantATree },
    MyForest: { screen: MyForestScreen },
    Settings: {screen: Settings}
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const routeName = navigation.state.routeName;
        if (routeName === 'Home') {
          return (
            <Image
              source={require('../assets/home-icon.png')}
              style={{ width: 20, height: 20 }}
            />
          );
        } else if (routeName === 'PlantATree') {
          return (
            <Image
              source={require('../assets/plant-icon.png')}
              style={{ width: 19, height: 19 }}
            />
          );
        } else if (routeName === 'MyForest') {
          return (
            <Image
              source={require('../assets/forest.png')}
              style={{ width: 20, height: 20 }}
            />
          );
        } else if (routeName === 'Settings'){
            return(
              <Icon
              name="paw"
              type="font-awesome"
              color="#039620"
            />
            )
        }      
      },
    }),
  }
);
