import React, { PropTypes } from "react";
import {
	View,
	Text,
	Dimensions,
	TouchableWithoutFeedback,
	StatusBar,
	Image,
	SafeAreaView,
	Platform
} from "react-native";
import Icon from "../services/IconService";
import NavigationService from "../services/NavigationService";
import Colors from "../constants/Colors";
import RoundInput from "./RoundInput";
const { width } = Dimensions.get("window");
import { urlResolve } from "../api/api";
import Picker from "react-native-picker-select";

export class ListHeaderComponent extends React.Component {
	render() {
		let { search = () => {}, openModal = () => {} } = this.props;
		return (
			<React.Fragment>
				<RoundInput
					full
					main
					simple
					small
					leftIcon={() => (
						<Icon name="search" color={Colors.black} size={20} />
					)}
					rightIcon={() => (
						<Icon name="filtr" color={Colors.black} size={20} />
					)}
					onSubmitEditing={({ nativeEvent }) =>
						search(nativeEvent.text)
					}
					onRightIconPress={openModal}
					returnKeyType="search"
				/>
			</React.Fragment>
		);
	}
}

export class Header extends React.Component {
	state = { marginTop: 0 };
	outsiderWidth = this.props.user ? 60 : 20;
	renderMain = () => {
		return (
			<View style={{ flexDirection: "row" }}>
				<Icon name="menu" color={Colors.white} size={14} />
				<Icon name="menu" color={Colors.white} size={14} />
			</View>
		);
	};
	renderLeft = () => {
		let {
			user,
			openDrawer = () => {
				NavigationService.toggleDrawer();
			},
			back,
			main
		} = this.props;
		if (!back) {
			return <View />;
		}
		if (!user)
			return (
				<TouchableWithoutFeedback
					onPress={() => NavigationService.goBack()}
				>
					<Icon size={20} name="arrow-left" color="white" />
				</TouchableWithoutFeedback>
			);
		return (
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<TouchableWithoutFeedback
					onPress={() => NavigationService.goBack()}
				>
					<Icon size={20} name="arrow-left" color="white" />
				</TouchableWithoutFeedback>
				<View>
					<View
						style={{
							borderRadius: 60,
							justifyContent: "center",
							alignItems: "center",
							overflow: "hidden",
							marginLeft: 15,
							backgroundColor: Colors.white
						}}
					>
						<Image
							source={{
								uri: urlResolve(user.photo)
							}}
							style={{
								height: 60,
								width: 60,
								overflow: "hidden"
							}}
						/>
					</View>
					{user.online && (
						<View
							style={{
								justifyContent: "flex-end",
								alignItems: "flex-end"
							}}
						>
							<View
								style={{
									height: 16,
									width: 16,
									borderRadius: 10,
									backgroundColor: Colors.white,
									justifyContent: "center",
									alignItems: "center",
									marginTop: -30,
									marginRight: 4
								}}
							/>
						</View>
					)}
				</View>
			</View>
		);
	};
	renderDescription = () => {
		let { description } = this.props;
		return (
			<Text
				style={{
					color: "white",
					fontSize: 18,
					fontWeight: "100"
				}}
			>
				{description}
			</Text>
		);
	};
	renderRight = () => {
		let {
			openDrawer = () => {
				NavigationService.toggleDrawer();
			},
			main
		} = this.props;
		if (main)
			return (
				<View
					style={{
						flexDirection: "row",
						justifyContent: "flex-end",
						paddingBottom: 5
					}}
				>
					<Picker
						hideIcon={true}
						placeholder={{ value: null, label: "Выберите город" }}
						items={this.props.cities}
						onValueChange={(val, id) => {
							this.props.pickCity(val);
						}}
					>
						<Icon
							size={20}
							style={{ marginLeft: 25 }}
							name="map-marker"
							color="white"
						/>
					</Picker>
					<TouchableWithoutFeedback
						onPress={() => {
							NavigationService.toggleDrawer();
						}}
					>
						<Icon
							size={14}
							style={{ marginLeft: 25 }}
							name="menu"
							color="white"
						/>
					</TouchableWithoutFeedback>
				</View>
			);
		return (
			<TouchableWithoutFeedback
				onPress={() => {
					NavigationService.toggleDrawer();
				}}
			>
				<Icon size={14} name="menu" color="white" />
			</TouchableWithoutFeedback>
		);
	};
	render() {
		let { marginTop } = this.state;
		let {
			name,
			description,
			back,
			main,
			white,
			midSize,
			user,
			clickable,
			transparent,
			search,
			openModal
		} = this.props;
		let paddingBottom = !user ? 30 : 15;
		if (main) paddingBottom = 5;
		return (
			<>
				<View>
					<View
						style={{
							shadowColor: Colors.blue,
							shadowOpacity: 0.66,
							shadowRadius: 5,
							shadowOffset: { width: 0, height: 5 },
							backgroundColor: Colors.blue,
							padding: 15,
							paddingBottom,
							borderBottomLeftRadius: 30,
							borderBottomRightRadius: 30,
							elavation: 20,
							paddingTop: Platform.OS === "android" ? 0 : 20
						}}
						onLayout={({ nativeEvent }) => {
							this.setState({
								marginTop: nativeEvent.layout.height
							});
						}}
					>
						<SafeAreaView />
						<View
							style={{
								justifyContent: "space-between",
								flexDirection: "row",
								marginTop: 15,
								alignItems: "center"
							}}
						>
							{!main && this.renderLeft()}
							<View
								style={{
									alignItems: user ? "flex-start" : "center",
									justifyContent: "center",
									flex: 1,
									marginLeft: user ? 8 : 0,
									paddingBottom: 5
								}}
							>
								<Text
									numberOfLines={1}
									style={{
										color: "white",
										fontSize: 19,
										fontWeight: "bold"
									}}
								>
									{!user ? name : user.name}
								</Text>
								{description && this.renderDescription()}
							</View>
							{this.renderRight()}
						</View>
						{main && (
							<ListHeaderComponent {...{ search, openModal }} />
						)}
					</View>
				</View>
			</>
		);
	}
}

export default Header;
