import React, { useEffect } from "react";
import { TouchableWithoutFeedback, View, Animated, Easing } from "react-native";
import Icon from "../services/IconService";
import Colors from "../constants/Colors";

const CircleButton = ({ status, onPress }) => {
	let rotation = new Animated.Value(0);
	let enable = () =>
		Animated.spring(rotation, {
			toValue: 1,
			useNativeDriver: true
		}).start();
	let rotate = () =>
		Animated.loop(
			Animated.timing(rotation, {
				toValue: 1,
				duration: 500,
				easing: Easing.linear,
				useNativeDriver: true
			})
		).start();
	useEffect(() => {
		if (status === "idle") {
			enable();
		} else {
			rotate();
		}
	});
	let renderIcon = () => {
		if (status === "rotate") {
			return (
				<Animated.View
					style={{
						padding: 12,
						backgroundColor: Colors.pink,
						alignItems: "center",
						justifyContent: "center",
						borderRadius: 24,
						transform: [{ rotate: spin }]
					}}
				>
					<Icon name={"spin4"} color={Colors.white} size={20} />
				</Animated.View>
			);
		}
		if (status === "idle") {
			return (
				<View
					style={{
						padding: 12,
						backgroundColor: Colors.pink,
						alignItems: "center",
						justifyContent: "center",
						borderRadius: 24
					}}
				>
					<Icon
						name={"send-message"}
						color={Colors.white}
						size={20}
					/>
				</View>
			);
		}
	};
	let spin = rotation.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"]
	});
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View
				style={{
					justifyContent: "center",
					alignItems: "center"
				}}
			>
				{renderIcon()}
			</View>
		</TouchableWithoutFeedback>
	);
};

export default CircleButton;
