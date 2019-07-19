import React, { useState } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Text
} from "react-native";
import NavigationService from "./services/NavigationService";
import createNavigator from "./navigation/AppNavigator";

import StorageService from "./services/StorageService";

import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

import { routeChange, userLoggedIn } from "./actions/actions";

const store = configureStore();

export default class App extends React.Component {
  state = { isLoading: true };
  async componentDidMount() {
    await StorageService.initialize();
    this.setState({ isLoading: false });
  }
  render() {
    let AppNavigator = createNavigator(
      Object.keys(StorageService.getState()).length > 0
    );
    if (Object.keys(StorageService.getState()).length > 0) {
      store.dispatch(userLoggedIn(StorageService.getState()));
    }
    return (
      <View style={{ flex: 1 }}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <Provider store={store}>
          <AppNavigator
            onNavigationStateChange={(prevState, currentState, action) => {
              const currentScreen = NavigationService.getActiveRouteName(
                currentState
              );
              const prevScreen = NavigationService.getActiveRouteName(
                prevState
              );
              if (prevScreen !== currentScreen) {
                store.dispatch(routeChange({ name: currentScreen }));
              }
            }}
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
