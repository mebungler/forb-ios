import React from "react";
import Gradient from "react-native-linear-gradient";
import {
	View,
	Dimensions,
	Animated,
	StyleSheet,
	TouchableWithoutFeedback,
	TextInput,
	KeyboardAvoidingView,
	Easing
} from "react-native";
import Svg, { Path } from "react-native-svg";
import * as shape from "d3-shape";
import Colors from "../constants/Colors";
import Icon from "../services/IconService";
import ChatRoutes from "../constants/ChatRoutes";
import NavigationService from "../services/NavigationService";
import api from "../api/api";
import { populateChats } from "../actions/thunk";
import { messagesLoaded } from "../actions/actions";
import { connect } from "react-redux";

const { width, height: h } = Dimensions.get("window");
const height = 64;
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export class TabBarComponent extends React.Component {
	value = new Animated.Value(-30);
	rotation = new Animated.Value(0);
	translateX = new Animated.Value(-12);
	values = [];
	constructor(props) {
		super(props);
		const { navigation } = this.props;
		const tabWidth = width / navigation.state.routes.length;
		this.values = navigation.state.routes.map(
			(tab, index) => new Animated.Value(index === 2 ? 1 : 0)
		);
		this.value.setValue(-30 + navigation.state.index * tabWidth);
	}

	state = { text: "", status: "idle" };

	rotateButton = () => {
		this.setState({ ...this.state, status: "rotate" }, () =>
			Animated.parallel([
				Animated.loop(
					Animated.timing(this.rotation, {
						toValue: 1,
						duration: 500,
						easing: Easing.linear
					})
				),
				Animated.spring(this.translateX, { toValue: 48 })
			]).start()
		);
	};

	enableButton = () => {
		this.setState({ ...this.state, status: "idle" }, () =>
			Animated.parallel([
				Animated.spring(this.translateX, {
					toValue: -12
				}),
				Animated.spring(this.rotation, {
					toValue: 1
				})
			]).start()
		);
	};

	sendMessage = () => {
		if (this.state.text === "" || this.state.status !== "idle") {
			return;
		}
		this.rotateButton();
		api.chat
			.send({
				getter_id: this.props.route.getter_id,
				message: this.state.text
			})
			.then(res => {
				this.props.dispatch(messagesLoaded(res.data.data));
				setTimeout(() => this.enableButton(), 1000);
			});
		this.setState({ ...this.state, text: "" });
		NavigationService.navigate("ChatsTab");
	};

	componentDidUpdate(prevProps, prevState) {
		const { route: activeRoute, authenticated } = this.props;
		const tabWidth = width / this.props.navigation.state.routes.length;
		let { values, value } = this;
		values.map((a, i) => {
			a.setValue(0);
		});
		let activeValue = values[this.props.navigation.state.index];
		Animated.parallel([
			Animated.spring(activeValue, {
				toValue: 1,
				useNativeDriver: true
			}),
			Animated.spring(value, {
				toValue: -30 + tabWidth * this.props.navigation.state.index,
				useNativeDriver: true
			})
		]).start();
	}

	componentDidMount() {
		const tabWidth = width / this.props.navigation.state.routes.length;
		let { values, value } = this;
		values.map((a, i) => {
			a.setValue(0);
		});
		let activeValue = values[this.props.navigation.state.index];
		Animated.parallel([
			Animated.spring(activeValue, {
				toValue: 1,
				useNativeDriver: true
			}),
			Animated.spring(value, {
				toValue: -30 + tabWidth * this.props.navigation.state.index,
				useNativeDriver: true
			})
		]).start();
	}

	render() {
		const { value, values, sendMessage, translateX } = this;
		const { navigation, renderIcon, onTabPress } = this.props;
		const { state } = navigation;
		const tabWidth = width / navigation.state.routes.length;
		const { route: activeRoute, authenticated } = this.props;
		let spin = this.rotation.interpolate({
			inputRange: [0, 1],
			outputRange: ["0deg", "360deg"]
		});
		let reverseX = this.translateX.interpolate({
			inputRange: [-12, 48],
			outputRange: [-48, 12]
		});
		if (ChatRoutes[activeRoute.name] && authenticated) {
			return (
				<KeyboardAvoidingView>
					<Gradient
						style={{
							position: "absolute",
							right: 0,
							left: 0,
							top: -height + 30,
							height: 40,
							transform: [{ rotate: "180deg" }]
						}}
						colors={[Colors.gray, "#ffffff00"]}
					/>
					<View
						style={{
							paddingLeft: 25,
							paddingRight: 15,
							flexDirection: "row",
							borderTopLeftRadius: 20,
							borderTopRightRadius: 20,
							height,
							alignItems: "center",
							backgroundColor: Colors.white
						}}
					>
						<Icon name="phone-1" color={Colors.black} size={22} />
						<View
							style={{
								flex: 1,
								paddingLeft: 10,
								paddingRight: 10
							}}
						>
							<TextInput
								value={this.state.text}
								onChangeText={e =>
									this.setState({ ...this.state, text: e })
								}
								placeholder="Напишите сообщение"
							/>
						</View>
						<TouchableWithoutFeedback onPress={sendMessage}>
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
										<Icon
											name={"spin4"}
											color={Colors.white}
											size={20}
										/>
									</Animated.View>
									<Animated.View
										style={{ transform: [{ translateX }] }}
									>
										<Icon
											name={"send-message"}
											color={Colors.white}
											size={20}
										/>
									</Animated.View>
								</View>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</KeyboardAvoidingView>
			);
		}
		const tab = shape
			.line()
			.x(d => d.x)
			.y(d => d.y)
			.curve(shape.curveBasis)([
			{ x: 0, y: 30 },
			{ x: 30, y: 26 },
			{ x: 50, y: 0 },
			{ x: tabWidth + 60 - 50, y: 0 },
			{ x: tabWidth + 60 - 30, y: 26 },
			{ x: tabWidth + 60, y: 30 }
		]);
		const d = `${tab}`;
		return (
			<View style={{ width, height }}>
				<Gradient
					style={{
						position: "relative",
						right: 0,
						left: 0,
						top: -height + 26,
						height: 40,
						transform: [{ rotate: "180deg" }]
					}}
					colors={[Colors.gray, "#ffffff00"]}
				/>
				<AnimatedSvg
					style={{
						height: 30,
						backgroundColor: "transparent",
						width: tabWidth + 60,
						position: "absolute",
						transform: [
							{ translateX: value },
							{ translateY: -height / 2 + 10 }
						]
					}}
				>
					<Path {...{ d }} fill="white" stroke="white" />
				</AnimatedSvg>
				<View style={StyleSheet.absoluteFill}>
					<View style={{ flexDirection: "row" }}>
						{state.routes.map((route, key) => {
							const focused = key === navigation.state.index;
							const scene = { route, focused };
							const activeValue = values[key];
							const translateY = activeValue.interpolate({
								inputRange: [0, 1],
								outputRange: [32, 10]
							});
							const reverseOpacity = activeValue.interpolate({
								inputRange: [0, 1],
								outputRange: [1, 0]
							});
							return (
								<React.Fragment {...{ key }}>
									<TouchableWithoutFeedback
										key={route.key}
										onPress={() => {
											onTabPress({ route });
										}}
									>
										<Animated.View
											style={{
												flex: 1,
												justifyContent: "center",
												alignItems: "center",
												height: 64,
												opacity: reverseOpacity
											}}
										>
											{renderIcon(scene)}
										</Animated.View>
									</TouchableWithoutFeedback>

									{focused && (
										<Animated.View
											style={{
												position: "absolute",
												width: tabWidth,
												left: tabWidth * key,
												height: 64,
												top: -30,
												justifyContent: "center",
												alignItems: "center",
												transform: [{ translateY }],
												opacity: activeValue
											}}
										>
											<View
												style={{
													justifyContent: "center",
													alignItems: "center",
													width: 55,
													height: 55,
													borderRadius: 30,
													backgroundColor: Colors.pink
												}}
											>
												{renderIcon(scene)}
											</View>
										</Animated.View>
									)}
								</React.Fragment>
							);
						})}
					</View>
				</View>
			</View>
		);
	}
}

const mapStateToProps = ({ route, user }) => ({
	route,
	authenticated: Object.keys(user).length > 0
});

export default connect(mapStateToProps)(TabBarComponent);
