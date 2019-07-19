import React from "react";
import {
	View,
	Text,
	Image,
	TouchableWithoutFeedback,
	Linking
} from "react-native";
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";
import { urlResolve } from "../api/api";

let { width } = Layout;

const ServiceItem = ({ item }) => {
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				if (item.link.indexOf("http") === -1) {
					Linking.openURL("http://" + item.link);
				}
			}}
		>
			<View
				style={{
					width: width / 2 - 22.5,
					shadowColor: Colors.gray,
					shadowOpacity: 1,
					shadowOffset: { width: 2, height: 2 },
					borderRadius: 15,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: Colors.white,
					margin: 7.5,
					paddingTop: 10
				}}
			>
				<Image
					source={{ uri: urlResolve(item.photo) }}
					style={{
						width: 100,
						height: 100
					}}
				/>
				<Text
					style={{
						marginTop: 10,
						color: Colors.blue,
						textAlign: "center",
						marginBottom: 15,
						paddingLeft: 5,
						paddingRight: 5
					}}
				>
					{item.name}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default ServiceItem;
