import React from "react";
import {
	View,
	StyleSheet,
	ImageBackground,
	Image,
	KeyboardAvoidingView,
	Text,
	SafeAreaView
} from "react-native";
import Header from "../components/Header";
import Colors from "../constants/Colors";
import LoginBackground from "../assets/images/Login.png";
import Logo from "../assets/images/logo.png";
import RoundInput from "../components/RoundInput";
import RoundButton from "../components/RoundButton";
import { CheckBox } from "react-native-elements";
import Icon from "../services/IconService";
import { Feather } from "react-native-vector-icons";
import { loginAsync } from "../actions/thunk";
import { connect } from "react-redux";
import NavigationService from "../services/NavigationService";
import strings from "../localization/Strings";
import StorageService from "../services/StorageService";

class Prompt extends React.Component {
	render() {
		let { navigation } = this.props;
		return (
			<ImageBackground style={styles.container} source={LoginBackground}>
				<SafeAreaView />
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center"
					}}
				>
					<Image source={Logo} style={{ width: 120, height: 120 }} />
					<Text
						style={{
							marginTop: 30,
							marginBottom: 30,
							color: Colors.white,
							fontSize: 18
						}}
					>
						{strings.welcome}
					</Text>
					<View style={{ paddingLeft: 30, paddingRight: 30 }}>
						<RoundButton
							onPress={() => navigation.navigate("Main")}
							color={Colors.white}
							reverseTransparent
							big
							bold
							medium
							text={strings.withoutRegistration}
						/>
						<RoundButton
							onPress={() => navigation.navigate("Login")}
							fill
							color={Colors.white}
							text={strings.checkIn}
							style={{ marginTop: 30 }}
							big
							medium
							bold
						/>
					</View>
				</View>
			</ImageBackground>
		);
	}
}

export default Prompt;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.lightGray,
		justifyContent: "center",
		alignItems: "center"
	}
});
