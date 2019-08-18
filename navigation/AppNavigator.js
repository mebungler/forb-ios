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
import strings from "../localization/Strings";

const auth = createStackNavigator(
	{
		Login: { screen: Login, navigationOptions: { header: null } },
		Register: {
			screen: Register,
			navigationOptions: {
				header: () => <Header name={strings.companyRegistration} back />
			}
		},
		Prompt: { screen: Prompt, navigationOptions: { header: null } },
		VerifyPhone: {
			screen: VerifyPhone,
			navigationOptions: {
				header: () => <Header name={strings.numberConfirmation} back />
			}
		}
	},
	{ initialRouteName: "Prompt" }
);

export default (createRooNavigator = (isSignedIn = false) => {
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
});
