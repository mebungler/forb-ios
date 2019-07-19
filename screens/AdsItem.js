import React, { useEffect } from "react";
import {
	View,
	Text,
	Image,
	Animated,
	Easing,
	TouchableWithoutFeedback
} from "react-native";
import Icon from "../services/IconService";
import Colors from "../constants/Colors";
import { urlResolve } from "../api/api";
import NavigationService from "../services/NavigationService";

const AdsItem = ({ item, isActive, index }) => {
	const translateX = new Animated.Value(200);
	useEffect(() => {
		Animated.timing(translateX, {
			toValue: 0,
			easing: Easing.linear,
			duration: 200,
			delay: 100 * index
		}).start();
	});
	let opacity = translateX.interpolate({
		inputRange: [0, 200],
		outputRange: [1, 0]
	});
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				NavigationService.navigate("EditAds", { item, isActive });
			}}
		>
			<Animated.View
				style={{
					shadowOpacity: 1,
					shadowColor: Colors.gray,
					shadowRadius: 2,
					borderRadius: 15,
					shadowOffset: { height: 5 },
					padding: 15,
					backgroundColor: Colors.white,
					margin: 7.5,
					transform: [{ translateX }],
					opacity
				}}
			>
				{isActive && (
					<Text
						style={{
							fontWeight: "100",
							color: Colors.darkGray,
							marginBottom: 10
						}}
					>
						{item.date}
					</Text>
				)}
				<View style={{ flexDirection: "row" }}>
					<Image
						source={{ uri: urlResolve(item.photo) }}
						style={{
							width: 100,
							height: 100,
							borderRadius: 15
						}}
					/>
					<View
						style={{
							paddingLeft: 15,
							justifyContent: "space-between",
							flexShrink: 1
						}}
					>
						<Text
							numberOfLines={2}
							style={{
								fontWeight: "bold",
								color: Colors.blue,
								fontSize: 18,
								marginBottom: 10,
								flexShrink: 1,
								flex: 1
							}}
						>
							{item.title}
						</Text>
						<Text
							style={{
								fontWeight: "bold",
								fontSize: 18,
								color: Colors.black
							}}
						>
							{item.price}
						</Text>
						<View style={{ flexDirection: "row" }}>
							<Icon
								name="seen"
								size={12}
								color={Colors.darkGray}
							/>
							<Text
								style={{
									marginLeft: 8,
									fontWeight: "100",
									fontSize: 12
								}}
							>
								{item.views}
							</Text>
							<Text
								style={{
									fontWeight: "bold",
									color: Colors.black,
									fontSize: 12
								}}
							>
								{item.moreViews}
							</Text>
						</View>
					</View>
				</View>
			</Animated.View>
		</TouchableWithoutFeedback>
	);
};

export default AdsItem;
