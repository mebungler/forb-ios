import React, { Component } from "react";
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	FlatList,
	Animated,
	TouchableWithoutFeedback,
	ActivityIndicator
} from "react-native";
import Icon from "../services/IconService";
import Colors from "../constants/Colors";
import AdsItem from "./AdsItem";
import Border from "../components/Border";
import Layout from "../constants/Layout";
import api from "../api/api";

const { width, height } = Layout;

class Ads extends Component {
	state = {
		activeTab: 0,
		tabWidth: 0,
		activeItems: [],
		inactiveItems: [],
		loading: false
	};
	translateX = new Animated.Value(0);
	toggleTabs = toIndex => {
		let { tabWidth, activeTab, activeItems, inactiveItems } = this.state;
		let { translateX } = this;
		let val = tabWidth * toIndex;
		Animated.spring(translateX, { toValue: val }).start();
		this.setState({ ...this.state, activeTab: toIndex });
	};

	componentDidMount() {
		this.setState({ ...this.state, loading: true });
		api.product.getActiveAds().then(res => {
			this.setState({
				...this.state,
				activeItems: res.data.data,
				loading: false
			});
			api.product.getInactiveAds().then(res =>
				this.setState({
					...this.state,
					inactiveItems: res.data.data,
					loading: false
				})
			);
		});
	}

	render() {
		let {
			activeTab,
			tabWidth,
			activeItems,
			inactiveItems,
			loading
		} = this.state;
		let { translateX, toggleTabs } = this;
		return (
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={{ backgroundColor: Colors.lightGray, paddingBottom: 15 }}
			>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "row",
						padding: 15
					}}
				>
					<View style={{ flex: 1, flexDirection: "row" }}>
						<TouchableWithoutFeedback onPress={() => toggleTabs(0)}>
							<View
								style={[
									{
										flex: 1,
										padding: 15,
										alignItems: "center"
									}
								]}
							>
								<Animated.View
									onLayout={({ nativeEvent }) => {
										if (tabWidth === 0)
											this.setState({
												...this.state,
												tabWidth:
													nativeEvent.layout.width
											});
									}}
									style={{
										backgroundColor: Colors.white,
										borderRadius: 20,
										shadowColor: Colors.gray,
										shadowRadius: 5,
										shadowOffset: { width: 0, height: 0 },
										elevation: 20,
										shadowOpacity: 1,
										position: "absolute",
										padding: 15,
										top: 0,
										right: 0,
										bottom: 0,
										left: 0,
										transform: [{ translateX }],
										zIndex: 0
									}}
								/>
								<Text
									style={{
										color:
											activeTab === 0
												? Colors.pink
												: Colors.black,
										zIndex: 2
									}}
								>
									Активные (5)
								</Text>
							</View>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback onPress={() => toggleTabs(1)}>
							<View
								style={[
									{
										flex: 1,
										padding: 15,
										alignItems: "center"
									}
								]}
							>
								<Text
									style={{
										color:
											activeTab === 1
												? Colors.pink
												: Colors.black,
										zIndex: 2
									}}
								>
									Не активные (5)
								</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>
					<Icon
						name="chevron"
						size={20}
						color={Colors.pink}
						style={{ padding: 8 }}
					/>
				</View>
				<Border style={{ marginLeft: 15 }} />
				<View style={{ flexDirection: "row" }}>
					<FlatList
						showsVerticalScrollIndicator={false}
						keyExtractor={e => e.id.toString()}
						renderItem={({ item, index }) => (
							<AdsItem
								{...{ item, index }}
								isActive={activeTab === 0}
							/>
						)}
						data={activeTab === 0 ? activeItems : inactiveItems}
						ListEmptyComponent={() => {
							let items =
								activeTab === 0 ? activeItems : inactiveItems;
							if (!loading && items.length <= 0) {
								return (
									<View
										style={{
											justifyContent: "center",
											alignItems: "center",
											width,
											height: height - 120
										}}
									>
										<Text
											style={{
												color: Colors.gray,
												fontSize: 18
											}}
										>
											Объявления не существует
										</Text>
									</View>
								);
							} else
								return (
									<View
										style={{
											justifyContent: "center",
											alignItems: "center",
											width,
											height: height - 120
										}}
									>
										<ActivityIndicator size="large" />
									</View>
								);
						}}
					/>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	activeTab: {
		backgroundColor: Colors.white,
		borderRadius: 20,
		shadowColor: Colors.gray,
		shadowRadius: 5,
		shadowOffset: { width: 0, height: 0 },
		elevation: 20,
		shadowOpacity: 1
	}
});

export default Ads;
