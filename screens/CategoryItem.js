import React from "react";

import { View, Image, Text, TouchableWithoutFeedback } from "react-native";
import Layout from "../constants/Layout";
import { urlResolve } from "../api/api";
import NavigationService from "../services/NavigationService";
let { width } = Layout;

const CategoryItem = ({ item }) => {
	return (
		<TouchableWithoutFeedback
			onPress={() =>
				NavigationService.navigate("Subcategories", { item })
			}
		>
			<View
				style={{
					width: (width - 30) / 3,
					height: 100,
					padding: 15,
					paddingLeft: 0,
					paddingRight: 0,
					alignItems: "center",
					justifyContent: "center"
				}}
			>
				<Image
					style={{ width: 64, height: 64 }}
					source={{ uri: urlResolve(item.photo) }}
				/>
				<Text
					style={{
						marginTop: 15,
						fontWeight: "100",
						textAlign: "center",
						fontSize: 10
					}}
				>
					{item.name}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default CategoryItem;
