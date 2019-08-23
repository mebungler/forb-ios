import React, { Component } from "react";
import {
	StyleSheet,
	ScrollView,
	Animated,
	Text,
	View,
	Image,
	SafeAreaView,
	TouchableWithoutFeedback,
	Linking
} from "react-native";
import ImageHeader from "../components/ImageHeader";
import Border from "../components/Border";
import Colors from "../constants/Colors";
import Icon from "../services/IconService";
import MapView, { Marker } from "react-native-maps";
import Layout from "../constants/Layout";
import ChatItem from "./ChatItem";
import RoundButton from "../components/RoundButton";
import ProductItem from "./ProductItem";
import api, { urlResolve } from "../api/api";
import Banner from "../components/Banner";
import { connect } from "react-redux";
import { routeChange, favoritesLoaded } from "../actions/actions";
import NavigationService from "../services/NavigationService";
import StorageService from "../services/StorageService";
import strings from "../localization/Strings";

let { width } = Layout;

class Product extends Component {
	componentDidMount() {
		let user = this.props.navigation.getParam("item");
		this.props.dispatch(
			routeChange({
				...this.props.route,
				getter_id: user.user.id,
				chat_id: user.id
			})
		);
		let item = this.props.navigation.getParam("item");
		api.product.view(item.id, "device").then(res => {
			this.setState({ ...this.state, data: res.data.data.similar });
		});
	}
	state = {
		priceVisible: false,
		phoneVisible: false,
		data: [],
		contentVisible: false
	};
	value = new Animated.Value(0);
	productsOfAuthor = () => {
		let item = this.props.navigation.getParam("item");
		this.props.navigation.navigate("UserAds", { user: item.user });
	};
	render() {
		let item = this.props.navigation.getParam("item");
		let { value, renderIndicators } = this;
		let { navigation, favorites, isAuthorized } = this.props;
		let { phoneVisible, priceVisible, data, contentVisible } = this.state;
		let { user } = item;
		let isFavorite = favorites.find(e => e.id === item.id);
		let images = [item.photo, ...item.gallery];
		let {
			phone,
			type,
			id,
			date,
			title,
			filter: properties,
			price,
			content,
			description,
			price_d
		} = item;
		let backgroundColor = value.interpolate({
			inputRange: [0, 300],
			outputRange: ["rgba(92,198,208,0.0)", "rgba(92,198,208,1.0)"]
		});
		return (
			<View style={{ flex: 1 }}>
				<Animated.View
					style={{
						zIndex: 2,
						transform: [{ translateY: 0 }],
						backgroundColor,
						borderBottomLeftRadius: 20,
						borderBottomRightRadius: 20,
						paddingBottom: 15
					}}
				>
					<SafeAreaView />
					<View
						style={{
							padding: 15,
							flexDirection: "row",
							justifyContent: "space-between"
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
								<Icon
									name="arrow-left"
									size={20}
									{...{ color: Colors.white }}
								/>
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
									color: Colors.white
								}}
							>
								{strings.cardProduct}
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
							<TouchableWithoutFeedback
								onPress={() => {
									this.props.dispatch(
										favoritesLoaded(
											StorageService.toggleItem(item)
										)
									);
								}}
							>
								<Icon
									name={isFavorite ? "staro" : "like"}
									size={20}
									color={
										isFavorite ? Colors.pink : Colors.gray
									}
								/>
							</TouchableWithoutFeedback>
							<TouchableWithoutFeedback
								onPress={() => NavigationService.toggleDrawer()}
							>
								<Icon
									name="menu"
									size={16}
									color={Colors.white}
								/>
							</TouchableWithoutFeedback>
						</View>
					</View>
				</Animated.View>
				<Animated.ScrollView
					showsVerticalScrollIndicator={false}
					style={{
						backgroundColor: Colors.lightGray,
						marginTop: images && images.length > 0 ? -90 : 0
					}}
					onScroll={Animated.event([
						{
							nativeEvent: {
								contentOffset: { y: value }
							}
						}
					])}
				>
					<Banner
						{...{
							images,
							onPress: index => {
								NavigationService.navigate("ImageView", {
									images,
									imageIndex: index
								});
							},
							type: "notDefault"
						}}
					/>
					<View
						style={{
							margin: 15,
							padding: 15,
							borderRadius: 30,
							backgroundColor: Colors.white
						}}
					>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								marginBottom: 15
							}}
						>
							<View>
								{price && (
									<Text
										style={{
											color: Colors.pink,
											marginBottom: 8,
											fontWeight: "bold",
											fontSize: 18
										}}
									>
										{price} UZS
									</Text>
								)}
								{priceVisible && price_d && (
									<Text
										style={{
											color: Colors.pink,
											marginBottom: 8,
											fontWeight: "bold",
											fontSize: 18
										}}
									>
										{price_d} USD
									</Text>
								)}
								<Text
									style={{
										fontWeight: "100",
										color: Colors.blue
									}}
								>
									{type && type === 1
										? strings.bargaining
										: strings.finalPrice}
								</Text>
							</View>
							<TouchableWithoutFeedback
								onPress={() =>
									this.setState({
										...this.state,
										priceVisible: !priceVisible
									})
								}
							>
								<Icon
									color={Colors.pink}
									size={30}
									name="chevron"
									style={{
										transform: [
											{
												rotate: !priceVisible
													? "0deg"
													: "180deg"
											}
										]
									}}
								/>
							</TouchableWithoutFeedback>
						</View>
						<Border fill />
						<View
							style={{
								flexDirection: "row",
								marginTop: 15,
								marginBottom: 15
							}}
						>
							<Icon
								color={Colors.darkGray}
								name="event"
								size={18}
							/>
							<Text
								style={{
									marginLeft: 5,
									color: Colors.darkGray,
									fontWeight: "100"
								}}
							>
								# {id}, {strings.posted} {date}
							</Text>
						</View>
						<Text
							style={{
								fontSize: 18,
								color: Colors.blue,
								fontWeight: "bold",
								marginBottom: 15
							}}
						>
							{title}
						</Text>

