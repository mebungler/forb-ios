import React, { Component } from "react";
import {
	StyleSheet,
	View,
	SafeAreaView,
	ImageBackground,
	Animated,
	ScrollView,
	Image,
	StatusBar,
	Text,
	TouchableWithoutFeedback
} from "react-native";
import Icon from "../services/IconService";
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";
import NavigationService from "../services/NavigationService";
import LinearGradient from "react-native-linear-gradient";
import Svg from 'react-native-svg'

class ImageHeader extends Component {
	value = new Animated.Value(0);
	render() {
		StatusBar.setBarStyle("dark-content", true);
		let { width, height } = Layout;
		let { images, navigation, title, backgroundColor } = this.props;
		let { value, renderIndicators } = this;
		let color = Colors.white;
		return (
			<View style={{ position: "absolute", width: 200, height: 80 }}>
				<SafeAreaView style={{ backgroundColor: "transparent" }} />
				<View
					style={{
						padding: 15,
						flexDirection: "row",
						justifyContent: "space-between",
						backgroundColor: "transparent"
					}}
				>
					<TouchableWithoutFeedback
						onPress={() => {
							NavigationService.goBack();
						}}
					>
						<View
							style={{
								flex: 0.25,
								backgroundColor: "transparent"
							}}
						>
							<Icon name="arrow-left" size={20} {...{ color }} />
						</View>
					</TouchableWithoutFeedback>
					<View
						style={{
							flex: 0.5,
							alignItems: "center",
							backgroundColor: "transparent"
						}}
					>
						<Text
							style={{
								fontSize: 20,
								fontWeight: "bold",
								color
							}}
						>
							Карточка товара
						</Text>
					</View>
					<View
						style={{
							flex: 0.25,
							flexDirection: "row",
							justifyContent: "space-around",
							backgroundColor: "transparent"
						}}
					>
						<TouchableWithoutFeedback>
							<Icon name="like" size={20} color={color} />
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback>
							<Icon name="menu" size={16} color={color} />
						</TouchableWithoutFeedback>
					</View>
				</View>
			</View>
		);
	}
}

export default ImageHeader;

// LinearGradient
// 				style={{
// 					height: 80,
// 					right: 0,
// 					left: 0,
// 					backgroundColor: "transparent"
// 				}}
// 				start={{ x: 1, y: 0.2 }}
// 				end={{ x: 1, y: 1 }}
// 				colors={[Colors.darkGray, "#ffffff00"]}
// 				LinearGradient
