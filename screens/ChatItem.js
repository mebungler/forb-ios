import React, { Component, PropTypes } from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import NavigationService from "../services/NavigationService";
import Colors from "../constants/Colors";
import { urlResolve } from "../api/api";

const ChatItem = ({ item, single }) => {
	return (
		<TouchableWithoutFeedback
			onPress={() => NavigationService.navigate("Chat", { user: item })}
		>
			<View
				style={{
					margin: 15,
					marginTop: 0,
					borderBottomWidth: single ? 0 : 1,
					borderColor: Colors.gray,
					flexDirection: "row"
				}}
			>
				<View>
					<View
						style={{
							borderRadius: 60,
							justifyContent: "center",
							alignItems: "center",
							overflow: "hidden"
						}}
					>
						<Image
							source={{
								uri: urlResolve(item.photo)
							}}
							style={{
								height: 60,
								width: 60,
								overflow: "hidden"
							}}
						/>
					</View>
					{item.online && (
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
									backgroundColor: Colors.blue,
									justifyContent: "center",
									alignItems: "center",
									marginTop: -30,
									marginRight: 4
								}}
							/>
						</View>
					)}
				</View>
				<View
					style={{
						padding: 15,
						paddingTop: 10,
						paddingLeft: 8,
						flex: 1,
						justifyContent: "space-between"
					}}
				>
					<Text
						numberOfLines={1}
						style={{
							fontSize: 18,
							fontWeight: "bold",
							marginBottom: 5,
							color: Colors.black
						}}
					>
						{item.name}
					</Text>
					<Text
						numberOfLines={1}
						style={{
							fontSize: 16,
							fontWeight: "400",
							color: Colors.darkGray
						}}
					>
						{item.text}
						{item.position}
						{item.last_message}
					</Text>
				</View>
				<View
					style={{
						padding: 15,
						paddingTop: 10,
						alignItems: "flex-end"
					}}
				>
					<Text
						style={{
							fontWeight: "bold",
							color: Colors.darkGray,
							marginBottom: 5
						}}
					>
						{item.date}
					</Text>
					{item.messages > 0 && (
						<View
							style={{
								width: 24,
								height: 24,
								borderRadius: 12,
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: Colors.pink
							}}
						>
							<Text style={{ color: "white", fontWeight: "100" }}>
								{item.messages > 99 ? 99 : item.messages}
							</Text>
						</View>
					)}
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default ChatItem;
