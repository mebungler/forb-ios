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
		error: null
	};
	onRegister = () => {
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
			responsible: responsible_person,
			organization,
			name,
			type
		};
		this.props.dispatch(
			registerAsync({ ...user }, res => {
				if (res.status === 200) {
					api.auth.getCode({ phone: user.phone }).then(response => {
						if (response.status === 200) {
							this.setState({ ...this.state, status: "success" });
							setTimeout(
								() =>
									NavigationService.navigate("VerifyPhone", {
										user_id: res.data.id
									}),
								100
							);
						} else {
							this.setState({
								...this.state,
								status: "idle",
								error: { phone: res.data.message }
							});
						}
					});
				} else {
					this.setState({
						...this.state,
						status: "idle",
						error: res.data.errors
					});
				}
			})
		);
	};

	render() {
		let { error } = this.state;
		return (
			<KeyboardAvoidingView>
				<ScrollView showsVerticalScrollIndicator={false}>
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
							Ваши личные данные и данные компании не будет
							передаваться третьым лицам
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
							Выберите тип компании
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
								title="Новая"
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
								title="Действующая"
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
								this.setState({ ...this.setState, [key]: val });
							}}
							leftIcon={() => (
								<Icon name="name" size={24} color="#c4c4c4" />
							)}
							simple
							placeholder="Имя / Компания"
							name="name"
						/>
						<RoundInput
							error={error}
							onTextChange={(key, val) =>
								this.setState({ ...this.setState, [key]: val })
							}
							leftIcon={() => (
								<Icon
									name="phone-1"
									size={24}
									color="#c4c4c4"
								/>
							)}
							simple
							placeholder={"998 99 123 45 67"}
							name="phone"
							keyboardType="phone-pad"
						/>
						<RoundInput
							error={error}
							onTextChange={(key, val) =>
								this.setState({ ...this.setState, [key]: val })
							}
							leftIcon={() => (
								<Icon name="mail" size={18} color="#c4c4c4" />
							)}
							simple
							placeholder="Почта (e-mail)"
							name="email"
							keyboardType="email-address"
						/>
						<RoundInput
							error={error}
							onTextChange={(key, val) =>
								this.setState({ ...this.setState, [key]: val })
							}
							leftIcon={() => (
								<Icon
									name="organization"
									size={20}
									color="#c4c4c4"
								/>
							)}
							simple
							placeholder="Организация"
							name="organization"
						/>
						<RoundInput
							error={error}
							onTextChange={(key, val) =>
								this.setState({ ...this.setState, [key]: val })
							}
							leftIcon={() => (
								<Icon
									name="responsible-person"
									size={24}
									color="#c4c4c4"
								/>
							)}
							simple
							placeholder="Ответственное лицо"
							name="responsible"
						/>
						<RoundInput
							error={error}
							onTextChange={(key, val) =>
								this.setState({ ...this.setState, [key]: val })
							}
							leftIcon={() => (
								<Icon name="adress" size={24} color="#c4c4c4" />
							)}
							simple
							name="address"
							placeholder="Адрес"
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
							Согласен с условиями
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
							пользования и с условиями конфиленциальности
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
								text="Дальше"
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
			</KeyboardAvoidingView>
		);
	}
}

export default connect(null)(Register);

// <Text
// 							style={{
// 								fontWeight: "bold",
// 								fontSize: 20,
// 								paddingTop: 15,
// 								paddingBottom: 15,
// 								color: Colors.black,
// 								textAlign: "center"
// 							}}
// 						>
// 							Социалные сети
// 						</Text>
// 						<Text
// 							style={{
// 								fontWeight: "100",
// 								paddingTop: 15,
// 								paddingBottom: 15,
// 								color: Colors.black,
// 								textAlign: "center"
// 							}}
// 						>
// 							Дабавьте аккаунты ваших социалных сетей и
// 							используйте их при авторизации
// 						</Text>
// 						<View
// 							style={{
// 								flexDirection: "row",
// 								paddingTop: 15,
// 								justifyContent: "center"
// 							}}
// 						>
// 							<FIcon
// 								style={{ margin: 2 }}
// 								size={40}
// 								name="facebook-square"
// 							/>
// 							<FIcon
// 								style={{ margin: 2 }}
// 								size={40}
// 								name="google-plus-square"
// 							/>
// 							<FIcon
// 								style={{ margin: 2 }}
// 								size={40}
// 								name="twitter-square"
// 							/>
// 						</View>
