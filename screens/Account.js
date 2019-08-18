import React, { Component } from "react";
import {
	StyleSheet,
	ScrollView,
	Image,
	View,
	TouchableWithoutFeedback,
	Text
} from "react-native";
import { Card } from "react-native-elements";
import Icon from "../services/IconService";
import Colors from "../constants/Colors";
import DefaultText from "../components/DefaultText";
import { FontAwesome as FIcon } from "react-native-vector-icons";
import RoundButton from "../components/RoundButton";
import Border from "../components/Border";
import { connect } from "react-redux";
import { urlResolve } from "../api/api";
import StorageService from "../services/StorageService";
import NavigationService from "../services/NavigationService";
import Layout from "../constants/Layout";
import AuthPrompt from "../components/AuthPrompt";
import { userEditing, userLoggedIn } from "../actions/actions";
import api from "../api/api";
const { width } = Layout;
import strings from "../localization/Strings";

class Account extends Component {
	state = { marginTop: 0, status: "idle" };
	update = () => {
		this.setState({ ...this.state, status: "rotate" });
		let { name, phone, photo, position, email } = this.props.user;
		let {
			organization,
			responsible_person,
			address
		} = this.props.user.company;
		let data = {
			name,
			phone,
			photo,
			email,
			organization,
			responsible_person,
			address
		};
		api.user.update(data).then(res => {
			this.props.dispatch(
				userLoggedIn({
					...res.data,
					language: StorageService.getState().language
				})
			);
			this.setState({ ...this.state, status: "idle" });
		});
	};
	render() {
		let { marginTop, status } = this.state;
		let { user } = this.props;
		let { company = {} } = user;
		return (
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={{
					backgroundColor: Colors.lightGray,
					padding: 15
				}}
			>
				<View
					onLayout={({ nativeEvent }) => {
						if (marginTop === 0)
							this.setState({
								marginTop: nativeEvent.layout.height
							});
					}}
					style={{
						borderRadius: 20,
						backgroundColor: "white",
						shodowColor: Colors.gray,
						shadowRadius: 5,
						shadowOffset: { width: 0, height: 5 },
						shadowOpacity: 0.33,
						padding: 15,
						justifyContent: "center",
						paddingTop: 80,
						paddingBottom: 30,
						zIndex: -999,
						marginTop: 80
					}}
				>
					<View style={{ alignItems: "center" }}>
						<View
							style={{
								flex: 1,
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								paddingBottom: 10
							}}
						>
							<View style={{ flex: 0.2 }} />
							<View
								style={{
									alignItems: "center",
									flex: 1,
									justifyContent: "space-between"
								}}
							>
								<Text
									style={{
										fontSize: 18,
										fontWeight: "bold",
										color: Colors.black
									}}
								>
									{user.name}
								</Text>
								<Text
									style={{
										color: Colors.darkGray,
										fontWeight: "100",
										fontSize: 14
									}}
								>
									{company && company.organization}
								</Text>
							</View>
							<View style={{ flex: 0.2 }}>
								<Icon
									name="penciledit"
									size={18}
									color={Colors.black}
								/>
							</View>
						</View>
						<Icon
							name="phone-1"
							size={20}
							color={Colors.darkGray}
						/>
						<Text
							style={{
								fontWeight: "bold",
								fontSize: 18,
								color: Colors.darkGray,
								margin: 10
							}}
						>
							{user.phone}
						</Text>
						<Icon name="mail" size={20} color={Colors.darkGray} />
						<Text
							style={{
								fontWeight: "bold",
								fontSize: 18,
								color: Colors.blue,
								margin: 10
							}}
						>
							{user.email}
						</Text>
					</View>
				</View>
				<View
					style={{
						alignItems: "center",
						marginTop: -marginTop - 50,
						zIndex: 2
					}}
				>
					<View
						style={{
							backgroundColor: Colors.lightGray,
							borderRadius: 60,
							padding: 10
						}}
					>
						<Image
							source={{
								uri: urlResolve(user.photo)
							}}
							style={{
								height: 100,
								width: 100,
								overflow: "hidden",
								borderRadius: 50
							}}
						/>
					</View>
					{false && (
						<TouchableWithoutFeedback onPress={() => {}}>
							<View
								style={{
									height: 30,
									width: 30,
									borderRadius: 15,
									backgroundColor: Colors.pink,
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "row",
									marginTop: -105,
									marginLeft: 70
								}}
							>
								<Icon name="change-photo" color="white" />
							</View>
						</TouchableWithoutFeedback>
					)}
				</View>

				<View
					style={{
						marginTop: marginTop + 15,
						alignItems: "center",
						paddingBottom: 100,
						flex: 1
					}}
				>
					<TouchableWithoutFeedback
						onPress={() => NavigationService.navigate("Ads")}
					>
						<View
							style={{
								flexDirection: "row",
								width: width - 30,
								paddingTop: 15,
								paddingBottom: 15,
								paddingLeft: 15
							}}
						>
							<View style={{ flex: 0.2 }}>
								<Icon
									name="ads"
									size={25}
									color={Colors.blue}
								/>
							</View>
							<View style={{ flex: 1 }}>
								<Text
									style={{
										marginLeft: 10,
										color: Colors.blue,
										fontSize: 24
									}}
								>
									{strings.myAnnouncements}
								</Text>
							</View>
						</View>
					</TouchableWithoutFeedback>
					<DefaultText
						onChange={text =>
							this.props.dispatch(
								userEditing({
									...user,
									company: {
										...company,
										organization: text
									}
								})
							)
						}
						tag="organization"
						editable
						style={{ right: 0, left: 0 }}
						text={company && company.organization}
						name={strings.organization}
						icon={() => (
							<Icon
								name="organization"
								size={18}
								color={Colors.darkGray}
							/>
						)}
						editIcon={() => (
							<Icon
								name="penciledit"
								size={18}
								color={Colors.black}
							/>
						)}
					/>
					<Border />
					<DefaultText
						onChange={text =>
							this.props.dispatch(
								userEditing({
									...user,
									company: {
										...company,
										responsible_person: text
									}
								})
							)
						}
						tag="responsible_person"
						editable
						style={{ right: 0, left: 0 }}
						text={company && company.responsible_person}
						name={strings.responsiblePerson}
						icon={() => (
							<Icon
								name="responsible-person"
								size={22}
								color={Colors.darkGray}
							/>
						)}
						editIcon={() => (
							<Icon
								name="penciledit"
								size={18}
								color={Colors.black}
							/>
						)}
					/>
					<Border />
					<DefaultText
						onChange={text =>
							this.props.dispatch(
								userEditing({
									...user,
									company: {
										...company,
										address: text
									}
								})
							)
						}
						tag="address"
						editable
						style={{ right: 0, left: 0 }}
						text={company && company.address}
						name={strings.address}
						icon={() => (
							<Icon
								name="adress"
								size={22}
								color={Colors.darkGray}
							/>
						)}
						editIcon={() => (
							<Icon
								name="penciledit"
								size={18}
								color={Colors.black}
							/>
						)}
					/>
					<RoundButton
						fill
						color={Colors.blue}
						text={strings.saveSettings}
						medium
						big
						bold
						animated
						status={status}
						onPress={this.update}
					/>
				</View>
			</ScrollView>
		);
	}
}

const MainView = ({ authenticated, user, dispatch }) => {
	if (authenticated) {
		return <Account {...{ user, dispatch }} />;
	}
	return <AuthPrompt />;
};

const mapStateToProps = ({ user }) => {
	if (Object.keys(user).length <= 1) {
		return {
			user: StorageService.getState(),
			authenticated: Object.keys(StorageService.getState()).length > 1
		};
	}
	return { user, authenticated: true };
};

export default connect(mapStateToProps)(MainView);
