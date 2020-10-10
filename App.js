import React from 'react';
import { StyleSheet, View, Text, StatusBar, Alert, TouchableHighlight  } from "react-native";
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from "axios";
import PropTypes from "prop-types";
import ViewMap from './src/map/viewMap';
import Weather from './src/weather/weather';


export default class extends React.Component {
  render() {
    const Stack = createStackNavigator();
    //return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} city={city} region={region} navigation={navigation} />;
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Weather" headerMode="none">
          <Stack.Screen name="ViewMap" component={ViewMap} />
          <Stack.Screen name="Weather" component={Weather} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}