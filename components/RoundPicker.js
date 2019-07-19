import React, { Component, PropTypes } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Picker from "react-native-picker-select";
import Icon from "../services/IconService";
import Colors from "../constants/Colors";
class RoundPicker extends Component {
	render() {
		let {
			selectedValue,
			data = [],
			onValueChange,
			iconColor = Colors.darkGray,
			width = Dimensions.get("window").width - 60,
			height = 60,
			placeholder = {
				label: "Show options",
				value: null,
				color: "#c5c5c5"
			}
		} = this.props;
		return (
			<Picker
				mode="dropdown"
				placeholder={placeholder}
				style={pickerSelectStyles}
				{...{ onValueChange }}
				value={selectedValue}
				items={data}
				Icon={() => (
					<Icon name="chevrondown" size={10} color={iconColor} />
				)}
			/>
		);
	}
}

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		paddingVertical: 12,
		paddingHorizontal: 15,
		borderWidth: 1,
		borderColor: "#c5c5c5",
		borderRadius: 30,
		color: "black",
		paddingRight: 30,
		paddingTop: 15,
		paddingBottom: 15,
		marginBottom: 15
	},
	inputAndroid: {
		paddingTop: 15,
		paddingBottom: 15,
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 15,
		borderWidth: 0.5,
		borderColor: "#c5c5c5",
		borderRadius: 30,
		color: "black",
		paddingRight: 30,
		marginBottom: 15
	},
	iconContainer: {
		padding: 15,
		paddingTop: 20
	}
});

export default RoundPicker;