						<Border fill />
						{properties &&
							properties.map((e, key) => (
								<View
									{...{ key }}
									style={{
										flexDirection: "row",
										justifyContent: "space-between",
										marginTop: 15
									}}
								>
									<Text
										style={{
											color: Colors.darkGray,
											fontSize: 18,
											fontWeight: "bold"
										}}
									>
										{e.name}
									</Text>
									<Text
										style={{
											color: Colors.black,
											fontSize: 18,
											fontWeight: "bold"
										}}
									>
										{e.value}
									</Text>
								</View>
							))}
						<Border fill style={{ marginTop: 15 }} />
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								marginTop: 15
							}}
						>
							<Text
								style={{
									fontWeight: "bold",
									color: Colors.pink
								}}
							>
								{strings.showMore}
							</Text>
							<Icon name="chevrondown" color={Colors.pink} />
						</View>
					</View>
					<Text
						style={{
							color: Colors.black,
							fontWeight: "bold",
							fontSize: 18,
							marginLeft: 15
						}}
					>
						{strings.description}
					</Text>
					<View
						style={{
							margin: 15,
							padding: 15,
							backgroundColor: Colors.white,
							borderRadius: 30
						}}
					>
						<Text
							numberOfLines={contentVisible ? null : 10}
							style={{ lineHeight: 20 }}
						>
							{content}
						</Text>
						<View style={{ flexDirection: "row" }}>
							<Text
								style={{
									fontWeight: "100",
									color: Colors.darkGray,
									marginBottom: 15,
									marginTop: 10
								}}
							>
								{strings.salesDepartment}:{" "}
							</Text>
							<TouchableWithoutFeedback
								onPress={() => {
									if (!phoneVisible) {
										api.product.viewPhone({
											id
										});
									}
									if (phoneVisible) {
										Linking.openURL(
											`tel:${item.phone.split(",")[0]}`
										);
									}
									this.setState({
										...this.state,
										phoneVisible: true
									});
								}}
							>
								<Text
									style={{
										fontWeight: "bold",
										color: Colors.blue,
										marginBottom: 15,
										marginTop: 10,
										flex: 1,
										flexShrink: 1
									}}
								>
									{phoneVisible
										? item.phone
										: strings.showNumber}
								</Text>
							</TouchableWithoutFeedback>
						</View>
						<Border fill />
						<TouchableWithoutFeedback
							onPress={() =>
								this.setState({
									...this.state,
									contentVisible: !contentVisible
								})
							}
						>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									marginTop: 15
								}}
							>
								<Text
									style={{
										fontWeight: "bold",
										color: Colors.pink
									}}
								>
									{strings.showMore}
								</Text>
								<Icon name="chevrondown" color={Colors.pink} />
							</View>
						</TouchableWithoutFeedback>
					</View>
					<ChatItem item={user} single />
					<MapView
						pitchEnabled={false}
						rotateEnabled={false}
						scrollEnabled={false}
						zoomEnabled={false}
						style={{ width, height: 300 }}
						initialRegion={{
							latitude: item.lat
								? parseFloat(item.lat)
								: 41.303624,
							longitude: item.lng
								? parseFloat(item.lat)
								: 69.241629,
							latitudeDelta: 0.01,
							longitudeDelta: 0.01
						}}
					>
						{item.lat && item.lng && (
							<Marker
								coordinate={{
									latitude: item.lat
										? parseFloat(item.lat)
										: 41.303624,
									longitude: item.lng
										? parseFloat(item.lat)
										: 69.241629
								}}
							/>
						)}
					</MapView>
					<View
						style={{
							margin: 15,
							marginTop: -30,
							backgroundColor: Colors.blue,
							borderRadius: 4,
							padding: 15,
							justifyContent: "center",
							alignItems: "center"
						}}
					>
						<Text
							style={{
								fontWeight: "100",
								fontSize: 18,
								color: Colors.white,
								textAlign: "center"
							}}
						>
							{item.city_name}
						</Text>
					</View>
					<View style={{ padding: 15 }}>
						<RoundButton
							color={Colors.pink}
							text={strings.authorAds}
							big
							bold
							medium
							icon={() => (
								<Icon
									name="name"
									color={Colors.pink}
									size={18}
								/>
							)}
							onPress={this.productsOfAuthor}
						/>
					</View>
					{data && data.length > 0 && (
						<React.Fragment>
							<Text
								style={{
									color: Colors.black,
									fontWeight: "bold",
									fontSize: 18,
									marginLeft: 15
								}}
							>
								{strings.similarAds}
							</Text>
							<ScrollView
								horizontal
								showsHorizontalScrollIndicator={false}
								style={{ paddingBottom: 30, paddingLeft: 15 }}
							>
								{data &&
									data.map((e, key) => (
										<ProductItem
											item={e}
											{...{ key }}
											horizontal
										/>
									))}
							</ScrollView>
						</React.Fragment>
					)}
				</Animated.ScrollView>
			</View>
		);
	}
}

const mapStateToProps = ({ route, user, favorites }) => {
	let isAuthorized = false;
	if (Object.keys(user).length > 1) isAuthorized = true;
	return { route, favorites, isAuthorized };
};

export default connect(mapStateToProps)(Product);

/**/
