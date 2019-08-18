import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../constants/Colors";
import NavigationService from "../services/NavigationService";
import RoundButton from "../components/RoundButton";
import strings from "../localization/Strings";

const AuthPrompt = props => {
	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<RoundButton
				onPress={() => NavigationService.navigate("Login")}
				animated
				fill
				color={Colors.blue}
				text={strings.register}
			/>
		</View>
	);
};

export default AuthPrompt;
