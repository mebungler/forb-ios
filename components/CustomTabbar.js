import React, { Component, PropTypes } from "react";
import {
	View,
	StyleSheet,
	Animated,
	TouchableWithoutFeedback
} from "react-native";
import Svg from "react-native-svg";
import Layout from "../constants/Layout";
import * as shape from "d3-shape";
import Gradient from "react-native-linear-gradient";

const height = 64;
let { width, height: h } = Layout.window;
const { Path } = Svg;
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
class CustomTabbar extends Component {
	value = new Animated.Value(-15);
	state = { prevIndex: 0 };
	render() {
		const tabWidth = width / 5 + 60;
		const tab = shape
			.line()
			.x(d => d.x)
			.y(d => d.y)
			.curve(shape.curveBasis)([
			{ x: 0, y: 30 },
			{ x: 30, y: 26 },
			{ x: 50, y: 0 },
			{ x: tabWidth - 50, y: 0 },
			{ x: tabWidth - 30, y: 26 },
			{ x: tabWidth, y: 30 }
		]);
		const d = `${tab}`;

		const { navigation, renderIcon, onTabPress } = this.props;
		const { state } = navigation;
		const actualWidth = width / state.routes.length;
		let { value } = this;
		return (
			<View
				style={{
					height,
					width,

					backgroundColor: "grey",
					borderTopLeftRadius: 30,
					borderTopRightRadius: 30
				}}
			>
				<AnimatedSvg
					style={{
						height: 30,
						backgroundColor: "transparent",
						width: tabWidth,
						position: "absolute",
						transform: [
							{ translateX: value },
							{ translateY: -height + 34 }
						]
					}}
				>
					<Path {...{ d }} fill="blue" stroke="blue" />
				</AnimatedSvg>
				<View
					style={{
						...StyleSheet.absoluteFillObject,
						backgroundColor: "white",
						justifyContent: "center",
						shadowColor: "black",
						shadowOffset: { width: -5, height: -5 },
						shadowRadius: 50,
						backgroundColor: "grey",
						borderTopLeftRadius: 30,
						borderTopRightRadius: 30
					}}
				>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-evenly"
						}}
					>
						{state.routes.map((route, key) => {
							const focused = key === navigation.state.index;
							const scene = { route, focused };
							return (
								<TouchableWithoutFeedback
									onPress={() => {
										onTabPress({ route });
										Animated.spring(value, {
											toValue: -width + actualWidth * key,
											useNativeDriver: true
										}).start();
										console.warn("WTF");
									}}
									{...{ key }}
								>
									{renderIcon(scene)}
								</TouchableWithoutFeedback>
							);
						})}
					</View>
				</View>
			</View>
		);
	}
}

export default CustomTabbar;
