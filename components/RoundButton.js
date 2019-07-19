import React, { PropTypes } from "react";
import {
	TouchableWithoutFeedback,
	Text,
	View,
	Animated,
	Easing
} from "react-native";
import NamedIcon from "../services/IconService";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";

const { width } = Layout;

export default class RoundButton extends React.Component {
	animatedWidth = this.props.large ? width - 60 : 200;
	value = new Animated.Value(this.animatedWidth);
	rotation = new Animated.Value(0);
	componentDidUpdate() {
		let { status = "idle" } = this.props;
		switch (status) {
			case "idle":
				this.enable();
				break;
			case "rotate":
				this.rotate();
				break;
			case "disabled":
				this.disable();
				break;
			case "success":
				this.success();
				break;
		}
	}
	renderLeftIcon = () => {
		let { icon: Icon, left } = this.props;
		if (!left || !Icon) return;
		return <Icon />;
	};
	renderRightIcon = () => {
		let { icon: Icon, left } = this.props;
		if (left || !Icon) return;
		return <Icon />;
	};
	renderText = () => {
		let {
			color,
			text,
			fill,
			wide,
			left = null,
			icon: Icon,
			big,
			status = "idle",
			animated,
			bold,
			large,
			reverseTransparent
		} = this.props;
		if (status !== "idle") return;
		let _color = fill ? "white" : color;
		if (left) {
			_color = "black";
		}
		let _marginRight = 0;
		let _marginLeft = 0;
		if (left) _marginLeft = 10;
		if (!left) _marginRight = 10;
		if (text && Icon && !left) _marginRight = 10;
		if (text && Icon && left) _marginLeft = 10;
		if (!Icon || !text) {
			_marginRight = 0;
			_marginLeft = 0;
		}
		let _fontSize = wide || big ? 18 : 14;
		_fontSize = large && 22;
		return (
			<Text
				style={{
					color:
						color === "#fff" && !reverseTransparent
							? Colors.blue
							: _color,
					marginRight: _marginRight,
					fontSize: _fontSize,
					fontWeight: bold ? "bold" : "400"
				}}
			>
				{text}
			</Text>
		);
	};
	success = () => {
		Animated.spring(this.rotation, {
			toValue: 1
		}).start();
	};
	rotate = () => {
		Animated.parallel([
			Animated.spring(this.value, {
				toValue: 50
			}),
			Animated.loop(
				Animated.timing(this.rotation, {
					toValue: 1,
					duration: 500,
					easing: Easing.linear
				})
			)
		]).start();
	};
	disable = () => {
		Animated.parallel([
			Animated.spring(this.value, {
				toValue: 50
			}),
			Animated.timing(this.rotation, {
				toValue: 0.75
			})
		]).start();
	};
	enable = () => {
		Animated.parallel([
			Animated.spring(this.value, {
				toValue: this.animatedWidth
			}),
			Animated.timing(this.rotation, {
				toValue: 0
			})
		]).start();
	};
	onPress = () => {
		let { onPress = () => {}, animated, status = "idle" } = this.props;
		if (status === "disabled") return;
		if (!animated) {
			onPress();
			return;
		}
		onPress();
	};
	render() {
		let {
			color,
			text,
			icon: Icon,
			fill,
			style,
			wide,
			fillSize,
			left,
			animated,
			large,
			medium,
			transparent,
			status = "idle",
			disabledIcon: DisabledIcon
		} = this.props;
		let { value, onPress } = this;
		let spin = this.rotation.interpolate({
			inputRange: [0, 1],
			outputRange: ["0deg", "360deg"]
		});
		return (
			<TouchableWithoutFeedback {...{ onPress }}>
				<Animated.View
					style={[
						{
							borderRadius: wide ? 30 : 20,
							borderWidth: 1,
							borderColor: color,
							backgroundColor: fill ? color : "transparent",
							height: 40,
							padding: !text ? 0 : 10,
							paddingRight: 20,
							paddingLeft: 20,
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center"
						},
						style,
						fill
							? {
									shodowColor: "black",
									shadowOpacity: 0.33,
									shadowOffset: { width: 5, height: 5 }
							  }
							: {},
						wide ? { flex: 1 } : {},
						animated
							? {
									width: value,
									height: 50,
									marginTop: 30,
									borderRadius: 25
							  }
							: {},
						status === "rotate" ? { padding: 0, margin: 0 } : {},
						large && {
							height: 60,
							borderRadius: 40,
							paddingLeft: 50,
							paddingRight: 50
						},
						medium && {
							height: 50,
							borderRadius: 25
						},
						fillSize && {
							flex: 1,
							margin: 7.5,
							paddingTop: 10,
							paddingBottom: 10
						}
					]}
				>
					{status === "rotate" && (
						<Animated.View
							style={{
								transform: [
									{
										rotate: (status = "rotate"
											? spin
											: "0deg")
									}
								],
								marginLeft: -8,
								marginRight: -8
							}}
						>
							<NamedIcon
								name={"spin4"}
								color={
									transparent ||
									color === "white" ||
									color === "#fff" ||
									color === "#ffffff"
										? Colors.blue
										: Colors.white
								}
								size={16}
							/>
						</Animated.View>
					)}
					{status === "success" && (
						<View style={{ marginLeft: -8, marginRight: -8 }}>
							<NamedIcon
								name={"ok"}
								color={transparent ? Colors.blue : "white"}
								size={16}
							/>
						</View>
					)}
					{status === "disabled" && (
						<Animated.View
							style={{
								transform: [
									{
										rotate: spin
									}
								],
								marginLeft: -8,
								marginRight: -8
							}}
						>
							<DisabledIcon />
						</Animated.View>
					)}
					{(status !== "rotate" || status !== "disabled") && (
						<React.Fragment>
							{this.renderLeftIcon()}
							{this.renderText()}
							{this.renderRightIcon()}
						</React.Fragment>
					)}
				</Animated.View>
			</TouchableWithoutFeedback>
		);
	}
}
