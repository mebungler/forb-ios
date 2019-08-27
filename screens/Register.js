import React, { Component } from "react";
import {
	StyleSheet,
	ScrollView,
	Text,
	KeyboardAvoidingView,
	View
} from "react-native";
import Colors from "../constants/Colors";
import { CheckBox } from "react-native-elements";
import { FontAwesome as FIcon } from "react-native-vector-icons";
import RoundButton from "../components/RoundButton";
import RoundInput from "../components/RoundInput";
import Icon from "../services/IconService";
import { registerAsync } from "../actions/thunk";
import { connect } from "react-redux";
import NavigationService from "../services/NavigationService";
import api from "../api/api";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { userLoggedIn } from "../actions/actions";
import strings from "../localization/Strings";
import StorageService from "../services/StorageService";

class Register extends Component {
	state = {
		type: "new",
		agree: true,
		status: "idle",
		name: "",
		phone: "",
		email: "",
		organization: "",
		responsible: "",
		address: "",
		city: "",
		branch: "",
		error: {},
		password: "",
		confirmPassword: ""
	};

	validate = txt => {
		let { email } = this.props;
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (email) return re.test(String(txt).toLowerCase());
		if (txt.length > 4) return true;
		else return false;
	};

	onRegister = () => {
		if (Object.keys(this.state.error).length > 0) {
			this.setState({ ...this.state, status: "disabled" });
			return;
		}
		this.setState({ status: "rotate" });
		let {
			phone,
			email,
			password,
			address,
			responsible: responsible_person,
			organization,
			name,
			type
		} = this.state;
		let user = {
			phone,
			email,
			password,
			address,
			responsible_person,
			organization,
			name,
			type
		};
		this.props.dispatch(
			registerAsync({ ...user }, res => {
				console.warn(res.response);
				if (res.status === 200) {
					// api.auth.getCode({ phone: user.phone }).then(response => {
					// 	if (response.status === 200) {
					// 		this.setState({ ...this.state, status: "success" });
					// 		setTimeout(
					// 			() =>
					// 				NavigationService.navigate("VerifyPhone", {
					// 					user_id: res.data.id
					// 				}),
					// 			100
					// 		);
					// 	} else {
					this.setState({ ...this.state, status: "success" });
					setTimeout(
						() =>
							NavigationService.navigate("VerifyPhone", {
								user_id: res.data.id,
								register: data => {
									this.props.dispatch(
										userLoggedIn({
											...data,
											language: StorageService.getState()
												.language
										})
									);
								}
							}),
						100
					);
					// 	}
					// });
				} else {
					this.setState({
						...this.state,
						status: "disabled",
						error: {
							...this.state.errors,
							...res.response.data.errors
						}
					});
				}
			})
		);
	};

