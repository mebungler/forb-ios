import React, { useEffect } from "react";
import { TouchableWithoutFeedback, View, Animated, Easing } from "react-native";
import Icon from "../services/IconService";
import Colors from "../constants/Colors";

const AnimatedButton = ({
	onPress = () => {},
	icon: PropIcon = () => null,
	loading
}) => {
	let rotation = new Animated.Value(0);
	let translateX = new Animated.Value(-12);
	rotateButton = () => {
		Animated.parallel([
			Animated.loop(
				Animated.timing(rotation, {
					toValue: 1,
					duration: 500,
					easing: Easing.linear
				})
			),
			Animated.spring(translateX, { toValue: 48 })
		]).start();
	};

	enableButton = () => {
		Animated.parallel([
			Animated.spring(translateX, {
				toValue: -12
			}),
			Animated.spring(rotation, {
				toValue: 1
			})
		]).start();
	};
	useEffect(() => {
		if (loading) {
			rotateButton();
		} else {
			enableButton();
		}
	}, [loading]);
	let spin = rotation.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"]
	});
	let reverseX = translateX.interpolate({
		inputRange: [-12, 48],
		outputRange: [-48, 12]
	});
	return (
		<TouchableWithoutFeedback {...{ onPress }}>
			<View
				style={{
					justifyContent: "center",
					alignItems: "center"
				}}
			>
				<View
					style={{
						padding: 12,
						backgroundColor: Colors.pink,
						alignItems: "center",
						justifyContent: "center",
						borderRadius: 24,
						width: 48,
						height: 48,
						flexDirection: "row"
					}}
				>
					<Animated.View
						style={{
							transform: [
								{ translateX: reverseX },
								{ rotate: spin }
							]
						}}
					>
						<Icon name={"spin4"} color={Colors.white} size={20} />
					</Animated.View>
					<Animated.View style={{ transform: [{ translateX }] }}>
						<PropIcon />
					</Animated.View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default AnimatedButton;
