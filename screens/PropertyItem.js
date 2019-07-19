import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Border from "../components/Border";
import Colors from "../constants/Colors";
import Icon from "../services/IconService";

class PropertyItem extends Component {
	render() {
		let { border, value, name, index, onChange } = this.props;
		return (
			<View style={{ flexDirection: "row" }}>
				<View style={{ flex: 1 }}>
					<TextInput
						placeholder={"Имя"}
						value={name}
						style={{
							fontSize: 18,
							fontWeight: "100",
							color: Colors.darkGray
						}}
						onChangeText={e =>
							onChange(index, { name: e, value: value })
						}
					/>
					<TextInput
						placeholder={"Назначения"}
						value={value}
						style={{
							fontSize: 18,
							fontWeight: "bold",
							color: Colors.black,
							marginTop: 10,
							marginBottom: 10
						}}
						onChangeText={e =>
							onChange(index, { value: e, name: name })
						}
					/>
					{border && <Border fill />}
				</View>
				<View style={{ justifyContent: "center" }}>
					<Icon name="pen" size={18} color={Colors.black} />
				</View>
			</View>
		);
	}
}

export default PropertyItem;