	render() {
		let { error } = this.state;
		return (
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={{ backgroundColor: Colors.lightGray }}
			>
				<View
					style={{
						justifyContent: "center",
						padding: 30,
						alingItems: "center"
					}}
				>
					<Text
						style={{
							color: Colors.black,
							marginBottom: 15,
							fontSize: 18,
							textAlign: "center"
						}}
					>
						{strings.willNotBeShared}
					</Text>
					<Text
						style={{
							color: Colors.pink,
							marginBottom: 15,
							fontSize: 18,
							fontWeight: "bold",
							textAlign: "center"
						}}
					>
						{strings.companyType}
					</Text>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							alingItems: "center"
						}}
					>
						<CheckBox
							checked={this.state.type === "new"}
							containerStyle={{
								backgroundColor: "transparent",
								borderWidth: 0,
								padding: 0,
								margin: 0,
								justifyContent: "flex-start"
							}}
							iconType="material-community"
							checkedIcon="circle-slice-8"
							title={strings.new}
							checkedColor={Colors.blue}
							uncheckedIcon="checkbox-blank-circle-outline"
							textStyle={{
								color: Colors.black,
								fontWeight: "400"
							}}
							onPress={() =>
								this.setState({
									...this.state,
									type: "new"
								})
							}
						/>
						<CheckBox
							checked={this.state.type !== "new"}
							containerStyle={{
								backgroundColor: "transparent",
								borderWidth: 0,
								padding: 0,
								margin: 0,
								justifyContent: "flex-start"
							}}
							checkedColor={Colors.blue}
							iconType="material-community"
							checkedIcon="circle-slice-8"
							title={strings.acting}
							uncheckedIcon="checkbox-blank-circle-outline"
							textStyle={{
								color: Colors.black,
								fontWeight: "400"
							}}
							onPress={() =>
								this.setState({
									...this.state,
									type: "old"
								})
							}
						/>
					</View>
					<RoundInput
						error={error}
						onTextChange={(key, val) => {
							this.setState({
								...this.setState,
								[key]: val,
								status: "idle"
							});
						}}
						leftIcon={() => (
							<Icon name="name" size={24} color="#c4c4c4" />
						)}
						simple
						placeholder={strings.name}
						name="name"
						required
						rightIcon={() => (
							<FontAwesome
								name="asterisk"
								size={12}
								color={Colors.pink}
							/>
						)}
					/>
					<RoundInput
						error={error}
						onTextChange={(key, val) =>
							this.setState({
								...this.setState,
								[key]: val,
								status: "idle"
							})
						}
						leftIcon={() => (
							<Icon name="phone-1" size={24} color="#c4c4c4" />
						)}
						simple
						placeholder={"998 99 123 45 67"}
						name="phone"
						keyboardType="phone-pad"
						required
						rightIcon={() => (
							<FontAwesome
								name="asterisk"
								size={12}
								color={Colors.pink}
							/>
						)}
					/>
					<RoundInput
						error={error}
						onTextChange={(key, val) => {
							let isValid = this.validate(val);
							let err = error;
							if (!isValid) {
								err[key] = strings.invalidEmail;
							} else {
								let { email, ...rest } = error;
								err = rest;
							}
							this.setState({
								...this.setState,
								[key]: val,
								status: "idle",
								error: { ...err }
							});
						}}
						leftIcon={() => (
							<Icon name="mail" size={18} color="#c4c4c4" />
						)}
						simple
						placeholder={strings.email}
						name="email"
						keyboardType="email-address"
						required
						rightIcon={() => (
							<FontAwesome
								name="asterisk"
								size={12}
								color={Colors.pink}
							/>
						)}
					/>
					<RoundInput
						error={error}
						onTextChange={(key, val) =>
							this.setState({
								...this.setState,
								[key]: val,
								status: "idle"
							})
						}
						leftIcon={() => (
							<Icon name="lock" size={18} color="#c4c4c4" />
						)}
						simple
						placeholder={strings.password}
						name="password"
						keyboardType="password"
						required
						password
						rightIcon={() => (
							<FontAwesome
								name="asterisk"
								size={12}
								color={Colors.pink}
							/>
						)}
					/>
					<RoundInput
						error={error}
						onTextChange={(key, val) => {
							console.warn(this.state.password);
							let { confirmPassword = "", ...rest } = error;
							this.setState({
								...this.state,
								[key]: val,
								error:
									val !== this.state.password
										? {
												...error,
												confirmPassword:
													strings.passwordsDoNotMatch
										  }
										: { ...rest },
								status: "idle"
							});
						}}
						leftIcon={() => (
							<Icon name="lock" size={18} color="#c4c4c4" />
						)}
						simple
						placeholder={strings.confirmPassword}
						name="confirmPassword"
						keyboardType="password"
						required
						password
						rightIcon={() => (
							<FontAwesome
								name="asterisk"
								size={12}
								color={Colors.pink}
							/>
						)}
					/>
					<RoundInput
						error={error}
						onTextChange={(key, val) =>
							this.setState({
								...this.setState,
								[key]: val,
								status: "idle"
							})
						}
						leftIcon={() => (
							<Icon
								name="organization"
								size={20}
								color="#c4c4c4"
							/>
						)}
						simple
						placeholder={strings.organization}
						name="organization"
						required
						rightIcon={() => (
							<FontAwesome
								name="asterisk"
								size={12}
								color={Colors.pink}
							/>
						)}
					/>
					<RoundInput
						error={error}
						onTextChange={(key, val) =>
							this.setState({
								...this.setState,
								[key]: val,
								status: "idle"
							})
						}
						leftIcon={() => (
							<Icon
								name="responsible-person"
								size={24}
								color="#c4c4c4"
							/>
						)}
						simple
						placeholder={strings.responsiblePerson}
						name="responsible"
					/>
					<RoundInput
						error={error}
						onTextChange={(key, val) =>
							this.setState({
								...this.setState,
								[key]: val,
								status: "idle"
							})
						}
						leftIcon={() => (
							<Icon name="adress" size={24} color="#c4c4c4" />
						)}
						simple
						name="address"
						placeholder={strings.address}
					/>
					<View
						style={{
							justifyContent: "center",
							alingItems: "center",
							flexDirection: "row"
						}}
					>
						<View
							style={{
								height: 4,
								backgroundColor: Colors.blue,
								margin: 15,
								width: 20
							}}
						/>
					</View>
					<Text
						style={{
							fontSize: 18,
							fontWeight: "bold",
							color: Colors.pink,
							textAlign: "center"
						}}
					>
						{strings.i}
					</Text>
					<Text
						style={{
							fontSize: 18,
							fontWeight: "400",
							color: Colors.gray,
							paddingBottom: 15,
							textAlign: "center"
						}}
					>
						{strings.agree}
					</Text>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							alingItems: "center"
						}}
					>
						<CheckBox
							checked={this.state.agree}
							containerStyle={{
								backgroundColor: "transparent",
								borderWidth: 0,
								padding: 0,
								margin: 0,
								justifyContent: "flex-start"
							}}
							checkedColor={Colors.pink}
							iconType="material-community"
							checkedIcon="check-circle"
							uncheckedIcon="checkbox-blank-circle-outline"
							textStyle={{
								color: "black",
								fontWeight: "bold",
								fontSize: 18
							}}
							onPress={() => {
								this.setState({
									agree: !this.state.agree,
									status: !this.state.agree
										? "idle"
										: "disabled"
								});
							}}
						/>
					</View>
					<View
						style={{
							flexDirection: "row",
							alingItems: "center",
							justifyContent: "center"
						}}
					>
						<RoundButton
							status={this.state.status}
							onPress={this.onRegister}
							big
							animated
							fill
							color={Colors.blue}
							text={strings.next}
							disabledIcon={() => (
								<Icon
									name="right-arrow"
									color={Colors.pink}
									size={18}
								/>
							)}
						/>
					</View>
				</View>
			</ScrollView>
		);
	}
}

export default connect(null)(Register);
