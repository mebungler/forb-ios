import React from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import Icon from "../services/IconService";
import Colors from "../constants/Colors";
import NavigationService from "../services/NavigationService";

const Subcategory = ({ item, onPress }) => {
	return (
		<TouchableWithoutFeedback onPress={() => onPress(item.id)}>
			<View style={{ flexDirection: "row", padding: 15 }}>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						paddingRight: 15
					}}
				>
					<Text style={{ fontWeight: "bold", fontSize: 16 }}>
						{item.name}
					</Text>
				</View>
				<Icon
					name="arrow-left"
					color={Colors.black}
					size={18}
					style={{ transform: [{ rotate: "180deg" }] }}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default Subcategory;
