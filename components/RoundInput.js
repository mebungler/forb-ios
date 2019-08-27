import React, { Component, PropTypes } from "react";
import {
	View,
	TextInput as Input,
	Dimensions,
	KeyboardAvoidingView,
	Text,
	TouchableWithoutFeedback
} from "react-native";
import { Card } from "react-native-elements";
import Colors from "../constants/Colors";

class RoundInput extends Component {
	state = {
		focused: false,
		iconState: 0,
		placeholder: this.props.placeholder
	};
	renderLeftIcon = () => {
		let { leftIcon: LeftIcon, small, full } = this.props;
		if (!LeftIcon || (small && !full)) {
			return null;
		}
		return <LeftIcon />;
	};
	renderRightIcon = () => {
		let {
			leftIcon: LeftIcon,
			rightIcon: RightIcon,
			successIcon: SuccessIcon,
			small,
			full,
			required
		} = this.props;
		if (required) return <RightIcon />;
		let { focused, iconState } = this.state;
		if ((!RightIcon || iconState === 0 || small) && !full) {
			return null;
		}
		if (iconState === 2) return <SuccessIcon />;
		return <RightIcon />;
	};
	validate = txt => {
		let { email } = this.props;
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (email) return re.test(String(txt).toLowerCase());
		if (txt.length > 4) return true;
		else return false;
	};
	render() {
		let {
			leftIcon: LeftIcon,
			rightIcon: RightIcon,
			style,
			onTextChange = () => {},
			email,
			password,
			simple,
			small,
			value,
			transparent,
			full,
			wider,
			multiline,
			main,
			error,
			name,
			onRightIconPress = () => {},
			required,
			containerStyle,
			...rest
		} = this.props;
		let { placeholder } = this.state;
		let { renderLeftIcon, renderRightIcon, validate } = this;
		let { focused } = this.state;
		let width = Dimensions.get("window").width - 100;
		if (simple) {
			width = Dimensions.get("window").width - 90;
		}
		if (small) {
			width = 50;
		}
		if (full || wider) {
			width = Dimensions.get("window").width - 60;
		}
		if (main) {
			width = Dimensions.get("window").width - 30;
		}
		let renderIcons = (!small || full) && LeftIcon;
		let second = (!simple || full) && RightIcon;
		return (
			<React.Fragment>
				<Card
					wrapperStyle={{
						margin: 0,
						padding: 0,
						justifyContent: "center"
					}}
					containerStyle={[
						{
							backgroundColor: transparent
								? "transparent"
								: "white",
							flexDirection: "row",
							borderWidth: transparent ? 1 : 0,
							borderColor: Colors.white,
							height: small ? 40 : 50,
							borderRadius: 30,
							padding: 0,
							justifyContent: "center",
							width,
							...containerStyle
						},
						small && { margin: 0 },
						full && {
							marginTop: 0,
							paddingTop: 0,
							paddingLeft: 10
						},
						multiline && {
							height: width - 30,
							borderColor: "#c5c5c5",
							shadowOpacity: 1
						},
						wider && { paddingLeft: 0 }
					]}
				>
					<View
						style={[
							{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "center"
							},
							!small && {
								paddingLeft: 20,
								paddingRight: 20
							},
							small && {
								alignItems: "center",
								justifyContent: "center",
								paddingTop: 0
							},
							multiline && { paddingLeft: 0 }
						]}
					>
						{renderIcons && (
							<View
								style={{
									justifyContent: "center",
									alignItems: "center",
									marginTop: full ? 0 : 0,
									width: simple || wider ? 30 : 20
								}}
							>
								{renderLeftIcon()}
							</View>
						)}
						<View
							style={[
								{
									borderBottomColor: "#069627",
									borderColor: "#069627",
									alignItems: "center"
								},
								!small && {
									paddingBottom: 0,
									paddingLeft: 15,
									paddingRight: 15
								},
								simple && {
									width: width - 80
								}
							]}
						>
							<Input
								multiline={multiline}
								placeholder={focused ? "" : placeholder}
								value={value}
								onFocus={() =>
									this.setState({
										...this.state,
										focused: true
									})
								}
								placeholderTextColor={
									transparent
										? Colors.lightGray
										: Colors.black
								}
								style={[
									{ width: simple ? width - 80 : 175 },
									small && { width: 40 },
									full && { width: width - 80, fontSize: 18 },
									{
										color: transparent
											? Colors.white
											: Colors.black
									},
									multiline && {
										height: width - 30
									},
									style
								]}
								onChangeText={e => {
									if (email || password) {
										let valid = validate(e);
										this.setState({
											iconState: valid ? 2 : 1
										});
									}
									onTextChange(name, e);
								}}
								secureTextEntry={password ? true : false}
							/>
						</View>
						{(second || required) && (
							<TouchableWithoutFeedback
								onPress={onRightIconPress}
							>
								<View style={{ alignItems: "flex-end" }}>
									{renderRightIcon()}
								</View>
							</TouchableWithoutFeedback>
						)}
					</View>
				</Card>
				{error && error[name] && (
					<Text
						style={{
							color: Colors.pink,
							marginLeft: 30,
							marginTop: 10
						}}
					>
						{error[name]}
					</Text>
				)}
			</React.Fragment>
		);
	}
}

export default RoundInput;
