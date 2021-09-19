import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import Home from "../screens/Home";
import NGOeventScreen from "../screens/NGOeventScreen";

export const AppStackNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerShown: false,
      },
    },
    NGOeventScreen: {
      screen: NGOeventScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: "Home",
  }
);
