import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import Colors from "../constants/Colors";
import { urlResolve } from "../api/api";

class SingleChat extends Component {
	render() {
		let { getter, sender, message, date } = this.props.item;
		let { user } = this.props;
		let isLeft = sender.name !== user.name;
		let messages = [message];
		return (
			<View
				style={{
					flexDirection: "row",
					justifyContent: isLeft ? "flex-start" : "flex-end",
					padding: 15,
					paddingRight: isLeft ? 30 : 15,
					transform: [{ scaleY: -1 }]
				}}
			>
				{isLeft && (
					<Image
						source={{
							uri: urlResolve(getter.photo)
						}}
						style={{
							height: 60,
							width: 60,
							overflow: "hidden",
							borderRadius: 30,
							marginRight: 10
						}}
					/>
				)}
				<View
					style={{
						marginLeft: !isLeft ? 60 : 0,
						marginRight: isLeft ? 60 : 0
					}}
				>
					{messages.map((e, key) => {
						return (
							<View
								{...{ key }}
								style={{
									backgroundColor: isLeft
										? Colors.lightBlue
										: Colors.white,
									padding: 15,
									borderRadius: 15,
									borderTopLeftRadius: isLeft ? 0 : 15,
									borderTopRightRadius: !isLeft ? 0 : 15,
									marginBottom: 10
								}}
							>
								<Text>{e}</Text>
							</View>
						);
					})}
					<View
						style={{
							flexDirection: "row",
							justifyContent: "flex-end"
						}}
					>
						<Text style={{ color: Colors.black, fontSize: 12 }}>
							{date}
						</Text>
					</View>
				</View>
			</View>
		);
	}
}

export default SingleChat;
