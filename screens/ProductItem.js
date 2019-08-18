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
import strings from "../localization/Strings";

let { width } = Layout;
const ProductItem = ({
	item,
	horizontal,
	isFavorite,
	updateFavorites,
	full
}) => {
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
							numberOfLines={item.price ? 1 : 2}
						>
							{item.title}
						</Text>
						{item.price && (
							<Text
								style={{
									fontSize: 18,
									fontWeight: "bold",
									color: Colors.black
								}}
								numberOfLines={1}
							>
								{item.price} UZS
							</Text>
						)}
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
									{strings.featured}
								</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	} else {
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
				<View
					style={{
						flexDirection: "row",
						margin: 15,
						marginLeft: 7.5,
						borderRadius: 20,
						backgroundColor: Colors.white,
						padding: 15,
						height: 100,
						width: full ? width - 15 : width - 60,
						marginTop: full ? 5 : 15,
						marginBottom: full ? 5 : 15
					}}
				>
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
					<TouchableWithoutFeedback
						onPress={() => {
							StorageService.toggleItem(item);
							updateFavorites();
						}}
					>
						<Icon
							name={isFavorite ? "staro" : "like"}
							size={18}
							color={isFavorite ? Colors.pink : Colors.gray}
						/>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		);
	}
};

export default ProductItem;
