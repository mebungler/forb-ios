import React from "react";
import {
	createAppContainer,
	createSwitchNavigator,
	createStackNavigator
} from "react-navigation";
import Login from "../screens/Login";
import Register from "../screens/Register";
import MainTabNavigator from "./MainTabNavigator";
import Header from "../components/Header";
import Ads from "../screens/Ads";
import StorageService from "../services/StorageService";
import Prompt from "../screens/Prompt";
import VerifyPhone from "../screens/VerifyPhone";

const auth = createStackNavigator(
	{
		Login: { screen: Login, navigationOptions: { header: null } },
		Register: {
			screen: Register,
			navigationOptions: {
				header: () => <Header name="Регистрация компании" back />
			}
		},
		Prompt: { screen: Prompt, navigationOptions: { header: null } },
		VerifyPhone: {
			screen: VerifyPhone,
			navigationOptions: {
				header: () => <Header name="Подтверждения номера" back />
			}
		}
	},
	{ initialRouteName: "Prompt" }
);

export default createRooNavigator = (isSignedIn = false) => {
	return createAppContainer(
		createSwitchNavigator(
			{
				auth: auth,
				Main: {
					screen: MainTabNavigator,
					navigationOptions: {
						header: null
					}
				}
			},
			{
				initialRouteName: isSignedIn ? "Main" : "auth"
			}
		)
	);
};
