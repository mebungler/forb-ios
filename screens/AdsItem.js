import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Image,
	Animated,
	Easing,
	TouchableWithoutFeedback,
	Alert
} from "react-native";
import Icon from "../services/IconService";
import Colors from "../constants/Colors";
import { urlResolve } from "../api/api";
import NavigationService from "../services/NavigationService";
import strings from "../localization/Strings";
import RoundButton from "../components/RoundButton";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AnimatedButton from "../components/AnimatedButton";
import api from "../api/api";

const AdsItem = ({ item, isActive, index }) => {
	const translateX = new Animated.Value(200);
	let val = new Animated.Value(0);
	let [loading, setLoading] = useState(false);
	useEffect(() => {
		Animated.timing(translateX, {
			toValue: 0,
			easing: Easing.linear,
			duration: 200,
			delay: 100 * index
		}).start();
	}, []);
	let opacity = translateX.interpolate({
		inputRange: [0, 200],
		outputRange: [1, 0]
	});
	let remove = () => {
		setLoading(true);
		api.product.remove(item.id).then(res => {
			console.warn(res.data);
			setLoading(false);
		});
	};
	let alert = () => {
		Alert.alert(strings.attention, strings.removePrompt, [
			{ text: strings.cancel, style: "cancel" },
			{ text: strings.yes, onPress: remove }
		]);
	};
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				// NavigationService.navigate("EditAds", { item, isActive });
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
				<View style={{ flexDirection: "row", flexShrink: 1 }}>
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
							numberOfLines={3}
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
							<View style={{ justifyContent: "center" }}>
								<Text
									style={{
										marginLeft: 8,
										fontWeight: "100",
										fontSize: 12
									}}
								>
									{item.views}
								</Text>
							</View>
						</View>
					</View>
					<View
						style={{
							alignItems: "flex-end",
							justifyContent: "space-between",
							flex: 1
						}}
					>
						<View
							style={{
								borderRadius: 30,
								backgroundColor: Colors.blue,
								padding: 10
							}}
						>
							<Text style={{ color: Colors.white }}>
								{strings.update}
							</Text>
						</View>
						<AnimatedButton
							{...{
								loading,
								icon: () => (
									<FontAwesome
										name="trash-o"
										color={Colors.white}
										size={20}
									/>
								),
								onPress: alert
							}}
						/>
					</View>
				</View>
			</Animated.View>
		</TouchableWithoutFeedback>
	);
};

export default AdsItem;
