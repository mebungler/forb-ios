import React, { Component } from "react";
import {
	StyleSheet,
	View,
	ScrollView,
	Text,
	Animated,
	TouchableWithoutFeedback
} from "react-native";
import Icon from "../services/IconService";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import Chart from "../components/Chart";

import DefaultPicker from "../components/DefaultPicker";

const data = [
	{ date: 12, value: 220 },
	{ date: 13, value: 50 },
	{ date: 14, value: 110 },
	{ date: 15, value: 60 },
	{ date: 16, value: 50 },
	{ date: 17, value: 20 },
	{ date: 18, value: 210 },
	{ date: 19, value: 80 },
	{ date: 20, value: 170 },
	{ date: 21, value: 180 }
];

let { width } = Layout;

class Statistics extends Component {
	state = { period: "9 дней", tabWidth: 0, activeTab: 0 };
	translateX = new Animated.Value(0);
	toggleTabs = toIndex => {
		let { tabWidth, activeTab } = this.state;
		let { translateX } = this;
		let val = tabWidth * toIndex;
		Animated.spring(translateX, { toValue: val }).start();
		this.setState({ ...this.state, activeTab: toIndex });
	};
	render() {
		let { period, tabWidth, activeTab } = this.state;
		let { toggleTabs, translateX } = this;
		return (
			<ScrollView style={{ padding: 15 }}>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						marginBottom: 15,
						alignItems: "center"
					}}
				>
					<Text
						style={{
							fontWeight: "bold",
							fontSize: 16,
							color: Colors.black
						}}
					>
						Статистика объявлений
					</Text>
					<View style={{ alignItems: "flex-end" }}>
						<DefaultPicker
							fill
							rightIcon={() => (
								<Icon
									name="chevrondown"
									size={10}
									color={Colors.pink}
								/>
							)}
							selectedValue={period}
							style={{
								borderColor: Colors.pink,
								borderWidth: 1,
								borderStyle: "dashed",
								borderRadius: 30,
								marginTop: 0,
								marginLeft: 5,
								padding: 7.5
							}}
						/>
					</View>
				</View>
				<View style={{ flexDirection: "row", paddingBottom: 15 }}>
					<View style={{ flex: 1, flexDirection: "row" }}>
						<TouchableWithoutFeedback onPress={() => toggleTabs(0)}>
							<View
								style={[
									{
										flex: 1,
										padding: 15,
										alignItems: "center",
										flexDirection: "row",
										justifyContent: "center"
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
										alignItems: "center",
										justifyContent: "center",
										zIndex: 0
									}}
								/>
								<View
									style={{ flexDirection: "row", zIndex: 2 }}
								>
									<Icon
										name="seen"
										color={
											activeTab === 0
												? Colors.blue
												: Colors.black
										}
									/>
									<Text
										style={{
											color:
												activeTab === 0
													? Colors.blue
													: Colors.black,
											marginLeft: 5
										}}
									>
										Просмотры
									</Text>
								</View>
							</View>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback onPress={() => toggleTabs(1)}>
							<View
								style={[
									{
										flex: 1,
										padding: 15,
										alignItems: "center",
										flexDirection: "row",
										justifyContent: "center",
										zIndex: 2
									}
								]}
							>
								<Icon
									name="mail"
									color={
										activeTab === 1
											? Colors.blue
											: Colors.black
									}
								/>
								<Text
									style={{
										color:
											activeTab === 1
												? Colors.blue
												: Colors.black,
										marginLeft: 5
									}}
								>
									Сообщения
								</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</View>
				<View
					style={{
						borderRadius: 20,
						backgroundColor: Colors.white,
						height: 300,
						alignItems: "center",
						shadowOpacity: 1,
						shadowColor: Colors.lightBlue,
						shadowOffset: { height: 5 }
					}}
				>
					<Chart {...{ data }} />
				</View>
			</ScrollView>
		);
	}
}

export default Statistics;
