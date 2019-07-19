import React, { Component } from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableWithoutFeedback,
	SafeAreaView,
	Image
} from "react-native";

import { connect } from "react-redux";
import { userLoggedOut } from "../actions/actions";

import Icon from "../services/IconService";
import NavigationService from "../services/NavigationService";
import StorageService from "../services/StorageService";

import Colors from "../constants/Colors";

import DrawerItem from "./DrawerItem";

import { urlResolve } from "../api/api";

import logo from "../assets/images/logo.png";

class DrawerContent extends Component {
	render() {
		let user = StorageService.getState();
		let isAuthorized = Object.keys(user).length > 0;
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
						text="Сообщения"
						iconName="chat"
						onPress={() => {
							NavigationService.toggleDrawer();
							NavigationService.navigate("Chats");
						}}
					/>

					<DrawerItem
						text="Избранные"
						iconName="like"
						onPress={() => {
							NavigationService.toggleDrawer();
							NavigationService.navigate("Favorites");
						}}
					/>
					<DrawerItem
						text="Моя страница"
						iconName="name"
						onPress={() => {
							NavigationService.toggleDrawer();
							NavigationService.navigate("Account");
						}}
					/>
					<DrawerItem
						text="Сервисы"
						iconName="organization"
						onPress={() => {
							NavigationService.toggleDrawer();
							NavigationService.navigate("Services");
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
					{isAuthorized && (
						<DrawerItem
							text="Выход"
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

export default connect(null)(DrawerContent);

// <DrawerItem
// 						text="Регистрация фирмы"
// 						iconName="register"
// 						onPress={() => {
// 							NavigationService.toggleDrawer();
// 						}}
// 					/>
// <DrawerItem
// 	text="Дабавить объявление"
// 	iconName="plus_ad"
// 	onPress={() => {
// 		NavigationService.toggleDrawer();
// 		NavigationService.navigate("AddProduct");
// 	}}
// />
// <DrawerItem
// 						text="Оплата"
// 						iconName="payment"
// 						onPress={() => {
// 							NavigationService.toggleDrawer();
// 							NavigationService.navigate("Payment");
// 						}}
// 					/>
// 					<DrawerItem
// 						text="Статистика"
// 						iconName="statistics"
// 						onPress={() => {
// 							NavigationService.toggleDrawer();
// 							NavigationService.navigate("Statistics");
// 						}}
// 					/>
// 					<DrawerItem
// 						text="Мои объявления"
// 						iconName="ads"
// 						onPress={() => {
// 							NavigationService.toggleDrawer();
// 							NavigationService.navigate("Ads");
// 						}}
// 					/>
