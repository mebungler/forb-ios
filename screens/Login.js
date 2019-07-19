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
import Feather from "react-native-vector-icons/Feather";
import { loginAsync } from "../actions/thunk";
import { connect } from "react-redux";
import NavigationService from "../services/NavigationService";
import StorageService from "../services/StorageService";

class Login extends React.Component {
	state = {
		phone: "",
		password: "",
		status: "idle",
		error: "",
		remember: true
	};
	login = () => {
		let { phone, password } = this.state;
		console.warn(phone);
		if (phone === "" || password === "") {
			this.setState({
				...this.state,
				error: { phone: "Заполните поле" }
			});
			return;
		}
		this.setState({ ...this.state, status: "rotate" });
		this.props.dispatch(
			loginAsync({ phone, password }, res => {
				if (res.status === 200) {
					NavigationService.navigate("Main");
					setTimeout(
						() => this.setState({ ...this.state, status: "idle" }),
						200
					);
				} else {
					this.setState({
						...this.state,
						error: res.data.errors,
						status: "idle"
					});
				}
			})
		);
	};
	render() {
		let { navigation } = this.props;
		let { error } = this.state;
		return (
			<ImageBackground style={styles.container} source={LoginBackground}>
				<SafeAreaView />
				<View>
					<View
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center"
						}}
					>
						<Image
							source={Logo}
							style={{ width: 120, height: 120 }}
						/>
						<RoundInput
							transparent
							onTextChange={(key, val) => {
								console.warn(val);
								this.setState({
									...this.state,
									[key]: val,
									error: ""
								});
							}}
							leftIcon={() => (
								<Icon
									name="phone-1"
									size={16}
									color={Colors.white}
								/>
							)}
							textContentType="telephoneNumber"
							placeholder="+998991234567"
							rightIcon={() => (
								<Feather
									name="x"
									size={18}
									color={Colors.white}
								/>
							)}
							successIcon={() => (
								<Feather name="check" color={Colors.white} />
							)}
							name="phone"
							keyboardType="phone-pad"
						/>
						<RoundInput
							transparent
							onTextChange={(key, val) =>
								this.setState({
									...this.state,
									[key]: val,
									error: ""
								})
							}
							password
							leftIcon={() => (
								<Icon
									name="lock"
									size={18}
									color={Colors.white}
								/>
							)}
							textContentType="password"
							placeholder="**********"
							rightIcon={() => (
								<Feather
									name="x"
									size={18}
									color={Colors.white}
								/>
							)}
							successIcon={() => (
								<Feather
									name="check"
									size={18}
									color={Colors.white}
								/>
							)}
						/>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								paddingTop: 15
							}}
						>
							<CheckBox
								checked={this.state.remember}
								containerStyle={{
									backgroundColor: "transparent",
									borderWidth: 0,
									padding: 0,
									margin: 0,
									justifyContent: "flex-start"
								}}
								checkedColor={Colors.pink}
								iconType="material-community"
								checkedIcon="circle-slice-8"
								title="Запомнить"
								unchackedColor={Colors.pink}
								uncheckedIcon={"checkbox-blank-circle-outline"}
								textStyle={{
									color: Colors.white,
									fontWeight: "400"
								}}
								onPress={() =>
									this.setState({
										...this.state,
										remember: !this.state.remember
									})
								}
							/>
							<View style={{ justifyContent: "center" }}>
								<Text
									style={{
										color: Colors.white,
										fontWeight: "bold"
									}}
								>
									Забыли пароль?
								</Text>
							</View>
						</View>
						<RoundButton
							status={this.state.status}
							fill
							text="Войти"
							bold
							color={Colors.white}
							animated
							big
							onPress={this.login}
						/>
						{this.state.error !== "" && (
							<React.Fragment>
								<Text
									style={{
										color: Colors.pink,
										fontSize: 16,
										marginTop: 15
									}}
								>
									{this.state.error.email}
								</Text>
								<Text
									style={{
										color: Colors.pink,
										fontSize: 16
									}}
								>
									{this.state.error.password}
								</Text>
							</React.Fragment>
						)}
					</View>
					<View
						style={{
							paddingBottom: 30,
							alignItems: "center"
						}}
					>
						<Text style={{ color: Colors.white }}>
							Все еще нет аккаунта?
						</Text>
						<Text
							style={{
								textDecorationLine: "underline",
								fontWeight: "bold",
								lineHeight: 30,
								color: Colors.white
							}}
							onPress={() => {
								navigation.navigate("Register");
							}}
						>
							Регистрация
						</Text>
					</View>
					<View style={{ alignItems: "center" }}>
						<Text
							style={{
								textDecorationLine: "underline",
								fontWeight: "bold",
								lineHeight: 30,
								color: Colors.white
							}}
							onPress={() => {
								navigation.navigate("Main");
							}}
						>
							Войдите без регистрации
						</Text>
					</View>
					<Text
						style={{
							padding: 15,
							fontWeight: "100",
							paddingBottom: 30,
							color: Colors.white,
							textAlign: "center"
						}}
					>
						Входя в раздел Мой пофил, вы принимаете Условия
						использования приложения
					</Text>
				</View>
			</ImageBackground>
		);
	}
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Login);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.lightGray,
		justifyContent: "center",
		alignItems: "center"
	}
});
