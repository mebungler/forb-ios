import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../constants/Colors";
import NavigationService from "../services/NavigationService";
import RoundButton from "../components/RoundButton";

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
				text="Зарегистрируйтесь"
			/>
		</View>
	);
};

export default AuthPrompt;

// <RoundButton
// 			onPress={() => NavigationService.navigate("Login")}
// 			animated
// 			fill
// 			color={Colors.blue}
// 			text="Войдите"
// 		/>
// 		<Text
// 			style={{ marginBottom: 0, color: Colors.black, marginTop: 30 }}
// 		>
// 			или
// 		</Text>
