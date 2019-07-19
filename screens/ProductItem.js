import React, { Component, useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableWithoutFeedback,
	Image
} from "react-native";
import { Card } from "react-native-elements";
import Colors from "../constants/Colors";
import Icon from "../services/IconService";
import Layout from "../constants/Layout";
import NavigationService from "../services/NavigationService";
import api, { urlResolve } from "../api/api";
import StorageService from "../services/StorageService";

let { width } = Layout;
const ProductItem = ({ item, horizontal, isFavorite, updateFavorites }) => {
	if (!horizontal) {
		return (
			<TouchableWithoutFeedback
				onPress={() =>
					NavigationService.navigate("Product", {
						item,
						isFavorite,
						updateFavorites
					})
				}
			>
				<View style={{ width: Layout.width / 2 }}>
					<Card
						containerStyle={{
							borderWidth: 0,
							shadowColor: Colors.gray,
							shadowRadius: 5,
							shadowOffset: { width: -5, height: 5 },
							backgroundColor: Colors.lightGray,
							borderRadius: 15,
							padding: 0
						}}
					>
						<Image
							source={{
								uri: urlResolve(item.photo)
							}}
							style={{
								width: (Layout.width - 60) / 2,
								height: (Layout.width - 60) / 2,
								borderRadius: 15
							}}
						/>
					</Card>
					<View style={{ padding: 15 }}>
						<Text
							style={{
								fontSize: 18,
								fontWeight: "bold",
								color: Colors.blue,
								marginBottom: 10
							}}
							numberOfLines={1}
						>
							{item.title}
						</Text>
						<Text
							style={{
								fontSize: 18,
								fontWeight: "bold",
								color: Colors.black
							}}
							numberOfLines={1}
						>
							{item.price}
						</Text>
						<TouchableWithoutFeedback
							onPress={() => {
								StorageService.toggleItem(item);
								updateFavorites();
							}}
						>
							<View
								style={{ flexDirection: "row", paddingTop: 5 }}
							>
								<Icon
									name={isFavorite ? "staro" : "like"}
									size={18}
									color={
										isFavorite ? Colors.pink : Colors.gray
									}
								/>
								<Text
									style={{
										fontSize: 18,
										fontWeight: "100",
										color: Colors.darkGray,
										marginLeft: 8
									}}
								>
									Избранное
								</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	} else {
		return (
			<View
				style={{
					margin: 15,
					marginLeft: 7.5,
					borderRadius: 20,
					backgroundColor: Colors.white,
					padding: 15,
					height: 100,
					width: width - 60
				}}
			>
				<View style={{ flexDirection: "row" }}>
					<Image
						style={{ width: 100, height: 70 }}
						source={{ uri: urlResolve(item.photo) }}
					/>
					<View
						style={{
							flex: 1,
							paddingLeft: 15,
							justifyContent: "space-between"
						}}
					>
						<Text
							style={{ fontWeight: "100", color: Colors.black }}
						>
							{item.title}
						</Text>
						<Text
							style={{ fontWeight: "bold", color: Colors.blue }}
						>
							{item.price}
						</Text>
					</View>
				</View>
			</View>
		);
	}
};

export default ProductItem;
