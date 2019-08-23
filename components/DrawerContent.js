import React, { Component } from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableWithoutFeedback,
	SafeAreaView,
	Image,
	Linking
} from "react-native";

import { connect } from "react-redux";
import { userLoggedOut, userLoggedIn } from "../actions/actions";
import {
	populateCategories,
	populateServices,
	populateCities
} from "../actions/thunk";

import Icon from "../services/IconService";
import NavigationService from "../services/NavigationService";
import StorageService from "../services/StorageService";

import Colors from "../constants/Colors";

import DrawerItem from "./DrawerItem";

import api, { urlResolve } from "../api/api";

import logo from "../assets/images/logo.png";
import strings from "../localization/Strings";

class DrawerContent extends Component {
	state = { phone: "+998 99 111 11 11", source: "" };

	changeLanguage = language => {
		strings.setLanguage(language);
		this.props.dispatch(
			userLoggedIn({ ...this.props.user, language: language })
		);
		this.props.dispatch(
			populateCategories(() =>
				this.props.dispatch(populateServices(() => populateCities()))
			)
		);
	};

	componentDidMount() {
		api.main.phone().then(res => {
			this.setState({ ...this.state, phone: res.data.data.content });
			api.main.oferta().then(res => {
				console.warn(res.data.data);
				this.setState({ ...this.state, source: res.data.data.content });
			});
		});
	}

	render() {
		let { chats, user } = this.props;
		let isAuthorized = Object.keys(user).length > 1;
		if (!isAuthorized) {
			user = StorageService.getState();
			isAuthorized = Object.keys(user).length > 1;
		}
		let count = 0;
		let lang = user.language;
		if (!lang || lang === "") {
			StorageService.setState({ ...user, language: "ru" });
			this.props.dispatch(userLoggedIn(StorageService.getState()));
		}
		chats.map(e => (count += e.messages));
		return (
			<>
				<View style={{ paddingTop: 20, backgroundColor: Colors.blue }}>
					<SafeAreaView />
					{isAuthorized ? (
						<View>
							<View style={{ alignItems: "center" }}>
								<View
									style={{
										width: 100,
										height: 100,
										backgroundColor: Colors.white,
										justifyContent: "center",
										alignItems: "center",
										marginBottom: 15,
										borderRadius: 50
									}}
								>
									<Image
										source={{ uri: urlResolve(user.photo) }}
										style={{
											borderRadius: 45,
											width: 90,
											height: 90
										}}
									/>
								</View>
							</View>
							<View
								style={{
									alignItems: "flex-start",
									paddingLeft: 30,
									paddingBottom: 30
								}}
							>
								<Text
									style={{
										color: Colors.white,
										fontSize: 24,
										fontWeight: "bold"
									}}
								>
									{user.name}
								</Text>
								<Text
									style={{
										color: Colors.lightBlue,
										fontSize: 16,
										fontWeight: "bold"
									}}
								>
									{user.company && user.company.organization}
								</Text>
							</View>
						</View>
					) : (
						<View style={{ alignItems: "center" }}>
							<View
								style={{
									width: 100,
									height: 100,
									backgroundColor: Colors.white,
									justifyContent: "center",
									alignItems: "center",
									marginBottom: 15,
									borderRadius: 50
								}}
							>
								<Image
									source={logo}
									style={{
										borderRadius: 45,
										width: 90,
										height: 90
									}}
								/>
							</View>
						</View>
					)}

					<DrawerItem
						text={strings.messages}
						iconName="chat"
						notifications={count}
						onPress={() => {
							NavigationService.toggleDrawer();
							NavigationService.navigate("Chats");
						}}
					/>

					<DrawerItem
						text={strings.featured}
						iconName="like"
						onPress={() => {
							NavigationService.toggleDrawer();
							NavigationService.navigate("Favorites");
						}}
					/>
					<DrawerItem
						text={strings.myPage}
						iconName="name"
						onPress={() => {
							NavigationService.toggleDrawer();
							NavigationService.navigate("Account");
						}}
					/>
					<DrawerItem
						text={strings.services}
						iconName="organization"
						onPress={() => {
							NavigationService.toggleDrawer();
							NavigationService.navigate("Services");
						}}
					/>
					<DrawerItem
						text={strings.tariffs}
						iconName="wallet"
						onPress={() => {
							NavigationService.toggleDrawer();
							NavigationService.navigate("Payment");
						}}
					/>
					<DrawerItem
						text={strings.oferta}
						iconName="text-document"
						onPress={() => {
							NavigationService.toggleDrawer();
							NavigationService.navigate("WebView", {
								source: this.state.source,
								title: strings.oferta
							});
						}}
					/>
					<DrawerItem
						text={
							this.state.phone.indexOf("+") === -1
								? `+${this.state.phone}`
								: this.state.phone
						}
						iconName="seller"
						onPress={() => {
							Linking.openURL(
								`tel:${
									this.state.phone.indexOf("+") === -1
										? `+${this.state.phone}`
										: this.state.phone
								}`
							);
						}}
					/>
				</View>
				<View
					style={{
						flex: 1,
						justifyContent: "flex-end",
						padding: 15,
						paddingLeft: 0,
						backgroundColor: Colors.blue
					}}
				>
					<View
						style={{
							flexDirection: "row",
							paddingBottom: 0,
							justifyContent: "space-around",
							paddingLeft: 30,
							paddingRight: 30
						}}
					>
						<TouchableWithoutFeedback
							onPress={() => this.changeLanguage("ru")}
						>
							<View
								style={{
									backgroundColor:
										lang === "ru"
											? Colors.pink
											: Colors.blue,
									padding: 10,
									margin: 10,
									borderRadius: 5
								}}
							>
								<Text
									style={{
										fontWeight: "bold",
										color: Colors.white,
										fontSize: 18
									}}
								>
									ru
								</Text>
							</View>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback
							onPress={() => this.changeLanguage("uz")}
						>
							<View
								style={{
									backgroundColor:
										lang === "uz"
											? Colors.pink
											: Colors.blue,
									padding: 10,
									margin: 10,
									borderRadius: 5
								}}
							>
								<Text
									style={{
										fontWeight: "bold",
										color: Colors.white,
										fontSize: 18
									}}
								>
									uz
								</Text>
							</View>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback
							onPress={() => this.changeLanguage("en")}
						>
							<View
								style={{
									backgroundColor:
										lang === "en"
											? Colors.pink
											: Colors.blue,
									padding: 10,
									margin: 10,
									borderRadius: 5
								}}
							>
								<Text
									style={{
										fontWeight: "bold",
										color: Colors.white,
										fontSize: 18
									}}
								>
									en
								</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>
					{isAuthorized && (
						<DrawerItem
							text={strings.logOut}
							iconName="logout"
							onPress={() => {
								NavigationService.toggleDrawer();
								this.props.dispatch(userLoggedOut());
							}}
						/>
					)}
				</View>
			</>
		);
	}
}

const mapStateToProps = ({ chats, user }) => ({ chats, user });

export default connect(mapStateToProps)(DrawerContent);
